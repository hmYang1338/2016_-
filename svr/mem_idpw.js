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


//아이디 비밀번호 찾기
router.get('/', function(req,res) {
   fs.readFile('/home/11team/client/src1.0/member_IDPW.html','utf8',function(error,data){
    res.send(data.toString());
  });
});



//아이디/비밀번호 찾기 실패시
router.get('/idpw_fail', function(req, res) {
    var body = req.body;
    
    fs.readFile('/home/11team/client/src1.0/member_IDPW_fail.html','utf8',function(error,data){
   	    pool.query('SELECT id FROM corporation WHERE master=? AND master_num=?', [body.id_name, body.id_num], function(err, results){
            res.send(ejs.render(data, {
                    data:results
                }));
        });
    });
});
    

//아이디 찾기 성공 시
router.get('/id_success', function(req, res) {
    fs.readFile('/home/11team/client/src1.0/member_IDPW_IDsuccess.html','utf8',function(error,data){
   	    pool.query('SELECT id FROM corporation WHERE id=?', [req.cookies.id], function(err, results){
            res.send(ejs.render(data, {
                    data:results
                }));
        });
    });
    res.clearCookie('id');
});

//비밀번호 찾기 성공 시
router.get('/pw_success', function(req, res) {
    fs.readFile('/home/11team/client/src1.0/member_IDPW_PWsuccess.html','utf8',function(error,data){
   	    pool.query('SELECT password FROM corporation WHERE id=?', [req.cookies.id], function(err, results){
            res.send(ejs.render(data, {
                    data:results
                }));
        });
    });
    res.clearCookie('id');
});


exports.router = router