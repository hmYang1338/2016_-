const express = require('express');
const fs = require('fs');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

//DB를 연결할 pool 생성
const pool = mysql.createPool({
    user: '11team',
    password: 'gachon654321',
    database: '11team'
});

//재고 물품 등록
router.post('/admin/insert_stocks', function(req, res) {
    var body = req.body;
    
    pool.query('INSERT INTO product(product_code, regist_date, branch1, branch2, origin, name, price, manu_date, dead_date, regist_num, supply_id) VALUES(?, ?, ?, ?, ?, ?, ? ,? ,? ,?, ?)', [body.hproduct_code, body.hregist_date, body.hbranch1, body.hbranch2, body.horigin, body.hname, body.hprice, body.hmanu_date, body.hdead_date, body.hregist_num, body.hseller_id], function() {
        res.redirect('/users/admin/pro_stocks');
    })
})

//재고 물품 수정
/*router.get('/admin/edit_stocks/:product_code', function(req, res){
    fs.readFile('admin_stk_edit.html', 'utf8', function(err, data){
        pool.query('SELECT * FROM product WHERE product_code=?', [req.params.product_code], function(err, result){
            res.send(ejs.render(data, {
                data: result[0]
            }));
        });
    });
});
router.get('/admin/edit_stocks/:product_code', function(req, res){
    var body = req.body;
    
    pool.query('UPDATE product SET regist_date=?, branch1=?, branch2=?, origin=?, name=?, price=?, manu_date=?, dead_date=?, regist_num=?, seller_id=? WHERE product_code=?', [body.hregist_date, body.hbranch1, body.hbranch2, body.horigin, body.hname, body.hprice, body.hmanu_date, body.hdead_date, body.hregist_num, body.hseller_id, req.params.product_code], function() {
        res.redirect('/users/admin/pro_stocks');
    })
})*/


//재고 물품 삭제
router.get('/admin/delete_stocks/:product_code', function(req, res){
    pool.query('DELETE FROM product WHERE product_code=?', [req.params.product_code], function() {
        res.redirect('/users/admin/pro_stocks');
    });
});





//발주 요청 물품 등록
router.post('/admin/insert_requests', function(req, res) {
    var body = req.body;
    
    pool.query('INSERT INTO orders(order_date, order_num, product_code, num, id, pay_check) VALUES(?, ?, ?, ?, ?, 0)', [body.horder_date, body.horder_num, body.hproduct_code, body.hnum, body.hid], function() {
        res.redirect('/users/admin/pro_requests');
    })
})
//발주 요청 물품 수정
/*router.get('/admin/edit_requests/:order_num', function(req, res){
    fs.readFile('admin_req_edit.html', 'utf8', function(err, data){
        pool.query('SELECT * FROM orders WHERE order_num=?', [req.params.order_num], function(err, result){
            res.send(ejs.render(data, {
                data: result[0]
            }));
        });
    });
});

router.post('/admin/edit_requests/:order_num', function(req, res){
    var body = req.body;
    
    pool.query('UPDATE orders SET order_date=?, order_num=?, product_code=?, num=?, id=?', [body.horder_date, body.horder_num, body.hproduct_code, body.hnum, body.hid], function() {
        res.redirect('/users/admin/pro_requests');
    })
})*/


//발주 요청 물품 삭제
router.post('/admin/delete_requests/:order_num', function(req, res){
    pool.query('DELETE FROM orders WHERE order_num=?', [req.params.order_num], function() {
        res.redirect('/users/admin/pro_requests');
    });
});



//사용자 등록
router.post('/admin/insert_members', function(req, res) {
    var body = req.body;
    
    pool.query('INSERT INTO corporation(roll_code, name, contact, master, master_num, master_contact, address, id, password, master_email, bank_code, account, pwd_code, pwd_answer) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [body.hroll_code, body.hname, body.hcontact, body.hmaster, body.hmaster_num, body.hmaster_contact, body.hmaster_address, body.hid, body.hpassword, body.hmaster_email, body.hbank_code, body.haccount, body.hpwd_code, body.hpwd_answer], function() {
        res.redirect('/users/admin/members');
    })
})
//사용자 수정
/*router.get('/admin/edit_members/:id', function(req, res){
    fs.readFile('admin_mem_edit.html', 'utf8', function(err, data){
        pool.query('SELECT * FROM corporation WHERE id=?', [req.params.id], function(err, result){
            res.send(ejs.render(data, {
                data: result[0]
            }));
        });
    });
});

router.post('/admin/edit_members/:id', function(req, res){
    var body = req.body;
    
    pool.query('UPDATE corporation SET oll_code=?, name=?, contact=?, master=?, master_num=?, master_contact=?, address=?, id=?, password=?, master_email=?, bank_code=?, account=?', [body.horder_date, body.horder_num, body.hproduct_code, body.hnum, body.hid], function() {
        res.redirect('/users/admin/members');
    })
})*/


//사용자 삭제
router.post('/admin/delete_members/:id', function(req, res){
    pool.query('DELETE FROM corporation WHERE id=?', [req.params.id], function() {
        res.redirect('/users/admin/members');
    });
});



//결제리스트 등록
router.post('/admin/insert_paylist', function(req, res) {
    var body = req.body;
    
    pool.query('INSERT INTO orders(order_num, product_code, id, num, order_date, pay_check) VALUES(?, ?, ?, ?, ?, ?)', [body.horder_num, body.hproduct_code, body.hid, body.hnum, body.horder_date, body.hpay_check], function() {
        res.redirect('/users/admin/paylist');
    })
})



//결제리스트 수정
/*router.get('/admin/edit_pay/:pay_num', function(req, res){
    fs.readFile('admin_pay_edit.html', 'utf8', function(err, data){
        pool.query('SELECT * FROM pay WHERE pay_num=?', [req.params.pay_num], function(err, result){
            res.send(ejs.render(data, {
                data: result[0]
            }));
        });
    });
});*/
//결제여부 (0혹은 1)
router.get('/admin/pay_check/:order_num/:pay_check', function(req, res){
    
    if(req.params.pay_check == 0){
        pool.query('UPDATE orders SET pay_check=1 WHERE order_num=?', [req.params.order_num], function() {
            res.redirect('/users/admin/paylist');
        });
    }
    else if(req.params.pay_check == 1) {
        pool.query('UPDATE orders SET pay_check=0 WHERE order_num=?', [req.params.order_num], function() {
            res.redirect('/users/admin/paylist');
        });
    }
        
        
});
//결제리스트 삭제
router.post('/admin/delete_pay/:order_num', function(req, res){
    
    pool.query('DELETE FROM pay WHERE order_num=?', [req.params.order_num], function() {
        res.redirect('/users/admin/paylist');
    });
});


//공급업체측에서 등록한 상품 검색
router.post('/admin/pro_stocks', function(req,res){
    var body = req.body;
    
    fs.readFile('/home/11team/client/src1.0/admin_pro_stk.html', 'utf8', function(err, data) {
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
               
            conn.query(sql ,function(err, results){
                if(err) throw err;
                
                res.send(ejs.render(data, {
                    data: results
                }));
            });
        }); 
    });
});

//판매업체 측에서 등록한 발주 상품 검색
router.post('/admin/pro_requests', function(req, res){
    var body = req.body;
    fs.readFile('/home/11team/client/src1.0/admin_pro_req.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT DATE_FORMAT(o.order_date, "%Y-%m-%d") AS order_date, o.order_num, o.product_code, o.id, o.num, p.branch1, p.branch2, p.origin, p.name, p.price, p.supply_id FROM orders o INNER JOIN product p WHERE o.product_code=p.product_code'
               
            //대분류, 중분류(축산)
            if(body.branch1 == 1){

                sql += ' AND p.branch1 = "축산"';

                if(body.branch2_1 == 1) {
                    sql += ' AND p.branch2 = "돈육"';
                }
                else if(body.branch2_1 == 2) {
                    sql += ' AND p.branch2 = "우육"';
                }
                else if(body.branch2_1 == 3) {
                    sql += ' AND p.branch2 = "특수육"';
                }
            }
            //대분류, 중분류(수산)
            else if(body.branch2 == 2) {
                sql += ' AND p.branch1 = "수산"'
                    if(body.branch2_2 == 1) {
                    sql += ' AND p.branch2 = "어류"';
                }
                else if(body.branch2_2 == 2) {
                    sql += ' AND p.branch2 = "어패류"';
                }
                else if(body.branch2_2 == 3) {
                    sql += ' AND p.branch2 = "특수"';
                }
            }

            //소분류
            if(body.origin == 1){
                sql += ' AND p.origin = "국내산"';
            }
            else if(body.origin == 2) {
                sql += ' AND p.origin = "수입산"'
            }
            
            //상세검색
            if(body.keywords != "") {
                if(body.searchtype == 1) {
                    sql += ' AND o.order_date = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype == 2) {
                    sql += ' AND o.product_code = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                 }
                else if(body.searchtype == 3) {
                    sql += ' AND o.id = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype == 4) {
                    sql += ' AND p.supply_id = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype == 5) {
                    sql += ' AND p.name = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                 }
            }
               
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
router.post('/admin/members', function(req, res){
    var body = req.body;
    
    fs.readFile('/home/11team/client/src1.0/admin_members.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT * FROM corporation WHERE 1=1';
            
            //업체구분
            if(body.searchtype1 == 1) {
                sql += ' AND roll_code = 1';
            }
            else if(body.searchtype1 == 2) {
                sql += ' AND roll_code = 2';
            }
            
            //상세검색
            if(body.keywords != "") {
                if(body.searchtype2 == 1) {
                    sql += ' AND name = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype2 == 2) {
                    sql += ' AND contact = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                 }
                else if(body.searchtype2 == 3) {
                    sql += ' AND master = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype2 == 4) {
                    sql += ' AND master_num = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype2 == 5) {
                    sql += ' AND master_contact = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                 }
                else if(body.searchtype2 == 6) {
                    sql += ' AND id = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                 }
                else if(body.searchtype2 == 7) {
                    sql += ' AND master_email = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                 }
                else if(body.searchtype2 == 8) {
                    sql += ' AND bank_code = ';
                    if(body.keywords == "신한")
                        sql += "0";
                    else if(body.keywords == "농협")
                        sql += "1";
                    else if(body.keywords == "하나")
                        sql += "2";
                    else if(body.keywords == "국민")
                        sql += "3";
                 }
                else if(body.searchtype2 == 9) {
                    sql += ' AND account = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                 }
            }
            
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
router.post('/admin/paylist', function(req ,res){
    var body = req.body;
    fs.readFile('/home/11team/client/src1.0/admin_paylist.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
            
            var sql = 'SELECT o.order_num, o.product_code, o.id, o.num, DATE_FORMAT(o.order_date, "%Y-%m-%d") AS order_date, o.pay_check, p.name, p.supply_id, (p.price * o.num) AS cost FROM product p INNER JOIN orders o WHERE o.product_code=p.product_code';      
            
            //상세검색
            if(body.keywords != "") {
                if(body.searchtype1 == 1) {
                    sql += ' AND o.product_code = ';
                    sql += '"';
                    sql += body.keywords;
                    sql += '"';
                }
                else if(body.searchtype1 == 2) {
                    sql += ' AND o.id = ';
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
                else if(body.searchtype1 == 5) {
                    sql += ' AND p.supply_id = ';
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