const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

router.get('', function(req, res){
    res.clearCookie('id');
    res.redirect('/');
});

exports.router = router