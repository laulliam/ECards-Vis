var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs')
var d3 = require('d3');
// var nx = require('jsnetworkx')

var sql_operation = require("./operation");

router.get("/f1_cluster_data", function(req, res, next) {
  sql_operation.query(`select cluster from cluster_data`,data=>{
    data = d3.nest().key(d=>d.cluster).entries(data).map(d=>{
      return {
        'name':'P'+d.key,
        'value': d.values.length
      }
    }).sort((a,b)=>a.name.localeCompare(b.name));
    res.send(data);
  });
});

router.get("/f1_scatter_data", function(req, res, next) {
  sql_operation.query(`select card_id,x,y,cluster from cluster_data`,data=>{
    data = d3.nest().key(d=>d.cluster).entries(data).map(d=>{
      return {
        name:'P'+d.key,
        data:d.values.map(d=>[d.x,d.y,d.card_id])
      }
    }).sort((a,b)=>a.name.localeCompare(b.name));
    res.send(data);
  });
});

router.get("/table_data", function(req, res, next) {
  sql_operation.query(`select card_id,total,cafeteria,store,count,cluster from cluster_data`,data=>{
    res.send(data);
  });
});

router.get("/f1_main_data", function(req, res, next) {
  sql_operation.query(`select * from dept_cluster`,data=>{
    data = d3.nest().key(d=>d.name).entries(data).map(d=>{
      return {
        name:d.key,
        data:d.values.map(s=>{
          return {
            'name':s.label,
            'value':s.value
          }
        })
      }
    })
    res.send(data);
  });
});

router.get("/f1_timeline_data", function(req, res, next) {
  sql_operation.query(`select * from cluster_day_cost`,data=>{
    data.map(d=>{
      return {
        label:d.label,
        date:d.date,
        value:d.value
      }
    })
    res.send(data);
  });
});

router.get("/f1_parallel_data", function(req, res, next) {
  sql_operation.query(`select card_id,total,cafeteria,store,charge,count,surplus_max,count,cluster from cluster_data`,data=>{
    data = d3.nest().key(d=>d.cluster).entries(data).map(d=>{
      return {
        // name:povertyIndex[parseInt(d.key)],
        name:d.key,
        data:d.values.map(s=>[s.cluster,s.total,s.cafeteria,s.store,s.count,parseInt(s.charge)])
      }
    })
    res.send(data);
  });
});

router.get("/f1_mealRate_data", function(req, res, next) {
  sql_operation.query(`select * from dine`,data=>{
    data = d3.nest().key(d=>d.label).entries(data).map(d=>{
      return {
        cluster:'cluster'+parseInt(d.key),
        data:[
          (d3.sum(d.values,s=>s.morn_)/d.values.length).toFixed(2),
          (d3.sum(d.values,s=>s.noon_)/d.values.length).toFixed(2),
          (d3.sum(d.values,s=>s.even_)/d.values.length).toFixed(2),
        ]
      }
    })
    res.send(data.filter(d=>d.cluster === req.query.cluster)[0].data);
  });
});

router.get("/f1_graph_data", function(req, res, next) {
  let graph_cluster0 = {'nodes': [{'name': 'S1', 'value': 0.178842}, {'name': 'C1', 'value': 0.196927}, {'name': 'C3', 'value': 0.207959}, {'name': 'C2', 'value': 0.384279}, {'name': 'C5', 'value': 0.360047}, {'name': 'C4', 'value': 0.271395}, {'name': 'S2', 'value': 0.063593}, {'name': 'FO', 'value': 0.14207999999999998}], 'links': [{'source': 'C3', 'target': 'S1', 'value': 0.062175}, {'source': 'C5', 'target': 'S1', 'value': 0.097518}, {'source': 'C2', 'target': 'C1', 'value': 0.117415}, {'source': 'C4', 'target': 'C1', 'value': 0.06414500000000001}, {'source': 'C3', 'target': 'C5', 'value': 0.092356}, {'source': 'C2', 'target': 'C4', 'value': 0.134634}, {'source': 'C2', 'target': 'FO', 'value': 0.053349}, {'source': 'FO', 'target': 'C5', 'value': 0.052561000000000004}]};
  let graph_cluster1 = {'nodes': [{'name': 'S1', 'value': 0.16961099999999998}, {'name': 'C1', 'value': 0.154704}, {'name': 'C3', 'value': 0.184187}, {'name': 'C2', 'value': 0.292292}, {'name': 'C5', 'value': 0.329284}, {'name': 'C4', 'value': 0.207155}, {'name': 'S2', 'value': 0.039311}, {'name': 'FO', 'value': 0.069125}], 'links': [{'source': 'C3', 'target': 'S1', 'value': 0.04439}, {'source': 'C2', 'target': 'S1', 'value': 0.012036}, {'source': 'C5', 'target': 'S1', 'value': 0.067248}, {'source': 'S1', 'target': 'C4', 'value': 0.018662}, {'source': 'C2', 'target': 'C1', 'value': 0.074205}, {'source': 'C1', 'target': 'C4', 'value': 0.036108999999999995}, {'source': 'C1', 'target': 'S2', 'value': 0.012809000000000001}, {'source': 'C5', 'target': 'C3', 'value': 0.052341}, {'source': 'FO', 'target': 'C3', 'value': 0.013472}, {'source': 'C2', 'target': 'C5', 'value': 0.017116}, {'source': 'C2', 'target': 'C4', 'value': 0.067138}, {'source': 'C2', 'target': 'S2', 'value': 0.020318}, {'source': 'C2', 'target': 'FO', 'value': 0.018883}, {'source': 'C5', 'target': 'C4', 'value': 0.021863999999999998}, {'source': 'C5', 'target': 'FO', 'value': 0.020649}, {'source': 'C4', 'target': 'S2', 'value': 0.014024000000000002}, {'source': 'FO', 'target': 'C4', 'value': 0.018993}]}
  let graph_cluster2 = {'nodes': [{'name': 'S1', 'value': 0.08168500000000001}, {'name': 'C1', 'value': 0.188441}, {'name': 'C3', 'value': 0.16305799999999998}, {'name': 'C2', 'value': 0.39019499999999996}, {'name': 'C5', 'value': 0.316598}, {'name': 'C4', 'value': 0.259363}, {'name': 'S2', 'value': 0.042615}, {'name': 'FO', 'value': 0.10924500000000001}], 'links': [{'source': 'S1', 'target': 'C5', 'value': 0.040873}, {'source': 'C1', 'target': 'C2', 'value': 0.102775}, {'source': 'C4', 'target': 'C1', 'value': 0.049645}, {'source': 'C3', 'target': 'C5', 'value': 0.063208}, {'source': 'C4', 'target': 'C2', 'value': 0.110924}, {'source': 'FO', 'target': 'C2', 'value': 0.035772000000000005}, {'source': 'C5', 'target': 'FO', 'value': 0.031417}, {'source': 'C4', 'target': 'FO', 'value': 0.034279000000000004}]}
  let graph_cluster3 = {'nodes': [{'name': 'S1', 'value': 0.147651}, {'name': 'C1', 'value': 0.239441}, {'name': 'C3', 'value': 0.205139}, {'name': 'C2', 'value': 0.43027600000000005}, {'name': 'C5', 'value': 0.295302}, {'name': 'C4', 'value': 0.339163}, {'name': 'S2', 'value': 0.081622}, {'name': 'FO', 'value': 0.08670599999999999}], 'links': [{'source': 'C3', 'target': 'S1', 'value': 0.061148}, {'source': 'C5', 'target': 'S1', 'value': 0.076063}, {'source': 'C1', 'target': 'C2', 'value': 0.141956}, {'source': 'C1', 'target': 'C4', 'value': 0.094705}, {'source': 'C1', 'target': 'S2', 'value': 0.031455000000000004}, {'source': 'C5', 'target': 'C3', 'value': 0.093417}, {'source': 'C4', 'target': 'C2', 'value': 0.179174}, {'source': 'C2', 'target': 'S2', 'value': 0.052132000000000005}, {'source': 'C2', 'target': 'FO', 'value': 0.035998}, {'source': 'C4', 'target': 'S2', 'value': 0.040472}, {'source': 'C4', 'target': 'FO', 'value': 0.032405}]}
  let graph_cluster4 = {'nodes': [{'name': 'S1', 'value': 0.20136300000000001}, {'name': 'C1', 'value': 0.18706199999999998}, {'name': 'C3', 'value': 0.172569}, {'name': 'C2', 'value': 0.352721}, {'name': 'C5', 'value': 0.301948}, {'name': 'C4', 'value': 0.27929699999999996}, {'name': 'S2', 'value': 0.061329999999999996}, {'name': 'FO', 'value': 0.058355}], 'links': [{'source': 'C3', 'target': 'S1', 'value': 0.05442}, {'source': 'C5', 'target': 'S1', 'value': 0.09252300000000001}, {'source': 'C1', 'target': 'C2', 'value': 0.10039400000000001}, {'source': 'C1', 'target': 'C4', 'value': 0.060753999999999996}, {'source': 'C5', 'target': 'C3', 'value': 0.06929600000000001}, {'source': 'C4', 'target': 'C2', 'value': 0.12045299999999999}, {'source': 'S2', 'target': 'C2', 'value': 0.03628}]}
  let graph_cluster5 = {'nodes': [{'name': 'S1', 'value': 0.14945799999999998}, {'name': 'C1', 'value': 0.274192}, {'name': 'C3', 'value': 0.22298400000000002}, {'name': 'C2', 'value': 0.474025}, {'name': 'C5', 'value': 0.256598}, {'name': 'C4', 'value': 0.390499}, {'name': 'S2', 'value': 0.11250999999999999}, {'name': 'FO', 'value': 0.12862300000000002}], 'links': [{'source': 'C3', 'target': 'S1', 'value': 0.07695199999999999}, {'source': 'S1', 'target': 'C5', 'value': 0.077137}, {'source': 'C1', 'target': 'C2', 'value': 0.170664}, {'source': 'C4', 'target': 'C1', 'value': 0.12158499999999998}, {'source': 'C1', 'target': 'S2', 'value': 0.041948}, {'source': 'C1', 'target': 'FO', 'value': 0.034725}, {'source': 'C3', 'target': 'C5', 'value': 0.114548}, {'source': 'C3', 'target': 'FO', 'value': 0.030188}, {'source': 'C4', 'target': 'C2', 'value': 0.22529899999999997}, {'source': 'S2', 'target': 'C2', 'value': 0.074822}, {'source': 'C2', 'target': 'FO', 'value': 0.062135}, {'source': 'C4', 'target': 'C5', 'value': 0.033799}, {'source': 'C5', 'target': 'FO', 'value': 0.035095999999999995}, {'source': 'C4', 'target': 'S2', 'value': 0.060654}, {'source': 'C4', 'target': 'FO', 'value': 0.05343099999999999}]}
  let graph_cluster6 = {'nodes': [{'name': 'S1', 'value': 0.15012899999999998}, {'name': 'C1', 'value': 0.23778600000000003}, {'name': 'C3', 'value': 0.175759}, {'name': 'C2', 'value': 0.412566}, {'name': 'C5', 'value': 0.287621}, {'name': 'C4', 'value': 0.333719}, {'name': 'S2', 'value': 0.10171799999999999}, {'name': 'FO', 'value': 0.145146}], 'links': [{'source': 'C3', 'target': 'S1', 'value': 0.0574}, {'source': 'C5', 'target': 'S1', 'value': 0.078135}, {'source': 'C2', 'target': 'C1', 'value': 0.139183}, {'source': 'C1', 'target': 'C4', 'value': 0.10314100000000001}, {'source': 'S2', 'target': 'C1', 'value': 0.038978}, {'source': 'FO', 'target': 'C1', 'value': 0.033194}, {'source': 'C3', 'target': 'C5', 'value': 0.07849099999999999}, {'source': 'C2', 'target': 'C4', 'value': 0.17389000000000002}, {'source': 'S2', 'target': 'C2', 'value': 0.06514199999999999}, {'source': 'C2', 'target': 'FO', 'value': 0.057934000000000006}, {'source': 'FO', 'target': 'C5', 'value': 0.039779}, {'source': 'S2', 'target': 'C4', 'value': 0.052238}, {'source': 'FO', 'target': 'C4', 'value': 0.055086}]}
  let graph_cluster7 = {'nodes': [{'name': 'S1', 'value': 0.383013}, {'name': 'C1', 'value': 0.087641}, {'name': 'C3', 'value': 0.289327}, {'name': 'C2', 'value': 0.170352}, {'name': 'C5', 'value': 0.44774899999999995}, {'name': 'C4', 'value': 0.152855}, {'name': 'S2', 'value': 0.06839500000000001}, {'name': 'FO', 'value': 0.117862}], 'links': [{'source': 'S1', 'target': 'C3', 'value': 0.12231600000000001}, {'source': 'S1', 'target': 'C2', 'value': 0.031653}, {'source': 'S1', 'target': 'C5', 'value': 0.161126}, {'source': 'C4', 'target': 'S1', 'value': 0.04724}, {'source': 'S1', 'target': 'FO', 'value': 0.039127999999999996}, {'source': 'C1', 'target': 'C2', 'value': 0.040401}, {'source': 'C3', 'target': 'C5', 'value': 0.090027}, {'source': 'FO', 'target': 'C3', 'value': 0.037856}, {'source': 'C4', 'target': 'C2', 'value': 0.037538}, {'source': 'C2', 'target': 'S2', 'value': 0.038969}, {'source': 'FO', 'target': 'C5', 'value': 0.052012}]}
  let graph_cluster8 = {'nodes': [{'name': 'S1', 'value': 0.189985}, {'name': 'C1', 'value': 0.2591}, {'name': 'C3', 'value': 0.24289899999999998}, {'name': 'C2', 'value': 0.448243}, {'name': 'C5', 'value': 0.294761}, {'name': 'C4', 'value': 0.380076}, {'name': 'S2', 'value': 0.14790699999999998}, {'name': 'FO', 'value': 0.207869}], 'links': [{'source': 'C3', 'target': 'S1', 'value': 0.09804299999999999}, {'source': 'C5', 'target': 'S1', 'value': 0.109825}, {'source': 'FO', 'target': 'S1', 'value': 0.042079000000000005}, {'source': 'C1', 'target': 'C2', 'value': 0.158637}, {'source': 'C4', 'target': 'C1', 'value': 0.11824100000000001}, {'source': 'S2', 'target': 'C1', 'value': 0.062487}, {'source': 'FO', 'target': 'C1', 'value': 0.054071}, {'source': 'C5', 'target': 'C3', 'value': 0.127814}, {'source': 'FO', 'target': 'C3', 'value': 0.050914999999999995}, {'source': 'C4', 'target': 'C2', 'value': 0.22259600000000002}, {'source': 'S2', 'target': 'C2', 'value': 0.102146}, {'source': 'FO', 'target': 'C2', 'value': 0.09636}, {'source': 'C4', 'target': 'C5', 'value': 0.033137}, {'source': 'FO', 'target': 'C5', 'value': 0.066695}, {'source': 'C4', 'target': 'S2', 'value': 0.08394700000000001}, {'source': 'FO', 'target': 'C4', 'value': 0.09046900000000001}, {'source': 'FO', 'target': 'S2', 'value': 0.039764}]}
  let graph_cluster9 = {'nodes': [{'name': 'S1', 'value': 0.186538}, {'name': 'C1', 'value': 0.21818}, {'name': 'C3', 'value': 0.24635700000000002}, {'name': 'C2', 'value': 0.406553}, {'name': 'C5', 'value': 0.342505}, {'name': 'C4', 'value': 0.309793}, {'name': 'S2', 'value': 0.087996}, {'name': 'FO', 'value': 0.172781}], 'links': [{'source': 'C3', 'target': 'S1', 'value': 0.080505}, {'source': 'C5', 'target': 'S1', 'value': 0.104861}, {'source': 'S1', 'target': 'FO', 'value': 0.033068}, {'source': 'C2', 'target': 'C1', 'value': 0.133598}, {'source': 'C4', 'target': 'C1', 'value': 0.083868}, {'source': 'S2', 'target': 'C1', 'value': 0.0321}, {'source': 'FO', 'target': 'C1', 'value': 0.037909}, {'source': 'C3', 'target': 'C5', 'value': 0.122949}, {'source': 'C3', 'target': 'FO', 'value': 0.047182}, {'source': 'C2', 'target': 'C4', 'value': 0.168195}, {'source': 'S2', 'target': 'C2', 'value': 0.059053999999999995}, {'source': 'C2', 'target': 'FO', 'value': 0.06990700000000001}, {'source': 'C4', 'target': 'C5', 'value': 0.036126}, {'source': 'C5', 'target': 'FO', 'value': 0.063487}, {'source': 'S2', 'target': 'C4', 'value': 0.042036000000000004}, {'source': 'C4', 'target': 'FO', 'value': 0.060736}]}

  let graph_data = [
    {name:'cluster0',data:graph_cluster0},
    {name:'cluster1',data:graph_cluster1},
    {name:'cluster2',data:graph_cluster2},
    {name:'cluster3',data:graph_cluster3},
    {name:'cluster4',data:graph_cluster4},
    {name:'cluster5',data:graph_cluster5},
    {name:'cluster6',data:graph_cluster6},
    {name:'cluster7',data:graph_cluster7},
    {name:'cluster8',data:graph_cluster8},
    {name:'cluster9',data:graph_cluster9}
  ]

  let data = graph_data.filter(d=>d.name === req.query.name)[0].data
  data.nodes = data.nodes.filter(d=>d.name[0] === 'C')
  data.links = data.links.filter(d=>d.source[0] === 'C' && d.target[0]==='C')
  res.send(graph_data.filter(d=>d.name === req.query.name)[0].data);
});

router.get("/f1_geoJson_data", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let file = path.join(__dirname, "../public/map.json"); //文件路径，__dirname为当前运行js文件的目录
  //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径
  //读取json文件
  fs.readFile(file, "utf-8", function(err, data) {
    if (err) {
      res.send("文件读取失败");
    } else {
      res.send(data);
    }
  });
});

router.get("/freq_words_data", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let file = path.join(__dirname, "../public/freq_words.json"); //文件路径，__dirname为当前运行js文件的目录
  //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径
  //读取json文件
  fs.readFile(file, "utf-8", function(err, data) {
    if (err) {
      res.send("文件读取失败");
    } else {
      res.send(data);
    }
  });
});

router.get("/meal_data", function(req, res, next) {
  sql_operation.query(`select * from meal_data`,data=>{
    res.send(data);
  });
});

router.get("/meal_dept", function(req, res, next) {
  sql_operation.query(`select * from canteen_dept_20min`,data=>{
    res.send(data);
  });
});

//////////////
router.get("/meal_dept_default", function(req, res, next) {
  sql_operation.query(`select * from meal_20min_default`,data=>{
    res.send(data);
  });
});

router.get("/meal_dept_quarter", function(req, res, next) {
  sql_operation.query(`select * from meal_20min_quarter`,data=>{
    res.send(data);
  });
});

router.get("/meal_dept_half", function(req, res, next) {
  sql_operation.query(`select * from meal_20min_half`,data=>{
    res.send(data);
  });
});
///////////////


router.get("/dept_20min_default", function(req, res, next) {
  sql_operation.query(`select * from dept_20min_default`,data=>{
    res.send(data);
  });
});

router.get("/dept_20min_half", function(req, res, next) {
  sql_operation.query(`select * from dept_20min_half`,data=>{
    res.send(data);
  });
});

router.get("/dept_20min_quarter", function(req, res, next) {
  sql_operation.query(`select * from dept_20min_quarter`,data=>{
    res.send(data);
  });
});


router.get("/network_data", function(req, res, next) {
  sql_operation.query(`select * from network_pro`,data=>{

    // data = data.filter(d=>parseInt(d.value) >= req.query.min && parseInt(d.value) <= req.query.max)
    data = data.filter(d=>parseInt(d.sg_number) >= req.query.cs_min && parseInt(d.sg_number) <= req.query.cs_max)
    data = data.filter(d=>parseInt(d.value) >= req.query.cf_min && parseInt(d.value) <= req.query.cf_max)
    // data = data.filter(d=>parseInt(d.sg_number) === 4)

    let nodes = [];
    data.forEach(d=>{
      if(nodes.findIndex(x=>x.id === d.source) !== -1 ){}
      else{
        nodes.push({id:d.source,o:d.s_o,d:d.s_d})
      }
      if(nodes.findIndex(x=>x.id === d.target) !== -1 ){}
      else{
        nodes.push({id:d.target,o:d.t_o,d:d.t_d})
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


router.get("/meal_info", function(req, res, next) {
  sql_operation.query(`select * from meal_prefer where cluster= '${req.query.cluster}'`,data=>{
    res.send(data)
  });
});

router.get("/meal_dept_timeline", function(req, res, next) {
  sql_operation.query(`select time,department,value from dept_20min_default where Canteen = '${req.query.Dept}'`,data=>{
    res.send(data);
  });
});

router.get("/meal_dept_timeline_pro", function(req, res, next) {
  sql_operation.query(`select time,department,value from dept_20min_quarter where Canteen = '${req.query.Dept}'`,data=>{
    res.send(data);
  });
});

router.get("/dept07_graph", function(req, res, next) {
  sql_operation.query(`select * from dept07_graph_final`,data=>{
    // data= data.filter(d=>d.ae_s !== null).filter(d=>d.ae_t !== null).filter(d=>d.d_t !== null).filter(d=>d.d_s !== null)

    // data = data.filter(d=>parseInt(d.value) >= req.query.min && parseInt(d.value) <= req.query.max)
    // data = data.filter(d=>parseInt(d.sg_number) >= req.query.cs_min && parseInt(d.sg_number) <= req.query.cs_max)
    data = data.filter(d=>parseInt(d.value) >= req.query.cf_min && parseInt(d.value) <= req.query.cf_max)
    // data = data.filter(d=>parseInt(d.value) > 4)

    // let G = new nx.Graph();
    //
    // data.forEach(d=>{
    //   G.addEdge(parseInt(d.source),parseInt(d.target))
    // })

    // console.log(G.subgraph());

    // res.send(G.subgraph())

    let nodes = [];

    data.forEach(d=>{
      if(nodes.findIndex(x=>x.id === parseInt(d.source)) !== -1 ){}
      else{
        nodes.push({id:parseInt(d.source),ae:d.ae_s,d:d.d_s,score:d.source_rank,class:d.s_class})
      }
      if(nodes.findIndex(x=>x.id === parseInt(d.target)) !== -1 ){}
      else{
        nodes.push({id:parseInt(d.target),ae:d.ae_t,d:d.d_t,score:d.target_rank,class:d.t_class})
      }
    });

    res.send({
      nodes:nodes,
      links:data.map(d=>{
        return {
          'source':parseInt(d.source),
          'target':parseInt(d.target),
          'value':parseInt(d.value)
        }
      })
    });
  });
});

router.get("/dept07_graph_ap", function(req, res, next) {
  sql_operation.query(`select * from dept07_graph_pro`,data=>{

    // data = data.filter(d=>parseInt(d.value) >= req.query.min && parseInt(d.value) <= req.query.max)
    // data = data.filter(d=>parseInt(d.sg_number) >= req.query.cs_min && parseInt(d.sg_number) <= req.query.cs_max)
    data = data.filter(d=>parseFloat(d.source_rank) >= req.query.ap_min && parseFloat(d.source_rank) <= req.query.ap_max)
        .filter(d=>parseFloat(d.target_rank) >= req.query.ap_min && parseFloat(d.target_rank) <= req.query.ap_max)
    data = data.filter(d=>parseInt(d.value) > 2)

    // let G = new nx.Graph();
    //
    // data.forEach(d=>{
    //   G.addEdge(parseInt(d.source),parseInt(d.target))
    // })

    // console.log(G.subgraph());

    // res.send(G.subgraph())

    let nodes = [];
    data.forEach(d=>{
      if(nodes.findIndex(x=>x.id === parseInt(d.source)) !== -1 ){}
      else{
        nodes.push({id:parseInt(d.source),ae:d.ae_s,d:d.d_s,score:d.source_rank})
      }
      if(nodes.findIndex(x=>x.id === parseInt(d.target)) !== -1 ){}
      else{
        nodes.push({id:parseInt(d.target),ae:d.ae_t,d:d.d_t,score:d.target_rank})
      }
    });

    res.send({
      nodes:nodes,
      links:data.map(d=>{
        return {
          'source':parseInt(d.source),
          'target':parseInt(d.target),
          'value':parseInt(d.value)
        }
      })
    });
  });
});

router.get("/orderliness_detail", function(req, res, next) {
  sql_operation.query(`select list from orderliness_detail where card_id = '${req.query.card_id}'`,data=>{
    if(data[0])
      res.send(data[0].list.split(' ').map((d,i)=>{
        return  {
          name:i,
          value: parseInt(d)
        }
      }));
    else
      res.send([])
  });
});

module.exports = router;
