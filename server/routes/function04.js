var express = require('express');
var router = express.Router();
var d3 = require('d3');

var sql_operation = require("./operation");

router.get("/f4_network_data", function(req, res, next) {
  sql_operation.query(`select * from network_13`,data=>{
    let nodes = [];
    data.forEach(d=>{
      if(nodes.findIndex(x=>x.id === d.source) !== -1 ){}
      else{
        nodes.push({id:d.source,rank:d.source_rank,clique:d.source_clique})
      }
      if(nodes.findIndex(x=>x.id === d.target) !== -1 ){}
      else{
        nodes.push({id:d.target,rank:d.target_rank,clique:d.target_clique})
      }
    });

    res.send({
      nodes:nodes,
      links:data.map(d=>{
        return {
            'source':d.source,
            'target':d.target,
            'value':d.value
          }
      })
    });
  });
});

router.get("/f4_clique", function(req, res, next) {
  sql_operation.query(`select * from network_13`,data=>{
    let nodes = [];
    data.forEach(d=>{
      if(nodes.findIndex(x=>x.id === d.source) !== -1 ){}
      else{
        nodes.push({id:d.source,rank:d.source_rank,clique:d.source_clique})
      }
      if(nodes.findIndex(x=>x.id === d.target) !== -1 ){}
      else{
        nodes.push({id:d.target,rank:d.target_rank,clique:d.target_clique})
      }
    });
    res.send(d3.nest().key(d=>d.clique).entries(nodes).map(d=>{
      return {
        name:'clique_'+d.key,
        value:d.values.length
      }
    }));
  });
});

module.exports = router;
