var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs')
var d3 = require('d3');

var sql_operation = require("./operation");

router.get("/f1_cluster_data", function(req, res, next) {
  sql_operation.query(`select cluster from cluster_data`,data=>{
    let povertyIndex = {
      6:'P9',
      7:'P8',
      4:'P7',
      8:'P6',
      1:'P5',
      9:'P4',
      0:'P3',
      5:'P2',
      3:'P1',
      2:'P0'
    };
    data = d3.nest().key(d=>d.cluster).entries(data).map(d=>{
      return {
        'name':povertyIndex[parseInt(d.key)],
        'value': d.values.length
      }
    }).sort((a,b)=>a.name.localeCompare(b.name));
    res.send(data);
  });
});

router.get("/f1_scatter_data", function(req, res, next) {
  sql_operation.query(`select card_id,x,y,cluster from cluster_data`,data=>{
    let povertyIndex = {
      1:'P9',
      2:'P8',
      7:'P7',
      4:'P6',
      0:'P5',
      3:'P4',
      9:'P3',
      5:'P2',
      6:'P1',
      8:'P0'
    };
    data = d3.nest().key(d=>d.cluster).entries(data).map(d=>{
      return {
        name:povertyIndex[parseInt(d.key)],
        data:d.values.map(d=>[d.x,d.y,d.card_id])
      }
    }).sort((a,b)=>a.name.localeCompare(b.name));
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
  let povertyIndex = {
    1:'P9',
    2:'P8',
    7:'P7',
    4:'P6',
    0:'P5',
    3:'P4',
    9:'P3',
    5:'P2',
    6:'P1',
    8:'P0'
  };
  sql_operation.query(`select * from cluster_day_cost`,data=>{
    data.map(d=>{
      return {
        label:povertyIndex[parseInt(d.label)],
        date:d.date,
        value:d.value
      }
    })
    res.send(data);
  });
});

router.get("/f1_parallel_data", function(req, res, next) {
  sql_operation.query(`select card_id,total,cafeteria,store,charge,count,surplus_max,count,cluster from cluster_data`,data=>{
    let povertyIndex = {
      1:'P9',
      2:'P8',
      7:'P7',
      4:'P6',
      0:'P5',
      3:'P4',
      9:'P3',
      5:'P2',
      6:'P1',
      8:'P0'
    };
    data = d3.nest().key(d=>d.cluster).entries(data).map(d=>{
      return {
        // name:povertyIndex[parseInt(d.key)],
        name:d.key,
        data:d.values.map(s=>[s.cluster,s.total,s.cafeteria,s.store,s.charge,s.count])
      }
    })
    res.send(data);
  });
});

router.get("/f1_mealRate_data", function(req, res, next) {
  sql_operation.query(`select * from dine`,data=>{
    data = d3.nest().key(d=>d.label).entries(data).map(d=>{
      return {
        label:d.key,
        data:[
          (d3.sum(d.values,s=>s.morn_)/d.values.length).toFixed(2),
          (d3.sum(d.values,s=>s.noon_)/d.values.length).toFixed(2),
          (d3.sum(d.values,s=>s.even_)/d.values.length).toFixed(2),
        ]
      }
    })
    res.send(data);
  });
});

router.get("/f1_iris_data", function(req, res, next) {
  sql_operation.query(`select * from iris`,data=>{
    res.send(data);
  });
});

router.get("/f1_graph_data", function(req, res, next) {
  let graph_cluster0 = {'nodes': [{'name': '好利来食品店', 'value': 0.178842}, {'name': '第一食堂', 'value': 0.196927}, {'name': '第三食堂', 'value': 0.207959}, {'name': '第二食堂', 'value': 0.384279}, {'name': '第五食堂', 'value': 0.360047}, {'name': '第四食堂', 'value': 0.271395}, {'name': '红太阳超市', 'value': 0.063593}, {'name': '财务处', 'value': 0.14207999999999998}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.062175}, {'source': '第五食堂', 'target': '好利来食品店', 'value': 0.097518}, {'source': '第二食堂', 'target': '第一食堂', 'value': 0.117415}, {'source': '第四食堂', 'target': '第一食堂', 'value': 0.06414500000000001}, {'source': '第三食堂', 'target': '第五食堂', 'value': 0.092356}, {'source': '第二食堂', 'target': '第四食堂', 'value': 0.134634}, {'source': '第二食堂', 'target': '财务处', 'value': 0.053349}, {'source': '财务处', 'target': '第五食堂', 'value': 0.052561000000000004}]};
  let graph_cluster1 = {'nodes': [{'name': '好利来食品店', 'value': 0.16961099999999998}, {'name': '第一食堂', 'value': 0.154704}, {'name': '第三食堂', 'value': 0.184187}, {'name': '第二食堂', 'value': 0.292292}, {'name': '第五食堂', 'value': 0.329284}, {'name': '第四食堂', 'value': 0.207155}, {'name': '红太阳超市', 'value': 0.039311}, {'name': '财务处', 'value': 0.069125}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.04439}, {'source': '第二食堂', 'target': '好利来食品店', 'value': 0.012036}, {'source': '第五食堂', 'target': '好利来食品店', 'value': 0.067248}, {'source': '好利来食品店', 'target': '第四食堂', 'value': 0.018662}, {'source': '第二食堂', 'target': '第一食堂', 'value': 0.074205}, {'source': '第一食堂', 'target': '第四食堂', 'value': 0.036108999999999995}, {'source': '第一食堂', 'target': '红太阳超市', 'value': 0.012809000000000001}, {'source': '第五食堂', 'target': '第三食堂', 'value': 0.052341}, {'source': '财务处', 'target': '第三食堂', 'value': 0.013472}, {'source': '第二食堂', 'target': '第五食堂', 'value': 0.017116}, {'source': '第二食堂', 'target': '第四食堂', 'value': 0.067138}, {'source': '第二食堂', 'target': '红太阳超市', 'value': 0.020318}, {'source': '第二食堂', 'target': '财务处', 'value': 0.018883}, {'source': '第五食堂', 'target': '第四食堂', 'value': 0.021863999999999998}, {'source': '第五食堂', 'target': '财务处', 'value': 0.020649}, {'source': '第四食堂', 'target': '红太阳超市', 'value': 0.014024000000000002}, {'source': '财务处', 'target': '第四食堂', 'value': 0.018993}]}
  let graph_cluster2 = {'nodes': [{'name': '好利来食品店', 'value': 0.08168500000000001}, {'name': '第一食堂', 'value': 0.188441}, {'name': '第三食堂', 'value': 0.16305799999999998}, {'name': '第二食堂', 'value': 0.39019499999999996}, {'name': '第五食堂', 'value': 0.316598}, {'name': '第四食堂', 'value': 0.259363}, {'name': '红太阳超市', 'value': 0.042615}, {'name': '财务处', 'value': 0.10924500000000001}], 'links': [{'source': '好利来食品店', 'target': '第五食堂', 'value': 0.040873}, {'source': '第一食堂', 'target': '第二食堂', 'value': 0.102775}, {'source': '第四食堂', 'target': '第一食堂', 'value': 0.049645}, {'source': '第三食堂', 'target': '第五食堂', 'value': 0.063208}, {'source': '第四食堂', 'target': '第二食堂', 'value': 0.110924}, {'source': '财务处', 'target': '第二食堂', 'value': 0.035772000000000005}, {'source': '第五食堂', 'target': '财务处', 'value': 0.031417}, {'source': '第四食堂', 'target': '财务处', 'value': 0.034279000000000004}]}
  let graph_cluster3 = {'nodes': [{'name': '好利来食品店', 'value': 0.147651}, {'name': '第一食堂', 'value': 0.239441}, {'name': '第三食堂', 'value': 0.205139}, {'name': '第二食堂', 'value': 0.43027600000000005}, {'name': '第五食堂', 'value': 0.295302}, {'name': '第四食堂', 'value': 0.339163}, {'name': '红太阳超市', 'value': 0.081622}, {'name': '财务处', 'value': 0.08670599999999999}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.061148}, {'source': '第五食堂', 'target': '好利来食品店', 'value': 0.076063}, {'source': '第一食堂', 'target': '第二食堂', 'value': 0.141956}, {'source': '第一食堂', 'target': '第四食堂', 'value': 0.094705}, {'source': '第一食堂', 'target': '红太阳超市', 'value': 0.031455000000000004}, {'source': '第五食堂', 'target': '第三食堂', 'value': 0.093417}, {'source': '第四食堂', 'target': '第二食堂', 'value': 0.179174}, {'source': '第二食堂', 'target': '红太阳超市', 'value': 0.052132000000000005}, {'source': '第二食堂', 'target': '财务处', 'value': 0.035998}, {'source': '第四食堂', 'target': '红太阳超市', 'value': 0.040472}, {'source': '第四食堂', 'target': '财务处', 'value': 0.032405}]}
  let graph_cluster4 = {'nodes': [{'name': '好利来食品店', 'value': 0.20136300000000001}, {'name': '第一食堂', 'value': 0.18706199999999998}, {'name': '第三食堂', 'value': 0.172569}, {'name': '第二食堂', 'value': 0.352721}, {'name': '第五食堂', 'value': 0.301948}, {'name': '第四食堂', 'value': 0.27929699999999996}, {'name': '红太阳超市', 'value': 0.061329999999999996}, {'name': '财务处', 'value': 0.058355}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.05442}, {'source': '第五食堂', 'target': '好利来食品店', 'value': 0.09252300000000001}, {'source': '第一食堂', 'target': '第二食堂', 'value': 0.10039400000000001}, {'source': '第一食堂', 'target': '第四食堂', 'value': 0.060753999999999996}, {'source': '第五食堂', 'target': '第三食堂', 'value': 0.06929600000000001}, {'source': '第四食堂', 'target': '第二食堂', 'value': 0.12045299999999999}, {'source': '红太阳超市', 'target': '第二食堂', 'value': 0.03628}]}
  let graph_cluster5 = {'nodes': [{'name': '好利来食品店', 'value': 0.14945799999999998}, {'name': '第一食堂', 'value': 0.274192}, {'name': '第三食堂', 'value': 0.22298400000000002}, {'name': '第二食堂', 'value': 0.474025}, {'name': '第五食堂', 'value': 0.256598}, {'name': '第四食堂', 'value': 0.390499}, {'name': '红太阳超市', 'value': 0.11250999999999999}, {'name': '财务处', 'value': 0.12862300000000002}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.07695199999999999}, {'source': '好利来食品店', 'target': '第五食堂', 'value': 0.077137}, {'source': '第一食堂', 'target': '第二食堂', 'value': 0.170664}, {'source': '第四食堂', 'target': '第一食堂', 'value': 0.12158499999999998}, {'source': '第一食堂', 'target': '红太阳超市', 'value': 0.041948}, {'source': '第一食堂', 'target': '财务处', 'value': 0.034725}, {'source': '第三食堂', 'target': '第五食堂', 'value': 0.114548}, {'source': '第三食堂', 'target': '财务处', 'value': 0.030188}, {'source': '第四食堂', 'target': '第二食堂', 'value': 0.22529899999999997}, {'source': '红太阳超市', 'target': '第二食堂', 'value': 0.074822}, {'source': '第二食堂', 'target': '财务处', 'value': 0.062135}, {'source': '第四食堂', 'target': '第五食堂', 'value': 0.033799}, {'source': '第五食堂', 'target': '财务处', 'value': 0.035095999999999995}, {'source': '第四食堂', 'target': '红太阳超市', 'value': 0.060654}, {'source': '第四食堂', 'target': '财务处', 'value': 0.05343099999999999}]}
  let graph_cluster6 = {'nodes': [{'name': '好利来食品店', 'value': 0.15012899999999998}, {'name': '第一食堂', 'value': 0.23778600000000003}, {'name': '第三食堂', 'value': 0.175759}, {'name': '第二食堂', 'value': 0.412566}, {'name': '第五食堂', 'value': 0.287621}, {'name': '第四食堂', 'value': 0.333719}, {'name': '红太阳超市', 'value': 0.10171799999999999}, {'name': '财务处', 'value': 0.145146}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.0574}, {'source': '第五食堂', 'target': '好利来食品店', 'value': 0.078135}, {'source': '第二食堂', 'target': '第一食堂', 'value': 0.139183}, {'source': '第一食堂', 'target': '第四食堂', 'value': 0.10314100000000001}, {'source': '红太阳超市', 'target': '第一食堂', 'value': 0.038978}, {'source': '财务处', 'target': '第一食堂', 'value': 0.033194}, {'source': '第三食堂', 'target': '第五食堂', 'value': 0.07849099999999999}, {'source': '第二食堂', 'target': '第四食堂', 'value': 0.17389000000000002}, {'source': '红太阳超市', 'target': '第二食堂', 'value': 0.06514199999999999}, {'source': '第二食堂', 'target': '财务处', 'value': 0.057934000000000006}, {'source': '财务处', 'target': '第五食堂', 'value': 0.039779}, {'source': '红太阳超市', 'target': '第四食堂', 'value': 0.052238}, {'source': '财务处', 'target': '第四食堂', 'value': 0.055086}]}
  let graph_cluster7 = {'nodes': [{'name': '好利来食品店', 'value': 0.383013}, {'name': '第一食堂', 'value': 0.087641}, {'name': '第三食堂', 'value': 0.289327}, {'name': '第二食堂', 'value': 0.170352}, {'name': '第五食堂', 'value': 0.44774899999999995}, {'name': '第四食堂', 'value': 0.152855}, {'name': '红太阳超市', 'value': 0.06839500000000001}, {'name': '财务处', 'value': 0.117862}], 'links': [{'source': '好利来食品店', 'target': '第三食堂', 'value': 0.12231600000000001}, {'source': '好利来食品店', 'target': '第二食堂', 'value': 0.031653}, {'source': '好利来食品店', 'target': '第五食堂', 'value': 0.161126}, {'source': '第四食堂', 'target': '好利来食品店', 'value': 0.04724}, {'source': '好利来食品店', 'target': '财务处', 'value': 0.039127999999999996}, {'source': '第一食堂', 'target': '第二食堂', 'value': 0.040401}, {'source': '第三食堂', 'target': '第五食堂', 'value': 0.090027}, {'source': '财务处', 'target': '第三食堂', 'value': 0.037856}, {'source': '第四食堂', 'target': '第二食堂', 'value': 0.037538}, {'source': '第二食堂', 'target': '红太阳超市', 'value': 0.038969}, {'source': '财务处', 'target': '第五食堂', 'value': 0.052012}]}
  let graph_cluster8 = {'nodes': [{'name': '好利来食品店', 'value': 0.189985}, {'name': '第一食堂', 'value': 0.2591}, {'name': '第三食堂', 'value': 0.24289899999999998}, {'name': '第二食堂', 'value': 0.448243}, {'name': '第五食堂', 'value': 0.294761}, {'name': '第四食堂', 'value': 0.380076}, {'name': '红太阳超市', 'value': 0.14790699999999998}, {'name': '财务处', 'value': 0.207869}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.09804299999999999}, {'source': '第五食堂', 'target': '好利来食品店', 'value': 0.109825}, {'source': '财务处', 'target': '好利来食品店', 'value': 0.042079000000000005}, {'source': '第一食堂', 'target': '第二食堂', 'value': 0.158637}, {'source': '第四食堂', 'target': '第一食堂', 'value': 0.11824100000000001}, {'source': '红太阳超市', 'target': '第一食堂', 'value': 0.062487}, {'source': '财务处', 'target': '第一食堂', 'value': 0.054071}, {'source': '第五食堂', 'target': '第三食堂', 'value': 0.127814}, {'source': '财务处', 'target': '第三食堂', 'value': 0.050914999999999995}, {'source': '第四食堂', 'target': '第二食堂', 'value': 0.22259600000000002}, {'source': '红太阳超市', 'target': '第二食堂', 'value': 0.102146}, {'source': '财务处', 'target': '第二食堂', 'value': 0.09636}, {'source': '第四食堂', 'target': '第五食堂', 'value': 0.033137}, {'source': '财务处', 'target': '第五食堂', 'value': 0.066695}, {'source': '第四食堂', 'target': '红太阳超市', 'value': 0.08394700000000001}, {'source': '财务处', 'target': '第四食堂', 'value': 0.09046900000000001}, {'source': '财务处', 'target': '红太阳超市', 'value': 0.039764}]}
  let graph_cluster9 = {'nodes': [{'name': '好利来食品店', 'value': 0.186538}, {'name': '第一食堂', 'value': 0.21818}, {'name': '第三食堂', 'value': 0.24635700000000002}, {'name': '第二食堂', 'value': 0.406553}, {'name': '第五食堂', 'value': 0.342505}, {'name': '第四食堂', 'value': 0.309793}, {'name': '红太阳超市', 'value': 0.087996}, {'name': '财务处', 'value': 0.172781}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.080505}, {'source': '第五食堂', 'target': '好利来食品店', 'value': 0.104861}, {'source': '好利来食品店', 'target': '财务处', 'value': 0.033068}, {'source': '第二食堂', 'target': '第一食堂', 'value': 0.133598}, {'source': '第四食堂', 'target': '第一食堂', 'value': 0.083868}, {'source': '红太阳超市', 'target': '第一食堂', 'value': 0.0321}, {'source': '财务处', 'target': '第一食堂', 'value': 0.037909}, {'source': '第三食堂', 'target': '第五食堂', 'value': 0.122949}, {'source': '第三食堂', 'target': '财务处', 'value': 0.047182}, {'source': '第二食堂', 'target': '第四食堂', 'value': 0.168195}, {'source': '红太阳超市', 'target': '第二食堂', 'value': 0.059053999999999995}, {'source': '第二食堂', 'target': '财务处', 'value': 0.06990700000000001}, {'source': '第四食堂', 'target': '第五食堂', 'value': 0.036126}, {'source': '第五食堂', 'target': '财务处', 'value': 0.063487}, {'source': '红太阳超市', 'target': '第四食堂', 'value': 0.042036000000000004}, {'source': '第四食堂', 'target': '财务处', 'value': 0.060736}]}

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
  res.send(graph_data);
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

router.get("/test_data", function(req, res, next) {
  sql_operation.query(`select * from test02`,data=>{
    data.forEach(d=>{
          d.avg = parseFloat(d.avg);
          d.minmin = parseFloat(d.minmin);
          d.maxmax = parseFloat(d.maxmax);
          d.max = parseFloat(d.max);
          d.min = parseFloat(d.min);
        }
    )
    res.send(data);
  });
});

router.get("/test_data1", function(req, res, next) {
  let  data = [{"State":"AL","Under 5 Years":310504,"5 to 13 Years":552339,"14 to 17 Years":259034,"18 to 24 Years":450818,"25 to 44 Years":1231572,"45 to 64 Years":1215966,"65 Years and Over":641667,"total":4661900},{"State":"AK","Under 5 Years":52083,"5 to 13 Years":85640,"14 to 17 Years":42153,"18 to 24 Years":74257,"25 to 44 Years":198724,"45 to 64 Years":183159,"65 Years and Over":50277,"total":686293},{"State":"AZ","Under 5 Years":515910,"5 to 13 Years":828669,"14 to 17 Years":362642,"18 to 24 Years":601943,"25 to 44 Years":1804762,"45 to 64 Years":1523681,"65 Years and Over":862573,"total":6500180},{"State":"AR","Under 5 Years":202070,"5 to 13 Years":343207,"14 to 17 Years":157204,"18 to 24 Years":264160,"25 to 44 Years":754420,"45 to 64 Years":727124,"65 Years and Over":407205,"total":2855390},{"State":"CA","Under 5 Years":2704659,"5 to 13 Years":4499890,"14 to 17 Years":2159981,"18 to 24 Years":3853788,"25 to 44 Years":10604510,"45 to 64 Years":8819342,"65 Years and Over":4114496,"total":36756666},{"State":"CO","Under 5 Years":358280,"5 to 13 Years":587154,"14 to 17 Years":261701,"18 to 24 Years":466194,"25 to 44 Years":1464939,"45 to 64 Years":1290094,"65 Years and Over":511094,"total":4939456},{"State":"CT","Under 5 Years":211637,"5 to 13 Years":403658,"14 to 17 Years":196918,"18 to 24 Years":325110,"25 to 44 Years":916955,"45 to 64 Years":968967,"65 Years and Over":478007,"total":3501252},{"State":"DE","Under 5 Years":59319,"5 to 13 Years":99496,"14 to 17 Years":47414,"18 to 24 Years":84464,"25 to 44 Years":230183,"45 to 64 Years":230528,"65 Years and Over":121688,"total":873092},{"State":"DC","Under 5 Years":36352,"5 to 13 Years":50439,"14 to 17 Years":25225,"18 to 24 Years":75569,"25 to 44 Years":193557,"45 to 64 Years":140043,"65 Years and Over":70648,"total":591833},{"State":"FL","Under 5 Years":1140516,"5 to 13 Years":1938695,"14 to 17 Years":925060,"18 to 24 Years":1607297,"25 to 44 Years":4782119,"45 to 64 Years":4746856,"65 Years and Over":3187797,"total":18328340},{"State":"GA","Under 5 Years":740521,"5 to 13 Years":1250460,"14 to 17 Years":557860,"18 to 24 Years":919876,"25 to 44 Years":2846985,"45 to 64 Years":2389018,"65 Years and Over":981024,"total":9685744},{"State":"HI","Under 5 Years":87207,"5 to 13 Years":134025,"14 to 17 Years":64011,"18 to 24 Years":124834,"25 to 44 Years":356237,"45 to 64 Years":331817,"65 Years and Over":190067,"total":1288198},{"State":"ID","Under 5 Years":121746,"5 to 13 Years":201192,"14 to 17 Years":89702,"18 to 24 Years":147606,"25 to 44 Years":406247,"45 to 64 Years":375173,"65 Years and Over":182150,"total":1523816},{"State":"IL","Under 5 Years":894368,"5 to 13 Years":1558919,"14 to 17 Years":725973,"18 to 24 Years":1311479,"25 to 44 Years":3596343,"45 to 64 Years":3239173,"65 Years and Over":1575308,"total":12901563},{"State":"IN","Under 5 Years":443089,"5 to 13 Years":780199,"14 to 17 Years":361393,"18 to 24 Years":605863,"25 to 44 Years":1724528,"45 to 64 Years":1647881,"65 Years and Over":813839,"total":6376792},{"State":"IA","Under 5 Years":201321,"5 to 13 Years":345409,"14 to 17 Years":165883,"18 to 24 Years":306398,"25 to 44 Years":750505,"45 to 64 Years":788485,"65 Years and Over":444554,"total":3002555},{"State":"KS","Under 5 Years":202529,"5 to 13 Years":342134,"14 to 17 Years":155822,"18 to 24 Years":293114,"25 to 44 Years":728166,"45 to 64 Years":713663,"65 Years and Over":366706,"total":2802134},{"State":"KY","Under 5 Years":284601,"5 to 13 Years":493536,"14 to 17 Years":229927,"18 to 24 Years":381394,"25 to 44 Years":1179637,"45 to 64 Years":1134283,"65 Years and Over":565867,"total":4269245},{"State":"LA","Under 5 Years":310716,"5 to 13 Years":542341,"14 to 17 Years":254916,"18 to 24 Years":471275,"25 to 44 Years":1162463,"45 to 64 Years":1128771,"65 Years and Over":540314,"total":4410796},{"State":"ME","Under 5 Years":71459,"5 to 13 Years":133656,"14 to 17 Years":69752,"18 to 24 Years":112682,"25 to 44 Years":331809,"45 to 64 Years":397911,"65 Years and Over":199187,"total":1316456},{"State":"MD","Under 5 Years":371787,"5 to 13 Years":651923,"14 to 17 Years":316873,"18 to 24 Years":543470,"25 to 44 Years":1556225,"45 to 64 Years":1513754,"65 Years and Over":679565,"total":5633597},{"State":"MA","Under 5 Years":383568,"5 to 13 Years":701752,"14 to 17 Years":341713,"18 to 24 Years":665879,"25 to 44 Years":1782449,"45 to 64 Years":1751508,"65 Years and Over":871098,"total":6497967},{"State":"MI","Under 5 Years":625526,"5 to 13 Years":1179503,"14 to 17 Years":585169,"18 to 24 Years":974480,"25 to 44 Years":2628322,"45 to 64 Years":2706100,"65 Years and Over":1304322,"total":10003422},{"State":"MN","Under 5 Years":358471,"5 to 13 Years":606802,"14 to 17 Years":289371,"18 to 24 Years":507289,"25 to 44 Years":1416063,"45 to 64 Years":1391878,"65 Years and Over":650519,"total":5220393},{"State":"MS","Under 5 Years":220813,"5 to 13 Years":371502,"14 to 17 Years":174405,"18 to 24 Years":305964,"25 to 44 Years":764203,"45 to 64 Years":730133,"65 Years and Over":371598,"total":2938618},{"State":"MO","Under 5 Years":399450,"5 to 13 Years":690476,"14 to 17 Years":331543,"18 to 24 Years":560463,"25 to 44 Years":1569626,"45 to 64 Years":1554812,"65 Years and Over":805235,"total":5911605},{"State":"MT","Under 5 Years":61114,"5 to 13 Years":106088,"14 to 17 Years":53156,"18 to 24 Years":95232,"25 to 44 Years":236297,"45 to 64 Years":278241,"65 Years and Over":137312,"total":967440},{"State":"NE","Under 5 Years":132092,"5 to 13 Years":215265,"14 to 17 Years":99638,"18 to 24 Years":186657,"25 to 44 Years":457177,"45 to 64 Years":451756,"65 Years and Over":240847,"total":1783432},{"State":"NV","Under 5 Years":199175,"5 to 13 Years":325650,"14 to 17 Years":142976,"18 to 24 Years":212379,"25 to 44 Years":769913,"45 to 64 Years":653357,"65 Years and Over":296717,"total":2600167},{"State":"NH","Under 5 Years":75297,"5 to 13 Years":144235,"14 to 17 Years":73826,"18 to 24 Years":119114,"25 to 44 Years":345109,"45 to 64 Years":388250,"65 Years and Over":169978,"total":1315809},{"State":"NJ","Under 5 Years":557421,"5 to 13 Years":1011656,"14 to 17 Years":478505,"18 to 24 Years":769321,"25 to 44 Years":2379649,"45 to 64 Years":2335168,"65 Years and Over":1150941,"total":8682661},{"State":"NM","Under 5 Years":148323,"5 to 13 Years":241326,"14 to 17 Years":112801,"18 to 24 Years":203097,"25 to 44 Years":517154,"45 to 64 Years":501604,"65 Years and Over":260051,"total":1984356},{"State":"NY","Under 5 Years":1208495,"5 to 13 Years":2141490,"14 to 17 Years":1058031,"18 to 24 Years":1999120,"25 to 44 Years":5355235,"45 to 64 Years":5120254,"65 Years and Over":2607672,"total":19490297},{"State":"NC","Under 5 Years":652823,"5 to 13 Years":1097890,"14 to 17 Years":492964,"18 to 24 Years":883397,"25 to 44 Years":2575603,"45 to 64 Years":2380685,"65 Years and Over":1139052,"total":9222414},{"State":"ND","Under 5 Years":41896,"5 to 13 Years":67358,"14 to 17 Years":33794,"18 to 24 Years":82629,"25 to 44 Years":154913,"45 to 64 Years":166615,"65 Years and Over":94276,"total":641481},{"State":"OH","Under 5 Years":743750,"5 to 13 Years":1340492,"14 to 17 Years":646135,"18 to 24 Years":1081734,"25 to 44 Years":3019147,"45 to 64 Years":3083815,"65 Years and Over":1570837,"total":11485910},{"State":"OK","Under 5 Years":266547,"5 to 13 Years":438926,"14 to 17 Years":200562,"18 to 24 Years":369916,"25 to 44 Years":957085,"45 to 64 Years":918688,"65 Years and Over":490637,"total":3642361},{"State":"OR","Under 5 Years":243483,"5 to 13 Years":424167,"14 to 17 Years":199925,"18 to 24 Years":338162,"25 to 44 Years":1044056,"45 to 64 Years":1036269,"65 Years and Over":503998,"total":3790060},{"State":"PA","Under 5 Years":737462,"5 to 13 Years":1345341,"14 to 17 Years":679201,"18 to 24 Years":1203944,"25 to 44 Years":3157759,"45 to 64 Years":3414001,"65 Years and Over":1910571,"total":12448279},{"State":"RI","Under 5 Years":60934,"5 to 13 Years":111408,"14 to 17 Years":56198,"18 to 24 Years":114502,"25 to 44 Years":277779,"45 to 64 Years":282321,"65 Years and Over":147646,"total":1050788},{"State":"SC","Under 5 Years":303024,"5 to 13 Years":517803,"14 to 17 Years":245400,"18 to 24 Years":438147,"25 to 44 Years":1193112,"45 to 64 Years":1186019,"65 Years and Over":596295,"total":4479800},{"State":"SD","Under 5 Years":58566,"5 to 13 Years":94438,"14 to 17 Years":45305,"18 to 24 Years":82869,"25 to 44 Years":196738,"45 to 64 Years":210178,"65 Years and Over":116100,"total":804194},{"State":"TN","Under 5 Years":416334,"5 to 13 Years":725948,"14 to 17 Years":336312,"18 to 24 Years":550612,"25 to 44 Years":1719433,"45 to 64 Years":1646623,"65 Years and Over":819626,"total":6214888},{"State":"TX","Under 5 Years":2027307,"5 to 13 Years":3277946,"14 to 17 Years":1420518,"18 to 24 Years":2454721,"25 to 44 Years":7017731,"45 to 64 Years":5656528,"65 Years and Over":2472223,"total":24326974},{"State":"UT","Under 5 Years":268916,"5 to 13 Years":413034,"14 to 17 Years":167685,"18 to 24 Years":329585,"25 to 44 Years":772024,"45 to 64 Years":538978,"65 Years and Over":246202,"total":2736424},{"State":"VT","Under 5 Years":32635,"5 to 13 Years":62538,"14 to 17 Years":33757,"18 to 24 Years":61679,"25 to 44 Years":155419,"45 to 64 Years":188593,"65 Years and Over":86649,"total":621270},{"State":"VA","Under 5 Years":522672,"5 to 13 Years":887525,"14 to 17 Years":413004,"18 to 24 Years":768475,"25 to 44 Years":2203286,"45 to 64 Years":2033550,"65 Years and Over":940577,"total":7769089},{"State":"WA","Under 5 Years":433119,"5 to 13 Years":750274,"14 to 17 Years":357782,"18 to 24 Years":610378,"25 to 44 Years":1850983,"45 to 64 Years":1762811,"65 Years and Over":783877,"total":6549224},{"State":"WV","Under 5 Years":105435,"5 to 13 Years":189649,"14 to 17 Years":91074,"18 to 24 Years":157989,"25 to 44 Years":470749,"45 to 64 Years":514505,"65 Years and Over":285067,"total":1814468},{"State":"WI","Under 5 Years":362277,"5 to 13 Years":640286,"14 to 17 Years":311849,"18 to 24 Years":553914,"25 to 44 Years":1487457,"45 to 64 Years":1522038,"65 Years and Over":750146,"total":5627967},{"State":"WY","Under 5 Years":38253,"5 to 13 Years":60890,"14 to 17 Years":29314,"18 to 24 Years":53980,"25 to 44 Years":137338,"45 to 64 Years":147279,"65 Years and Over":65614,"total":532668}]
  res.send(data);
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

router.get("/meal_dept_pro", function(req, res, next) {
  sql_operation.query(`select * from canteen_dept_20min_pro`,data=>{
    res.send(data);
  });
});


router.get("/f4_network_data", function(req, res, next) {
  sql_operation.query(`select * from network_13`,data=>{

    // data = data.filter(d=>parseInt(d.value) > 5)
    data = data.slice(0,200)
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

module.exports = router;
