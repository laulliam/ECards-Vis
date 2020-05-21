<template>
  <div id="timeline"></div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  export default {
    name: "AppTimeLine",
    mounted() {
      DataManager.get_f1_timeline_data().then(res=>{
        this.Draw(res.data)
      })
    },
    methods:{
      Draw(data){
        let chart = this.$echarts.init(document.getElementById('timeline'));

        let option = {
          color:[
            "#4ea397",
            "#22c3aa",
            "#7bd9a5",
            "#d0648a",
            "#f58db2",
            "#f2b3c9"
          ],
          grid: {
            left: '5%',
            top: '0',
            bottom:0,
            right: '0',
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: 'rgba(0,0,0,0.2)',
                width: 1,
                type: 'solid'
              }
            }
          },
          singleAxis: {
            bottom: 0,
            axisTick: {},
            axisLabel: {},
            type: 'time',
            axisPointer: {
              animation: true,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                opacity: 0.2
              }
            }
          },

          series: [
            {
              type: 'themeRiver',
              emphasis: {
                itemStyle: {
                  shadowBlur: 20,
                  shadowColor: 'rgba(0, 0, 0, 0.8)'
                }
              },
              data: data.map(d=>[d.date,d.value,'Cluster'+d.label])
            }
          ]
        };

        chart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #timeline{
    position: absolute;
    left: 25%;
    /*top:65%;*/
    bottom: 0;
    width: 50%;
    height: 30%;
  }
</style>
