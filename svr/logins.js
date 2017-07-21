const express = require('express');
const fs = require('fs');
const router = express.Router();
const mysql = require('mysql');


//로그인 화면
router.get('/', function(req,res) {
    console.log('link to /logins');
    
    fs.readFile('/home/11team/client/src1.0/index.html','utf8',function(error,data){
   	    res.send(data.toString());
  });
});

exports.router = router
