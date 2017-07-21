const express = require('express');
const fs = require('fs');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

//DB를 연결할 pool 생성
const pool = mysql.createPool({
//host: '203.249.127.60',
//port: 65011,
user: '11team',
password: 'gachon654321',
database: '11team'
});

//재고 현황 조회 및 검색
router.get('/admin/pro_stocks', function(req,res){
    var body = req.body;
    fs.readFile('/home/11team/client/src1.0/admin_pro_stk.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT product_code, DATE_FORMAT(regist_date, "%Y-%m-%d") AS regist_date, branch1, branch2, origin, name, price, DATE_FORMAT(manu_date, "%Y-%m-%d") AS  manu_date, DATE_FORMAT(dead_date, "%Y-%m-%d") AS dead_date, supply_id, regist_num FROM product WHERE 1=1';
            
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

//발주 현황 조회 및 검색
router.get('/admin/pro_requests', function(req, res){
    var body = req.body;
    fs.readFile('/home/11team/client/src1.0/admin_pro_req.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT DATE_FORMAT(o.order_date, "%Y-%m-%d") AS order_date, o.order_num, o.product_code, o.id, o.num, p.branch1, p.branch2, p.origin, p.name, p.price, p.supply_id FROM orders o INNER JOIN product p WHERE o.product_code=p.product_code'
               
            conn.query(sql ,function(err, results){
                if(err) throw err;
                
                res.send(ejs.render(data, {
                    data: results
                }));
            });
        }); 
    });
});

//업체 관리 조회 및 검색
router.get('/admin/members', function(req, res){
    var body = req.body;
    fs.readFile('/home/11team/client/src1.0/admin_members.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT * FROM corporation WHERE 1=1';
            
            conn.query(sql, function(err, results){
                if(err) throw err;
                    res.send(ejs.render(data, {
                        data: results
                    }));
            });
        }); 
    });
});


//수금/결제 조회 및 검색
router.get('/admin/paylist', function(req ,res){
    var body = req.body;
    fs.readFile('/home/11team/client/src1.0/admin_paylist.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT o.order_num, o.product_code, o.id, o.num, DATE_FORMAT(o.order_date, "%Y-%m-%d") AS order_date, o.pay_check, p.name, p.supply_id, (p.price * o.num) AS cost FROM product p INNER JOIN orders o WHERE o.product_code=p.product_code';      
                
            conn.query(sql, function(err, results){
                if(err) throw err;
                
                res.send(ejs.render(data, {
                    data: results
                }));
                    
            });
        }); 
    });
});

exports.router = router