<template>
  <div id="container">
    <div id="tootip">
      <div id="tool_top">
        <ButtonGroup size="small">
          <Button icon="md-add"></Button>
          <Button icon="md-remove"></Button>
          <Button icon="md-refresh"></Button>
        </ButtonGroup>
      </div>
      <div id="tool_left"></div>
    </div>
    <div id="main_chart">
  </div>

  </div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  import geoJson from '../../../static/data.csv'
  import * as d3 from 'd3'
  export default {
    name: "AppMain",
    data(){
      return {
        chart:null,
        data:[],
        depts:[
          '第一食堂',
          '第二食堂',
          '第四食堂',
          '第三食堂',
          '第五食堂',
          '好利来食品店',
          '红太阳超市',
          '财务处'],
        coords: {
          '第一食堂':[120.4938882,31.9257250105],
          '第二食堂':[120.643338882,31.8987250105],
          '第四食堂':[120.583338882,31.817250105],
          '第三食堂':[120.743338882,31.877250105],
          '第五食堂':[120.623338882,31.977250105],
          '好利来食品店':[120.743338882,31.9487250105],
          '红太阳超市':[120.5738882,31.87087250105],
          '财务处':[120.5738882,31.93087250105]
        },
        names:{
          '第一食堂':'C1',
          '第二食堂':'C2',
          '第四食堂':'C4',
          '第三食堂':'C3',
          '第五食堂':'C5',
          '好利来食品店':'S2',
          '红太阳超市':'S1',
          '财务处':'FO'
        }
    }
    },
    mounted() {
      DataManager.get_f1_graph_data().then(res=>{
        this.data = res.data;
      });
      this.Init();
    },
    methods:{

      Init(){
        this.chart = this.$echarts.init(document.getElementById('main_chart'));
        this.$echarts.registerMap('ls', geoJson);

        let option = {
          title:{
            text:'TEXT',
            subtext:'TEXT',
            rotate:90,
            left:'20px',
            bottom:0,
            textStyle:{
              fontSize:16
            }
          },
          // tooltip: {
          //   trigger: 'item',
          //   // formatter : function(e) {
          //   //   if (typeof (e.value)[2] == "undefined") {
          //   //     return e.name+':'+e.value;
          //   //   } else {
          //   //     return  e.name + ':' + e.value[2];
          //   //   }
          //   // }
          // },
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
            symbolSize: 30,
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
            data: this.depts.map(d=>{
              return {
                name:this.names[d],
                value:this.coords[d]
              }
            }),
          }
          ]
        };
        this.chart.setOption(option);

      },
      Update(cluster){
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
        let data = this.data[parseInt(cluster[1])].data;
        let scale = d3.scaleLinear()
          .domain([0,.8])
          .range([30,100]);
        this.chart.setOption({
          series:[
            {
              name: '',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'circle',
              symbolSize: (value)=>scale(value[2]),
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
              data: data.nodes.map(d=>{
                return {
                  name:this.names[d.name],
                  value:this.coords[d.name].concat(d.value)
                }
              }),
            },
            {
              name: '',
              type: 'lines',
              coordinateSystem: 'geo',
              zlevel: 2,
              large: true,
              effect: {
                show: true,
                constantSpeed: 30,
                symbol: 'pin',
                symbolSize: 3,
                trailLength: 0,
              },
              data: data.links.map(d=>{
                return {
                  'fromName':this.names[d.source],
                  'toName':this.names[d.target],
                  'coords':[
                    this.coords[d.source],
                    this.coords[d.target]
                  ],
                  lineStyle: {
                    normal: {
                      color: color[parseInt(cluster[1])],
                      width: d.value*100,
                      opacity: 0.6,
                      curveness: 0.1
                    }
                  },
                }
              })
            },
            {
              name: 'Top 3',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: data.nodes.map(d=>{
                return {
                  name:this.names[d.name],
                  value:this.coords[d.name].concat(d.value)
                }
              }).sort((a,b)=>b.value[2]-a.value[2]).slice(0,3),
              symbolSize: function (val) {
                return scale(val[2]);
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(51,168,117,0.62)',
                  shadowBlur: 10,
                  shadowColor: 'rgba(51,168,117,0.62)'
                }
              },
              zlevel: 1
            }
          ]
        });
      }
    },
    computed:{
      current_cluster(){
        return this.$store.state.current_cluster;
      }
    },
    watch:{
      current_cluster:{
        handler(cluster){
          this.Update(cluster)
        }
      }
    }
  }
</script>

<style scoped>
  #container{
    position: absolute;
    left: 27%;
    top:0;
    width: 46%;
    height: 70%;
    /*background-color: #ffbc4c;*/
  }
  #main_chart{
    width: 100%;
    height: 100%;
    z-index:1;
  }

  #tootip{
    position: relative;
    z-index: 999;
  }

  #tool_top{
    position: absolute;
    right: 0;
    top:10px;
    width: 20%;
    height: 20px;
  }
</style>
