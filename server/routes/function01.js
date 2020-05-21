var express = require('express');
var router = express.Router();
var d3 = require('d3');

var sql_operation = require("./operation");

// router.get("/f1_main_data", function(req, res, next) {
//   sql_operation.query(`select department from features_data`,data=>{
//     data = d3.nest().key(d=>d.department).entries(data).map(d=>{
//       return {
//         'name':'Dept_'+d.key,
//         'value': d.values.length
//       }
//     });
//     res.send(data);
//   });
// });
//
// router.get("/f1_main_dept", function(req, res, next) {
//   sql_operation.query(`select sum,meal,supermarket,study,transport,other from features_data where department = '${req.query.dept}'`,data=>{
//     let sum = d3.sum(data,d=>d.sum).toFixed(2);
//     res.send([
//       {name:'meal',value: (d3.sum(data,d=>d.meal)/sum).toFixed(2)},
//       {name:'supermarket',value:(d3.sum(data,d=>d.supermarket)/sum).toFixed(2)},
//       {name:'study',value:(d3.sum(data,d=>d.study)/sum).toFixed(2)},
//       {name:'transport',value:(d3.sum(data,d=>d.transport)/sum).toFixed(2)},
//       {name:'other',value:(d3.sum(data,d=>d.other)/sum).toFixed(2)}
//     ]);
//   });
// });
//
// router.get("/f1_cluster_data", function(req, res, next) {
//   sql_operation.query(`select label from dept_13`,data=>{
//     data = d3.nest().key(d=>d.label).entries(data).map(d=>{
//       return {
//         'name':'Cluster_'+d.key,
//         'value': d.values.length
//       }
//     });
//     res.send(data);
//   });
// });
//
// router.get("/f1_radar_data", function(req, res, next) {
//   sql_operation.query(`select * from dept_13`,data=>{
//     data = d3.nest().key(d=>d.label).entries(data).map(d=>{
//       return {
//         'name':'Cluster_'+d.key,
//         'sum': (d3.sum(d.values,s=>s.sum)/d.values.length).toFixed(2),
//         'charge':(d3.sum(d.values,s=>s.charge_per)/d.values.length).toFixed(2),
//         'day_cost':(d3.sum(d.values,s=>s.day_cost)/d.values.length).toFixed(2),
//         'canteen':(d3.sum(d.values,s=>s.canteen)/d.values.length).toFixed(2),
//         'supermarket':(d3.sum(d.values,s=>s.supermarket)/d.values.length).toFixed(2),
//         'edu':(d3.sum(d.values,s=>s.edu)/d.values.length).toFixed(2),
//         'transport':(d3.sum(d.values,s=>s.transport)/d.values.length).toFixed(2)
//       }
//     });
//     res.send(data);
//   });
// });
//
// router.get("/f1_timeline_data", function(req, res, next) {
//   sql_operation.query(`select * from timeline_13`,data=>{
//     res.send(data);
//   });
// });
//
// router.get("/f1_parallel_data", function(req, res, next) {
//   sql_operation.query(`select * from dept_13`,data=>{
//     data = d3.nest().key(d=>d.label).entries(data).map(d=>{
//       return {
//         name:'Cluster_'+d.key,
//         data:d.values.map(s=>[s.sum,s.charge_per,s.edu,s.canteen,s.supermarket])
//       }
//     })
//     res.send(data);
//   });
// });

router.get("/f1_cluster_data", function(req, res, next) {
  sql_operation.query(`select label from cluster`,data=>{
    data = d3.nest().key(d=>d.label).entries(data).map(d=>{
      return {
        'name':d.key,
        'value': d.values.length
      }
    }).sort((a,b)=>parseInt(a.name) - parseInt(b.name)).map(d=>{
      return{
        name:'Cluster'+d.name,
        value:d.value
      }
    });
    res.send(data);
  });
});

router.get("/f1_scatter_data", function(req, res, next) {
  sql_operation.query(`select card_id,x,y,label from cluster`,data=>{
    data = d3.nest().key(d=>d.label).entries(data).map(d=>{
      return {
        name:'Cluster_'+d.key,
        data:d.values.map(d=>[d.x,d.y,d.card_id])
      }
    })
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
  sql_operation.query(`select * from cluster_date`,data=>{
    res.send(data);
  });
});

router.get("/f1_parallel_data", function(req, res, next) {
  sql_operation.query(`select card_id,sum_cost,canteen,sc_pos,charge_sum,charge_count,surplus_max,count,label from cluster`,data=>{
    data = d3.nest().key(d=>d.label).entries(data).map(d=>{
      return {
        name:'Cluster'+d.key,
        data:d.values.map(s=>[s.label,s.sum_cost,s.canteen,s.sc_pos,s.count,s.charge_sum])
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

router.get("/f1_graph_data", function(req, res, next) {
  let graph_cluster0 = {'nodes': [{'name': '好利来食品店', 'value': 0.178842}, {'name': '第一食堂', 'value': 0.196927}, {'name': '第三食堂', 'value': 0.207959}, {'name': '第二食堂', 'value': 0.384279}, {'name': '第五食堂', 'value': 0.360047}, {'name': '第四食堂', 'value': 0.271395}, {'name': '红太阳超市', 'value': 0.063593}, {'name': '财务处', 'value': 0.14207999999999998}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.062175}, {'source': '第五食堂', 'target': '好利来食品店', 'value': 0.097518}, {'source': '第二食堂', 'target': '第一食堂', 'value': 0.117415}, {'source': '第四食堂', 'target': '第一食堂', 'value': 0.06414500000000001}, {'source': '第三食堂', 'target': '第五食堂', 'value': 0.092356}, {'source': '第二食堂', 'target': '第四食堂', 'value': 0.134634}, {'source': '第二食堂', 'target': '财务处', 'value': 0.053349}, {'source': '财务处', 'target': '第五食堂', 'value': 0.052561000000000004}]};
  let graph_cluster1 = {'nodes': [{'name': '好利来食品店', 'value': 0.16961099999999998}, {'name': '教师食堂', 'value': 0.04693}, {'name': '水电缴费处', 'value': 0.019987}, {'name': '第一食堂', 'value': 0.154704}, {'name': '第三食堂', 'value': 0.184187}, {'name': '第二食堂', 'value': 0.292292}, {'name': '第五食堂', 'value': 0.329284}, {'name': '第四食堂', 'value': 0.207155}, {'name': '红太阳超市', 'value': 0.039311}, {'name': '财务处', 'value': 0.069125}], 'links': [{'source': '第三食堂', 'target': '好利来食品店', 'value': 0.04439}, {'source': '第二食堂', 'target': '好利来食品店', 'value': 0.012036}, {'source': '第五食堂', 'target': '好利来食品店', 'value': 0.067248}, {'source': '好利来食品店', 'target': '第四食堂', 'value': 0.018662}, {'source': '第二食堂', 'target': '第一食堂', 'value': 0.074205}, {'source': '第一食堂', 'target': '第四食堂', 'value': 0.036108999999999995}, {'source': '第一食堂', 'target': '红太阳超市', 'value': 0.012809000000000001}, {'source': '第五食堂', 'target': '第三食堂', 'value': 0.052341}, {'source': '财务处', 'target': '第三食堂', 'value': 0.013472}, {'source': '第二食堂', 'target': '第五食堂', 'value': 0.017116}, {'source': '第二食堂', 'target': '第四食堂', 'value': 0.067138}, {'source': '第二食堂', 'target': '红太阳超市', 'value': 0.020318}, {'source': '第二食堂', 'target': '财务处', 'value': 0.018883}, {'source': '第五食堂', 'target': '第四食堂', 'value': 0.021863999999999998}, {'source': '第五食堂', 'target': '财务处', 'value': 0.020649}, {'source': '第四食堂', 'target': '红太阳超市', 'value': 0.014024000000000002}, {'source': '财务处', 'target': '第四食堂', 'value': 0.018993}]}
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



module.exports = router;
