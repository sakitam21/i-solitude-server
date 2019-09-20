var express = require('express');
var router = express.Router();

var db = require('../config/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/search', function(req, res, next) {
	db.query('select * from userinfos',[],function(results,fields){
		res.send(results);
	})
});

//signin
router.post('/signin', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	var sql =`select * from userinfos where username='${username}' and password='${password}'`;
	db.query(sql, [], function(results, fields) {
		res.send(results);
	})
});

//signup
router.post('/signup', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	var sql =`insert into userinfos(username,password) values('${username}','${password}')`;
	db.query(sql, [], function(results, fields) {
		res.send(results);
	})
});

module.exports = router;
