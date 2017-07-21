const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const pool = mysql.createPool({
    user: '11team',
    password: 'gachon654321',
    database: '11team'
});

router.post('/sells/canOrderlist',function(req,res){

          var reqObj = req.body;   
 
          pool.getConnection(function(err, conn){
		if(err){
			 console.log('err', err);
		}
		else {
            //발주 등록, html상 입력단은 3개, id는 쿠키를 통해 쿼리문으로 자동적으로 입력되고 결제여부는 디폴트값 0
			conn.query( 'INSERT INTO orders (product_code,id,order_date,num,pay_check) VALUES(?,?,CURDATE(),?,0)' ,[reqObj.product_code, req.cookies.id, reqObj.num]
 ,function(err, rows){
 	                                      if(err){
				console.log('err', err);
				}
				else {
					console.log("insert success");
                    res.redirect('/users/sells/certainOrderlist');
                }
                		conn.release(); 
                       });
                    }
               });
         });

router.post('/supplies/storeProduct',function(req,res){

        var reqObj = req.body;   
 
 pool.getConnection(function(err, conn){
		if(err){
			 console.log('err', err);
		}
		else {
            //상품 등록, html 입력단은 9개, supply_id칼럼은 쿠키를 통해 쿼리문으로 자동적으로 입력됨 
			conn.query( 'INSERT INTO product (product_code, regist_date, branch1, branch2, origin, name, price, manu_date, dead_date, regist_num,supply_id) VALUES(?,CURDATE(),?,?,?,?,?,?,?,?,?)' ,
[reqObj.product_code,reqObj.branch1,reqObj.branch2,reqObj.origin,reqObj.name,reqObj.price,reqObj.manu_date,reqObj.dead_date,reqObj.regist_num,req.cookies.id],function(err, rows){
 	                                      if(err){
				console.log('err', err);
				}
				else {
					console.log("insert success");
                    res.redirect('/users/supplies/check');
                }
                		conn.release(); 
                       });
                    }
               });
         });



router.get('/supplies/delete_stocks/:product_code', function(req, res){
    //X버튼을 누를시 상품 삭제
    pool.query('DELETE FROM product WHERE product_code=?', [req.params.product_code], function() {
        res.redirect('/users/supplies/check');
    });
});
exports.router = router
   
