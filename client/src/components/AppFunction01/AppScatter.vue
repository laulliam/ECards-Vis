<template>
  <div id="scatter"></div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  import * as d3 from 'd3'
  export default {
    name: "AppScatter",
    mounted() {
      DataManager.get_f1_scatter_data().then(res=>{
        this.Draw(res.data)
      })
    },
    methods:{
      Draw(data){
        let chart = this.$echarts.init(document.getElementById('scatter'));
        let option ={
          color:[
            "#4ea397",
            "#22c3aa",
            "#7bd9a5",
            "#d0648a",
            "#f58db2",
            "#f2b3c9"
          ],
          grid: {
            left: '0',
            top: '0',
            bottom:0,
            right: '0',
          },
          tooltip: {
            formatter: function (params) {
              if (params.value.length > 1) {
                return "CardID：" + params.value[2];
              }
              else {
                return params.name + ' : ' + params.value;
              }
            }
          },
          brush: {},
          toolbox: {
            show:false,
            feature: {
              brush: {
                type: ['polygon']
              },
              saveAsImage: {}
            }
          },
          xAxis: [{
            show:false,
            type: 'value',
            scale: true,
            splitLine: {
              show: true
            }
          }],
          yAxis: [{
            show:false,
            type: 'value',
            scale: true,
            splitLine: {
              show: true
            }
          }],
          series:data.map(d=>{
            return {
              name: d.name,
              type: 'scatter',
              data: d.data,
              symbolSize:3
            }
          })
        }

        chart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #scatter{
    position: absolute;
    left: 0;
    bottom:0;
    width: 25%;
    height: 30%;
  }
</style>
