const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();

const pool = mysql.createPool({
    user: '11team',
    password: 'gachon654321',
    database: '11team'
});


//아이디 찾기
router.post('/IDfinder', function(req, res){
    var body = req.body;
    
    pool.query('SELECT count(*) AS cnt, id FROM corporation WHERE name=? AND master_num=?', [body.id_name, body.id_num], function(err, rows){
        if(err) throw err;

        var cnt = rows[0].cnt;
        var id = rows[0].id;


        //아이디찾기 성공
		if(cnt == 1){
            res.cookie('id', id);
            res.redirect('/idpw/id_success')
        }
        //아이디찾기 실패
		else {
            res.redirect('/idpw/idpw_fail')
        }

    });
});


//비밀번호 찾기
router.post('/PWfinder', function(req, res){
    var body= req.body;
    
    pool.query('SELECT count(*) AS cnt, password AS pw, id FROM corporation WHERE master=? AND master_num=? AND id=? AND pwd_code=? AND pwd_answer=?', [body.pw_name, body.pw_num, body.pw_id, body.pw_code, body.pw_ans], function(err, rows){
        if(err) throw err;
	var cnt = rows[0].cnt;
            var id = rows[0].id;
            
            if(cnt ==1){
                res.cookie('id', id);
                res.redirect('/idpw/pw_success')
            }
            else {
                res.redirect('/idpw/idpw_fail');      
            }
    });
});

exports.router = router