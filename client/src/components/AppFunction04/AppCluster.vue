<template>
  <div id="cluster"></div>
</template>

<script>
  export default {
    name: "AppCluster",
    methods:{
      Draw(){
        let chart = this.$echarts.init(document.getElementById('level_main'));

        let source =[['name','value']];
        data.forEach((d,i)=>{
          source[i+1] = [d.name,d.value];
        });
        //console.log(source);
        let option = {
          title:{
            top:'5%',
            text:`消费等级分布`,
            subtext:`${major.replace('18','')}专业`
          },
          dataset: {
            source: source
          },
          color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9', '#60a900', '#01949b', '#f17677'],
          grid: {
            left: '0',
            top: '60%',
            right: '15%',
            containLabel: true
          },
          xAxis: [{
            show: false,
          },
            {
              show: false,
            }
          ],
          yAxis: {
            type: 'category',
            inverse: true,
            axisTick:{
              show:false//不显示坐标轴刻度线
            },
            axisLine: {
              show: false,//不显示坐标轴线
            }
            // show: false
          },
          series: [{
            tooltip: {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            type: 'pie',
            center: ['50%', '35%'],
            radius: ['43%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{b}\n{d}%'
              },

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
              show: true,
              type: 'bar',
              barGap: '10%',
              barWidth: '10%',
              z: 2,
              color: function(params) {
                // build a color map as your need.
                var colorList = [
                  '#d74e67', '#0092ff', '#eba954', '#21b6b9', '#60a900', '#01949b', ' #f17677'
                ];
                return colorList[params.dataIndex]
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'rgba(29,24,26,0.74)',
                    fontSize: 20,
                    //fontWeight: 'bold'
                  },
                  position: 'right'
                }
              },
              encode: {
                x: 'value'
              }
            },
            //年份
            {
              show: false,
              type: 'bar',
              xAxisIndex: 1, //代表使用第二个X轴刻度
              barGap: '10%',
              barWidth: '10%',
              itemStyle: {
                normal: {
                  barBorderRadius: 200,
                  color: 'transparent'
                }
              },
              label: {
                normal: {
                  show: false,
                  position: [0, '-20'],
                  formatter: '{b}',
                  textStyle: {
                    fontSize: 14,
                    color: '#333',
                  }
                }
              },
              encode: {
                y: 'name'
              }
            }
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
    width: 20%;
    height: 50%;
    background-color: #ccc;
  }
</style>
