var express = require('express');
var router = express.Router();

var db = require('../config/db');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/search',function(req, res, next) {
	db.query('select * from materials',[],function(results,fields){
		res.send(results);
	})
});

router.post('/searchone',function(req, res, next) {
	var categorynum = req.body.categorynum;
	console.log(categorynum)
	var sql =`select * from materials where categorynum='${categorynum}' limit 8`;
	//var sql =`select * from materials where categorynum=3`;
	console.log(sql);
	db.query(sql,[],function(results, fields) {
		res.send(results);
	})
});

router.post('/searchinfo',function(req, res, next) {
	var materialnum = req.body.materialnum;
	console.log(materialnum)
	var sql =`select * from materials where materialnum='${materialnum}'`;
	//var sql =`select * from materials where categorynum=3`;
	console.log(sql);
	db.query(sql,[],function(results, fields) {
		res.send(results);
	})
});

module.exports = router;