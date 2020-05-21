<template>
  <div id="main">
    <div id="main_01"></div>
    <!--    <div id="info">-->
    <!--      <Timeline v-model="info">-->
    <!--        <TimelineItem color="red">-->
    <!--          <p class="time">专业</p>-->
    <!--          <p class="content">{{info.major}}</p>-->
    <!--        </TimelineItem>-->
    <!--        <TimelineItem color="green">-->
    <!--          <p class="time">专业人数</p>-->
    <!--          <p class="content">{{info.number}}</p>-->
    <!--        </TimelineItem>-->
    <!--        <TimelineItem color="blue">-->
    <!--          <p class="time">主要消费地点</p>-->
    <!--          <p class="content" v-for=" i in info.dept">{{i}}</p>-->
    <!--        </TimelineItem>-->
    <!--      </Timeline>-->
    <!--    </div>-->
  </div>

</template>

<script>
  import DataManager from "../../data/DataManager";
  import geoJson from '../../../static/map.js'
  import * as d3 from 'd3'
  export default {
    name: "AppMain",
    data(){
      return {
        major_list:['18国际金融'],
        info:{
          major:'18国际金融',
          number:97,
          dept:['二食堂', '三食堂', '五食堂']
        }
      }
    },
    mounted() {
      DataManager.get_f1_main_data().then(res=>{
        this.Draw(res.data);
      })
    },
    methods:{

      Draw(dept_data){

        let chart = this.$echarts.init(document.getElementById('main_01'));

        this.$echarts.registerMap('ls', geoJson);

        let coords = {
        '第一食堂':[120.4938882,31.9487250105],
        '第二食堂':[120.643338882,31.8987250105],
        '第四食堂':[120.583338882,31.817250105],
        '第三食堂':[120.743338882,31.877250105],
        '第五食堂':[120.623338882,31.977250105],
        '好利来食品店':[120.743338882,31.9487250105],
        '红太阳超市':[120.5738882,31.87087250105]
        };



        let res = dept_data.map(d=>{
          return {
            name:d.name,
            value:coords[d.name].concat(d3.sum(d.data,s=>parseInt(s.value)))
          }
        })

        let scale = d3.scaleLinear()
          .domain(d3.extent(res,d=>d.value[2]))
          .range([30,80]);


        let option = {
          color:[
            "#4ea397",
            "#22c3aa",
            "#7bd9a5",
            "#d0648a",
            "#f58db2",
            "#f2b3c9"
          ],
          tooltip: {
            trigger: 'item',
              // formatter : function(e) {
              //   if (typeof (e.value)[2] == "undefined") {
              //     return e.name+':'+e.value;
              //   } else {
              //     return  e.name + ':' + e.value[2];
              //   }
              // }
          },
          // legend: {
          //   orient: 'vertical',
          //   show: true,
          //   y: 'center',
          //   right:0,
          //   itemWidth: 3,
          //   itemHeight: 3,
          //   itemGap: 5,
          //   textStyle: {
          //     color: '#7a8c9f',
          //     fontSize: 8,
          //     lineHeight: 20,
          //     rich: {
          //       percent: {
          //         color: '#fff',
          //         fontSize: 8,
          //       },
          //     },
          //   },
          //   data:data.map(d=>d.name)
          // },
          geo: {
            map: 'ls',
            show: true,
            roam: true,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                areaColor: 'rgba(29,24,26,0.2)',
              },
              normal: {
                areaColor: 'rgba(29,24,26,0.2)',
                borderColor: 'rgb(255,255,255)',
                //shadowColor: '#031525',
                //shadowBlur: 5
              }
            },
            zoom:1.2,
          },
          series: [{
            name: '',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            symbolSize: function (val) {
              return scale(val[2]);
            },
            label: {
              normal: {
                show: true,
                formatter: function(value){
                  return value.data.name
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 12,
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#33A875', //标志颜色
              }
            },
            zlevel: 6,
            data: res,
          }]
        };
        chart.setOption(option);

        chart.setOption({series: chart.getOption().series.concat(dept_data.map((d,i)=>{
            return {
              name: '',
              type: 'pie',
              roseType: 'radius',
              radius: [scale(d3.sum(d.data,s=>parseInt(s.value)))/2,scale(d3.sum(d.data,s=>parseInt(s.value)))/2+15],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              center:chart.convertToPixel('geo', coords[d.name]),
              emphasis: {
                label: {
                  show: false,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: d.data
            }
          }))})
      }
    }
  }
</script>

<style scoped>
  #main{
    position: absolute;
    top:0;
    left: 25%;
    width: 50%;
    height: 70%;
  }
  #main_01{
    position: relative;
    width: 100%;
    height: 100%;
  }
  #info{
    position: absolute;
    left: 0;
    top:6%;
    width: 19%;
    height: auto;
    z-index: 10;
  }
  .time{
    font-size: 14px;
    text-align: left;
  }
  .content{
    font-size: 12px;
    text-align: left;
  }
</style>
