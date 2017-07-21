const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
//host: '203.249.127.60',
//port: 65011,
user: '11team',
password: 'gachon654321',
database: '11team'
});

//판매업체 조회
router.get('/sells/check', function(req,res){

    fs.readFile('/home/11team/client/src1.0/sells_check.html','utf8', function(error, data){
        pool.getConnection(function(err, conn){
            if(err){
                    console.log('err',err);
            }
            else { 
                // 발주 가능상품(공급업체에서 등록한)을 판매업체 조회화면 으로 이동시 자동으로 나오게끔 
                conn.query('SELECT product_code, DATE_FORMAT(regist_date, "%Y-%m-%d") AS regist_date , branch1, branch2, origin, name, price, DATE_FORMAT(manu_date, "%Y-%m-%d") AS manu_date, DATE_FORMAT(dead_date, "%Y-%m-%d") AS dead_date, supply_id, regist_num FROM product', function(err, results){
                    console.log(results);
                    res.send(ejs.render(data, {
                        data:results
                    }));
                });
            }
        });
    });		        
});

//발주 가능 상품 조회 (이동 시, 조회를 통해 발주 저장 기능 까지[피드백을 통해 화면 구성])
router.get('/sells/canOrderlist', function(req,res){
                         
                fs.readFile('/home/11team/client/src1.0/sells_canOrderlist.html','utf8', function(error, data){
                          pool.getConnection(function(err, conn){
                if(err){
                        console.log('err',err);
                }
                else {
                           // 판매업체 메인화면에서 공급업체 아이디를 제외하고 나타낸 부분
                           conn.query('SELECT product_code, DATE_FORMAT(regist_date, "%Y-%m-%d") AS regist_date,branch1,branch2,origin,name,price, DATE_FORMAT(manu_date, "%Y-%m-%d") AS manu_date, DATE_FORMAT(dead_date, "%Y-%m-%d") AS dead_date, supply_id, regist_num FROM product', function(err, results){
                             res.send(ejs.render(data, {
                                                   data:results
                                             }));
                                 });
                                      }
                              });
               });
});


//발주 확정 리스트 조회
router.get('/sells/certainOrderlist', function(req,res){
                         
                console.log('link to /users/sells/certainOrderlist');
                fs.readFile('/home/11team/client/src1.0/sells_certainOrderlist.html','utf8', function(error, data){
                          pool.getConnection(function(err, conn){
                if(err){
                        console.log('err',err);
                }
                else {
                           //발주 확정 리스트 속성(주문번호, 주문코드, 업체(공급), 주문날짜, 입수로 나타냄)
                           conn.query('select o.order_num, o.product_code, p.supply_id, DATE_FORMAT(order_date, "%Y-%m-%d") AS order_date, num, num * price as cost , pay_check from orders o, product p where o.product_code = p.product_code and id = ? order by order_num', [req.cookies.id], function(err, results){
                             res.send(ejs.render(data, {
                                                   data:results
                                             }));
                                 });
                                      }
                              });
               });
});

//걸제 리스트 조회
router.get('/sells/paylist', function(req,res){          
        fs.readFile('/home/11team/client/src1.0/sells_paylist.html','utf8', function(error, data){
            pool.getConnection(function(err, conn){
                if(err) throw err
                
                //결제 리스트 속성(등록번호, 상품코드, 주문일자, 수량, 상품명, 공급업체, 총금액, 결제여부)
                var sql = 'SELECT o.order_num, o.product_code, DATE_FORMAT(o.order_date, "%Y-%m-%d") AS order_date, o.num, p.name, p.supply_id, (o.num * p.price) AS cost, o.pay_check FROM orders o, product p WHERE o.product_code = p.product_code and o.id = ? order by order_num';
                
                conn.query(sql, [req.cookies.id], function(err, results){
                    res.send(ejs.render(data, {
                        data: results
                    }));
                });
            });
        });
});

exports.router = router
