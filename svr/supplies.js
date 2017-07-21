const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
	user: '11team',
	password: 'gachon654321',
	database: '11team'
});

//공급업체 메인페이지 (현재까지 저장된 상품 조회 + 검색)
router.get('/supplies/check', function(req,res){

    fs.readFile('/home/11team/client/src1.0/supplies_check.html','utf8', function(error, data){
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT product_code, DATE_FORMAT(regist_date, "%Y-%m-%d") AS regist_date, branch1, branch2, origin, name, price, DATE_FORMAT(manu_date, "%Y-%m-%d") AS manu_date, DATE_FORMAT(dead_date, "%Y-%m-%d") AS dead_date, supply_id, regist_num FROM product WHERE supply_id=?';
            
            conn.query(sql, [req.cookies.id], function(err, results){
                res.send(ejs.render(data, {
                    data:results
                }));
            });
		});
	});
});


//상품 등록
router.get('/supplies/storeProduct', function(req,res) {

    fs.readFile('/home/11team/client/src1.0/supplies_storeProduct.html', 'utf8', function(err,data) {
	   pool.getConnection(function(err, conn){
            if(err) throw err;    
             
            var sql = 'SELECT product_code, DATE_FORMAT(regist_date, "%Y-%m-%d") AS regist_date, branch1, branch2, origin, name, price, DATE_FORMAT(manu_date, "%Y-%m-%d") AS manu_date, DATE_FORMAT(dead_date, "%Y-%m-%d") AS dead_date, supply_id, regist_num FROM product WHERE supply_id=?';
             
            conn.query(sql, [req.cookies.id], function(err, results){
                res.send(ejs.render(data, {
                    data:results
                }));
            });
        });
	});
});

//상품 삭제
router.get('/supplies/delete/:product_code', function(req, res){

    console.log(req.params.product_code);
    pool.query('DELETE FROM product WHERE product_code=?', [req.params.product_code], function() {
        res.redirect('/users/supplies/storeProduct');
    });
});


//발주 리스트 조회
router.get('/supplies/certainOrderlist', function(req,res) {
    
    fs.readFile('/home/11team/client/src1.0/supplies_certainOrderlist.html','utf8', function(error, data){
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT o.order_num, o.product_code, o.id, DATE_FORMAT(o.order_date, "%Y-%m-%d") AS order_date, o.num, o.num * p.price as cost, o.pay_check FROM orders o, product p WHERE o.product_code = p.product_code and supply_id=? ORDER BY order_num';
            
            conn.query(sql, [req.cookies.id] , function(err, results){
                res.send(ejs.render(data, {
                    data:results
                }));
            });
        });
    });
});



//결제 리스트 조회
router.get('/supplies/paylist', function(req,res) {
    
    fs.readFile('/home/11team/client/src1.0/supplies_paylist.html','utf8', function(error, data){
        pool.getConnection(function(err, conn){
            if(err) throw err
            
            var sql = 'SELECT o.order_num, o.product_code, DATE_FORMAT(o.order_date, "%Y-%m-%d") AS order_date, o.num, o.id, (o.num * p.price) AS cost, o.pay_check FROM orders o, product p WHERE o.product_code = p.product_code AND p.supply_id=?';
        
            conn.query(sql, [req.cookies.id] , function(err, results){
                res.send(ejs.render(data, {
                        data:results
                }));
            });
        });
	});
});





exports.router = router