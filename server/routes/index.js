var express = require('express');
var router = express.Router();
var d3 = require('d3');

var sql_operation = require("./operation");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/query", function(req, res, next) {
  sql_operation.query(req.query.sql,data=>{
    res.send(data);
  });
});

module.exports = router;
