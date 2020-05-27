<template>
  <div id="parallel"></div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  export default {
    name: "AppParallel",
    mounted() {
      // DataManager.get_f1_parallel_data().then(res=>{
      //   this.Draw(res.data);
      // })

    },
    methods:{
      Draw(data){
        let chart = this.$echarts.init(document.getElementById('parallel'));

        let schema = [
          {name: 'Cluster', index: 0, text: 'CLUSTER'},
          {name: 'Sum', index: 1, text: 'SUM'},
          {name: 'Canteen', index: 2, text: 'CANTEEN'},
          {name: 'SC_POS', index: 3, text: 'SC_POS'},
          {name: 'Count', index: 4, text: 'COUNT'},
          {name: 'Charge', index: 5, text: 'CHARGE'}
        ];

        let lineStyle = {
          normal: {
            width: .3,
            opacity: 0.2
          }
        };

        let option = {
          // backgroundColor: '#333',
          color:[
            "#4ea397",
            "#22c3aa",
            "#7bd9a5",
            "#d0648a",
            "#f58db2",
            "#f2b3c9"
          ],
          // legend: {
          //   top:0,
          //   left: 8,
          //   data: ['Cluster_0', 'Cluster_1', 'Cluster_2'],
          //   itemGap: 20,
          //   textStyle: {
          //     color: '#333',
          //     fontSize: 14
          //   }
          // },
          // grid:{
          //   top:48,
          //   left:24,
          //   bottom:24,
          //   right:24,
          // },
          tooltip: {
            padding: 10,
            backgroundColor: '#333',
            borderColor: '#777',
            borderWidth: 1
          },
          // dataZoom: {
          //     show: true,
          //     orient: 'vertical',
          //     parallelAxisIndex: [0]
          // },
          parallelAxis: [
            {dim: 0, name: schema[0].text},
            {dim: 1, name: schema[1].text},
            {dim: 2, name: schema[2].text},
            {dim: 3, name: schema[3].text},
            {dim: 4, name: schema[4].text},
            {dim: 5, name: schema[5].text}
          ],
          parallel: {
            left: 20,
            right: '15%',
            bottom: 20,
            top:'20%',
            parallelAxisDefault: {
              type: 'value',
              name: '',
              nameLocation: 'end',
              nameGap: 20,
              nameTextStyle: {
                color: '#333',
                fontSize: 10
              },
              axisLine: {
                lineStyle: {
                  color: '#aaa'
                }
              },
              axisTick: {
                lineStyle: {
                  color: '#333'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#333'
                }
              }
            }
          },
          series:data.map(d=>{
            return {
              name:d.name,
              type: 'parallel',
              lineStyle: lineStyle,
              smooth: true,
              data: d.data
            }
          })
        };
        chart.setOption(option);

      }
    }
  }
</script>

<style scoped>
  #parallel{
    position: absolute;
    right: 0;
    bottom:0;
    width: 25%;
    height: 30%;
  }
</style>
