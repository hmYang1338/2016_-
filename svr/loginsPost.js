const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

//DB를 연결할 pool 생성
const pool = mysql.createPool({
//host: '203.249.127.60',
//port: 65011,
user: '11team',
password: 'gachon654321',
database: '11team'
});

router.post('/', function(req,res) {
    
	var input_id = req.body.id;
    var input_pw = req.body.password;
    
    if(req.body.roll == 0){
        var input_roll = 'admin';
    }
    else if(req.body.roll == 1){
        var input_roll = 'sells';
    }
    else if(req.body.roll == 2){
        var input_roll = 'supplies';
    }

	console.log(input_roll, input_id, input_pw);
	console.log(req.body);

	pool.getConnection(function(err, conn){
		if(err){
			 console.log('err', err);
		}
		else {
			conn.query('SELECT count(*) AS cnt, name AS username FROM corporation WHERE roll_code=? AND id=? AND password=?;'
                       , [req.body.roll, input_id, input_pw], function(err, rows){
				if(err){
					console.log('err', err);
				}
				else {
					console.log('rows', rows);
					var cnt = rows[0].cnt;
                    var userName = rows[0].username;
                    
                    if(cnt ==1){           
                        if(req.body.roll == 0){
                            res.cookie('auth', true);
                            res.redirect('/users/admin');
                        } 
                        //성공한 아이디가 판매업체일 경우
                        else if(req.body.roll == 1){
                            res.cookie('auth', true);
                            res.cookie('id',input_id);
                            res.redirect('/users/sells');
                        }
                        //성공한 아이디가 공급업체일 경우
                        else if(req.body.roll = 2){
                            res.cookie('auth', true);
                            res.cookie('id',input_id);
                            res.redirect('/users/supplies');
                        }
                    }		
                    else {
				        res.send('<h2> 아이디 혹은 비밀번호가 틀렸습니다. </h2><br><a href="/logins"> 로그인 창으로 돌아가기</a>');
					}
				}
				conn.release();
			});	
		}
	});
        ;

});

exports.router = router
