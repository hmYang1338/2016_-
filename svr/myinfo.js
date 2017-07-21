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

//내 정보 조회
router.get('/', function(req,res){
    
    fs.readFile('/home/11team/client/src1.0/member_info.html', 'utf8', function(err, data) {
        pool.getConnection(function(err, conn){
            if(err) throw err;
           
            conn.query('SELECT * FROM corporation WHERE id=?', [req.cookies.id], function(err, results){  
                console.log(results);
                res.send(ejs.render(data, {
                    data:results
                }));
            });
        }); 
   });
});


//성공했을 시, 자신의 정보 업데이트
router.get('/myinfo_update', function(req, res){
    var body= req.body;
    
        pool.getConnection(function(err, conn){
            if(err) throw err;
           
            var sql = 'UPDATE corporation SET bank_code=?, password=?, name=?, contact=?, master=?, master_num=?, master_contact=?, master_email=?, address=?, account=?, pwd_code=?, pwd_answer=? WHERE id=?'
            
            conn.query(sql, [body.hbank_code, body.hpwd, body.hname, body.hcontact, body.hmaster, body.hmaster_num, body.hmaster_contact, body.hmaster_email, body.haddress, body.haccount, body.hpwd_code, body.hpwd_answer, body.hid], function(err, results){
                res.redirect('/logins');
                conn.release();
            });
        }); 
    
});

exports.router = router