<template>
  <div id="control_panel">
    <div class="control">
      &nbsp;Co-occurrence Frequency
      <Slider v-model="cf_value" :max='cf_max' :min='cf_min' @on-change="test" range></Slider>
    </div>
    <div class="control">
      &nbsp;Degree Filter
      <Slider v-model="cs_value" :max='cs_max' :min='cs_min' range @on-change="cs_change"></Slider>
    </div>
    <div class="control" id="cf_chart" style="top:1%"></div>
    <div class="control" id="df_chart" style="top:1%"></div>
    <div class="control"></div>
<!--    <div class="control">-->
<!--      &nbsp;Degree Centrality-->
<!--      <Slider v-model="value3" range></Slider>-->
<!--    </div>-->
<!--    <div class="control">-->
<!--      &nbsp;Betweenness Centrality-->
<!--      <Slider v-model="value4" range></Slider>-->
<!--    </div>-->
<!--    <div class="control">-->
<!--      Orderliness-->
<!--      <Tag color="#fff"></Tag>-->
<!--      <Tag color="#d0619b"></Tag>-->
<!--      <Tag color="rgba(208,97,155,0.88)"></Tag>-->
<!--      <Tag color="rgba(208,97,155,0.76)"></Tag>-->
<!--      <Tag color="rgba(208,97,155,0.61)"></Tag>-->
<!--      <Tag color="rgba(208,97,155,0.38)"></Tag>-->
<!--    </div>-->
<!--    <div class="control">-->
<!--      Diligence-->
<!--      <Tag color="#fff"></Tag>-->
<!--      <Tag color="#4ea397"></Tag>-->
<!--      <Tag color="rgba(78,163,151,0.91)"></Tag>-->
<!--      <Tag color="rgba(78,163,151,0.75)"></Tag>-->
<!--      <Tag color="rgba(78,163,151,0.53)"></Tag>-->
<!--      <Tag color="rgba(78,163,151,0.26)"></Tag>-->
<!--    </div>-->
    <div id="c_tool_title"></div>
  </div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: "AppControl",
        data(){
            return {
                cf_min:2,
                cf_max:18,
                cf_value:[10,18],

                cs_min:2,
                cs_max:13,
                cs_value:[2,13],

                all_value:{
                    cf_value:[],
                    cs_value:[]
                }

            }
        },
        mounted() {
            this.Init_Title()
            this.Init('cf_chart')
            this.Init('df_chart')
        },
        methods:{
            Init_Title() {

                let chart = this.$echarts.init(document.getElementById('c_tool_title'))

                let option = {
                    title: {
                        text: 'FRIENDSHIP NETWORK',
                        textStyle: {
                            fontSize: 16
                        }
                    },
                }

                chart.setOption(option)
            },

            Init(dom_id){
                let chart = this.$echarts.init(document.getElementById(dom_id))
                let echarts = this.$echarts
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid:{
                        top:'5%',
                        bottom:'20%'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,//坐标轴两边留白
                        data: ['12201', '12202', '12203','12204','12301','12302','12303','12304','12401', '12402', '12403','12404'],
                        axisTick:{//坐标轴刻度相关设置。
                            show: false,
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#a8aab0',
                                fontSize: 8,
                            }
                        },
                        axisLine:{//坐标轴轴线相关设置
                            lineStyle:{
                                color:'#E5E9ED',
                                // opacity:0.2
                            }
                        },
                        splitLine: { //坐标轴在 grid 区域中的分隔线。
                            show: true,
                            lineStyle: {
                                color: '#E5E9ED',
                                // 	opacity:0.1
                            }
                        }
                    },
                    yAxis: [
                        {
                            type: 'value',
                            splitNumber: 5,
                            axisLabel: {
                                show:false,
                                textStyle: {
                                    color: '#a8aab0',
                                    fontStyle: 'normal',
                                    fontFamily: '微软雅黑',
                                    fontSize: 12,
                                }
                            },
                            axisLine:{
                                show: false
                            },
                            axisTick:{
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#E5E9ED',
                                    // 	opacity:0.1
                                }
                            }

                        }
                    ],
                    series: [
                        {
                            name: '2019',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color:'rgba(255,80,124,1)',
                                    lineStyle: {
                                        color: "rgba(255,80,124,1)",
                                        width:1
                                    },
                                    areaStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: 'rgba(255,80,124,0)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(255,80,124,0.35)'
                                        }]),
                                    }
                                }
                            },
                            data: [9, 5,7,8,6,7,8,7,7,6,8,6]
                        }
                    ]
                };
                chart.setOption(option)
            },
            /*Init(){
                let width = document.getElementById('control_panel').offsetWidth;
                let height = document.getElementById('control_panel').offsetHeight;

                let margin = {top: 10, right: 20, bottom: 10, left:20};
                width = width - margin.left - margin.right;
                height = height - margin.top - margin.bottom;

                let svg = d3.select('#test03')
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    // .attr("viewBox", [-width / 2, -height / 2, width, height])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round");

                let x = d3.scaleBand()
                    .range([0, width])
                    .domain(new Array(30).fill(0).map((d, i) => i + 1))
                // .padding(0.01);

                svg.append("g")
                    .attr("transform", "translate("+margin.left+"," + height + ")")
                    .call(d3.axisBottom(x));

                svg.append('g')
                    .attr("transform", "translate("+margin.left+"," + height + ")")
                    .selectAll('.point')
                    .data([1,3,7])
                    .enter()
                    .append('circle')
                    .attr('r',2)
                    .attr('cx',d=>x(d)+7)
                    .attr('cy',5)
            },*/
            test(value){
                this.all_value.cf_value = value
                this.$store.commit('all_value',this.all_value);
            },
            cs_change(value){
                this.all_value.cs_value = value
                this.$store.commit('all_value',this.all_value);
            }
        }
    }
</script>

<style scoped>
  #control_panel{
    position: absolute;
    right: 0;
    top:0;
    width: 27%;
    height: 15%;
    /*background-color: #3eff3e;*/
  }
  #control_panel .control{
    position: relative;
    top:20%;
    margin:0 auto;
    /*margin-bottom: 1%;*/
    /*margin-top: 1%;*/
    float: left;
    width:50%;
    height: 50%;
    /*background-color: darkred;*/
  }

  #c_tool_title{
    position: absolute;
    width: 100%;
    height: 20%;
    /*background-color: royalblue;*/
  }
</style>
