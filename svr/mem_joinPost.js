const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');

//DB를 연결할 pool 생성
const pool = mysql.createPool({
    user: '11team',
    password: 'gachon654321',
    database: '11team'
});

//아이디 중복검사
router.post('/check_id2', function(req,res) {
    var body = req.body;
    
    console.log('link to /logins/check_id2');
    pool.query('SELECT count(*) AS cnt FROM corporation WHERE id=?',[body.check_id], function(err, rows){
        console.log(body.check_id);
        console.log(rows)
        var cnt = rows[0].cnt;
        var count = res.cookie('count', 1);
        
        //중복되는 아이디가 없을 때
        if(cnt == 0) {
            res.clearCookie('count');
            res.cookie('chk_id', body.check_id);
            res.redirect('/join');
        }
        //아이디가 중복될 때
        else{
            res.redirect('/join/check_id');
        }
                  
  });
 });


//회원가입 완료 버튼 클릭 시 로그인 창으로 돌아옴
router.post('/',function(req,res){
                
    var body = req.body;              
 
    pool.getConnection(function(err, conn){
		if(err){
            console.log('err', err);
		}
		else {
			conn.query('INSERT INTO corporation (id, roll_code, bank_code, password, name, contact, master, master_num, master_contact, master_email, address, account, pwd_code, pwd_answer) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[body.id, body.roll, body.bank, body.password, body.company_name, body.company_phone, body.username, body.usernum, body.userphone, body.useremail, body.company_address, body.banknum, body.question, body.answer] , function(error,data){
                if(err){
					console.log('err', err);
				}
				else {
					console.log("insert success");
                    res.redirect('/logins');
                }
                conn.release(); 
			});	
		}
	});
});

exports.router = router