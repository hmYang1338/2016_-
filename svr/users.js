const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session');

//관리자로 로그인
router.get('/admin', function(req,res){
    
    console.log('link to /users/admin');
    
    fs.readFile('/home/11team/client/src1.0/admin_main.html', function(error, data){
				res.send(data.toString());
    });
   
});


//판매업체로 로그인
router.get('/sells', function(req,res){
    if(req.cookies.auth) {
        console.log('link to users/sells');
        
        fs.readFile('/home/11team/client/src1.0/sells_main.html', function(error, data){
            res.send(data.toString());

            console.log(req.cookies.id);
        });
    } 
    else {
        console.log('cookie fail');
    }
});

//공급업체로 로그인
router.get('/supplies', function(req,res){
    if(req.cookies.auth) {
        console.log('link to /users/supplies');
    
        fs.readFile('/home/11team/client/src1.0/supplies_main.html', function(error, data){
            res.send(data.toString());
            
            console.log(req.cookies.id);
        });
    }
    else {
        console.log('cookie fail');
    }                
});

exports.router = router
