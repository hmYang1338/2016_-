const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');
const fs = require('fs');

//서버 생성
const app = express();

/*app.get('/setCookie', function(req, res) {
    res.cookie('string', 'cookie');
    res.cookie('json', {
        auth: 'false',
        username: 'default',
        id: 'id'
    })
})*/

//기본 경로 : 로그인창
app.get('/', function(req, res){
    res.redirect('/logins');
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/logins', require("./logins").router);
app.use('/logins', require("./loginsPost").router);
app.use('/join', require("./mem_join").router);
app.use('/join', require("./mem_joinPost").router);
app.use('/idpw', require("./mem_idpw").router);
app.use('/idpw', require("./mem_idpwPost").router);
app.use('/logout', require("./logout").router);
app.use('/myinfo', require("./myinfo").router);
app.use('/myinfo', require("./myinfoPost").router);
app.use('/users', require("./users").router);
app.use('/users', require("./usersPost").router);
app.use('/users', require("./sells").router);
app.use('/users', require("./sellsPost").router);
app.use('/users', require("./supplies").router);
app.use('/users', require("./suppliesPost").router);
app.use('/users', require("./admin").router);
app.use('/users', require("./adminPost").router);



//서버 실행
var server = app.listen(65011, function() {
  var port = server.address().port;
  console.log('run at http://203.249.127.60:%s', port);
});
