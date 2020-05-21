<template>
  <div id="cluster"></div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  export default {
    name: "AppCluster",
    mounted() {
      DataManager.get_f1_cluster_data().then(pie_data=>{
        this.Draw(pie_data.data)
      })
    },
    methods:{

      Draw(pie_data){
        let chart = this.$echarts.init(document.getElementById('cluster'));

        let source =[['name','value']];
        pie_data.forEach((d,i)=>{
          source[i+1] = [d.name,d.value];
        });
        //console.log(source);
        let option = {
          dataset: {
            source: source
          },
          color:[
            "#4ea397",
            "#22c3aa",
            "#7bd9a5",
            "#d0648a",
            "#f58db2",
            "#f2b3c9"
          ],
          legend:{
            //默认横向布局，纵向布局值为'vertical' horizontal
            left:10,
            bottom:'4%',
            orient:'vertical',
            itemWidth:8,
            itemHeight:8,
            itemGap:5,
            textStyle:{
              fontSize:10
            }
          },
          tooltip: {
            overflow: 'hidden'
          },
          grid: {
            left: '20',
            top: '62%',
            bottom:0,
            right: '15%',
            containLabel: true
          },
          xAxis: [{
            show: false,
          }],
          yAxis:[{
            type: 'category',
            inverse: true,
            axisTick:{
              show:false//不显示坐标轴刻度线
            },
            axisLine: {
              show: false,//不显示坐标轴线
            },
            show: false
          }],
          series: [
            {
              type: 'pie',
              tooltip: {
                show:false
              },
              center: ['50%', '30%'],
              radius: ['37%', '42%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show:false,
                  position: "outer",
                  alignTo: "edge",
                  margin: 10,
                  formatter: '{b}\n{d}%'
                }
              },
              itemStyle: {
                normal: {
                  opacity:.3
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              encode: {
                itemName: 'name',
                value: 'value'
              }
            },
            {
              tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}%)",
                overflow: 'hidden'
              },
              type: 'pie',
              roseType: 'radius',
              center: ['50%', '30%'],
              radius: ['40%', '55%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  position: "outer",
                  alignTo: "edge",
                  margin: 10,
                  formatter: '{b}\n{d}%'
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              encode: {
                itemName: 'name',
                value: 'value'
              }
            },
            //亮色条 百分比
            {
              type: 'bar',
              itemGap: '30',
              barWidth: '5',
              z: 2,
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组中的颜色
                  color: function (params) {
                    let colorList = [
                      "#4ea397",
                      "#22c3aa",
                      "#7bd9a5",
                      "#d0648a",
                      "#f58db2",
                      "#f2b3c9"
                    ];
                    return colorList[params.dataIndex%6];
                  },
                  // color: '#a453f7',  //设置所有柱状图颜色
                }
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'rgba(29,24,26,0.74)',
                    fontSize: 12,
                    //fontWeight: 'bold'
                  },
                  position: 'right'
                }
              },
              encode: {
                x: 'value'
              }
            },
          ]
        };
        chart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #cluster{
    position: absolute;
    left: 0;
    top:0;
    width: 25%;
    height: 70%;
  }
</style>
