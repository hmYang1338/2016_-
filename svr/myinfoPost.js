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
router.post('', function(req,res){
    var body = req.body;
    
    pool.query('SELECT count(*) AS cnt FROM corporation WHERE id=? AND password=?', [body.hid, body.hpassword], function(err, rows){
        if(err) throw err;
        
        var cnt = rows[0].cnt;

        
        if(cnt ==1 && body.hpwd1 == body.hpwd2){
            //성공시, 정보 업데이트 라우터로 이동
            pool.getConnection(function(err, conn){
            if(err) throw err;
           
            var sql = 'UPDATE corporation SET bank_code=?, password=?, name=?, contact=?, master=?, master_num=?, master_contact=?, master_email=?, address=?, account=?, pwd_code=?, pwd_answer=? WHERE id=?'
            
            conn.query(sql, [body.hbank_code, body.hpwd1, body.hname, body.hcontact, body.hmaster, body.hmaster_num, body.hmaster_contact, body.hmaster_email, body.haddress, body.haccount, body.hpwd_code, body.hpwd_answer, body.hid], function(err, results){
                res.redirect('/logins');
                conn.release();
            });
        }); 
        }
        else {
            //실패시, GET: /myinfo로 다시 돌아간다.
            res.redirect('/myinfo');
        }    
    }); 
});




exports.router = router