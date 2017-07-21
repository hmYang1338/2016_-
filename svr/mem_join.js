const express = require('express');
const fs = require('fs');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');

const pool = mysql.createPool({
    user: '11team',
    password: 'gachon654321',
    database: '11team'
});

//회원가입하기 이전 중복된 아이디 중복검사창을 띄움
router.get('/check_id', function(req,res) {
    console.log('link to /logins/check_id');
    fs.readFile('/home/11team/client/src1.0/member_register_IDchk.html','utf8',function(error,data){
  	     res.send(data.toString());
    });
});
        
    

//회원가입 창
router.get('/', function(req,res) {
    console.log('link to /logins');
    console.log(req.cookies.chk_id);
    fs.readFile('/home/11team/client/src1.0/member_register.html','utf8',function(error,data){
        res.send(ejs.render(data, {
            data: req.cookies.chk_id
        }));
  });
});

exports.router = router