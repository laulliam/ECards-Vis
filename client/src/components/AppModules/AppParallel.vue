<template>
    <div id="parallel_chart"></div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  export default {
    name: "AppParallel",
    mounted() {
      DataManager.get_f1_parallel_data().then(res=>{
        this.Draw(res.data);
      })
    },
    methods:{
      Draw(data){
        let chart = this.$echarts.init(document.getElementById('parallel_chart'));
        let color = [
            "#d0648a",
            "#d07999",
            "#f58db2",
            "#f2b3c9",
            "#f2c4bc",
            "#dcf296",
            "#b8f29c",
            "#7bd9a5",
            "#22c3aa",
            "#4ea397"
          ];
        let option = {
          backgroundColor: '#fff',
          title:{
            text:'Poverty Parallel',
            textStyle:{
              fontSize:16
            }
          },
          legend: {
            left: 8,
            top:52,
            icon:'rect',
            itemWidth:20 ,
            itemHeight:3,
            itemGap:5.13,
            orient:'vertical',
            align:'right',
            textStyle: {
              fontSize:9,
              color:'rgba(204,204,204,0.98)'
            },
            data:['P0','P1','P2','P3','P4','P5','P6','P7','P8','P9']
          },
          parallelAxis: [
            {dim: 0, name: '',max:9,show: false,inverse: true},
            {dim: 1, name: 'TOTAL'},
            {dim: 2, name: 'CAFETERIA'},
            {dim: 3, name: 'STORE'},
            {dim: 4, name: 'COUNT'},
            {dim: 5, name: 'CHARGE'}
          ],
          parallel: {
            left: '12%',
            right: '12%',
            bottom:20,
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
                  color: '#ccc'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: '#565656'
                }
              }
            }
          },
          series:data.map(d=>{
            return {
              name:'P'+d.name,
              type: 'parallel',
              lineStyle: {
                normal: {
                  color:color[parseInt(d.name)],
                  width: .3,
                  opacity: 0.2
                }
              },
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
#parallel_chart{
  position: absolute;
  left: 0;
  bottom:0;
  width: 27%;
  height: 30%;
}
</style>
