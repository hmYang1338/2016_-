const express = require('express');
const fs = require('fs');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const pool = mysql.createPool({
    user: '11team',
    password: 'gachon654321',
    database: '11team'
});

//공급업체측에서 등록한 상품 검색
router.post('/sells/search', function(req,res){
    var body = req.body;
    
    fs.readFile('/home/11team/client/src1.0/sells_check.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT product_code, DATE_FORMAT(regist_date, "%Y-%m-%d") AS regist_date, branch1, branch2, origin, name, price, DATE_FORMAT(manu_date, "%Y-%m-%d") AS  manu_date, DATE_FORMAT(dead_date, "%Y-%m-%d") AS dead_date, supply_id, regist_num FROM product WHERE 1=1';
            
            //대분류, 중분류(축산)
            if(body.branch1 == 1){

                sql += ' AND branch1 = "축산"';

                if(body.branch2_1 == 1) {
                    sql += ' AND branch2 = "돈육"';
                }
                else if(body.branch2_1 == 2) {
                    sql += ' AND branch2 = "우육"';
                }
                else if(body.branch2_1 == 3) {
                    sql += ' AND branch2 = "특수육"';
                }
            }
            //대분류, 중분류(수산)
            else if(body.branch1 == 2) {
                
                sql += ' AND branch1 = "수산"'
                
                    if(body.branch2_2 == 1) {
                    sql += ' AND branch2 = "어류"';
                }
                else if(body.branch2_2 == 2) {
                    sql += ' AND branch2 = "어패류"';
                }
                else if(body.branch2_2 == 3) {
                    sql += ' AND branch2 = "특수"';
                }
            }

            //소분류
            if(body.origin == 1){
                sql += ' AND origin = "국내산"';
            }
            else if(body.origin == 2) {
                sql += ' AND origin = "수입산"'
            }
            
            //상세검색
            if(body.keywords != "") {
                if(body.searchtype == 1) {
                    sql += ' AND regist_date = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype == 2) {
                    sql += ' AND product_code = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype == 3) {
                    sql += ' AND supply_id = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype == 4) {
                    sql += ' AND name = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                 }
             }
            
            console.log(sql);
               
            conn.query(sql ,function(err, results){
                if(err) throw err;
                
                res.send(ejs.render(data, {
                    data: results
                }));
            });
        }); 
    });
});

//결제 조회 및 검색
router.post('/sells/paylist', function(req ,res){
    var body = req.body;
    
    fs.readFile('/home/11team/client/src1.0/sells_paylist.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT o.order_num, o.product_code, o.num, DATE_FORMAT(o.order_date, "%Y-%m-%d") AS order_date, o.pay_check, p.name, p.supply_id, (p.price * o.num) AS cost FROM product p INNER JOIN orders o WHERE o.product_code = p.product_code AND o.id=?';      
            
            //상세검색
            if(body.keywords != "") {
                if(body.searchtype1 == 1) {
                    sql += ' AND o.product_code = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype1 == 2) {
                    sql += ' AND p.supply_id = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                 }
                else if(body.searchtype1 == 3) {
                    sql += ' AND o.order_date = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype1 == 4) {
                    sql += ' AND p.name = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
            }
            
            if(body.searchtype2 == 1) {
                sql += ' AND o.pay_check = 1';
            }
            else if(body.searchtype2 == 2) {
                sql += ' AND o.pay_check = 2';
            }
            
            conn.query(sql,[req.cookies.id], function(err, results){
                if(err) throw err;
                
                res.send(ejs.render(data, {
                    data: results
                }));
                    
            });
        }); 
    });
});


exports.router = router