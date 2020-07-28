<template>
  <div id="control_panel">
    <div id="network_info">
      <Card  :padding="0"  style="width: 250px">
        <CellGroup>
          <Cell title="Department" extra="A1" >
            <Icon type="ios-school"></Icon>
            <span>Department</span>
          </Cell>
          <Cell title="Number of Nodes" extra="378">
            <Icon type="ios-ionic" />
            <span>Number of Nodes</span>
          </Cell>
          <Cell title="Number of Links" extra="3251" >
            <Icon type="ios-git-merge" />
            <span>Number of Links</span>
          </Cell>
        </CellGroup>
      </Card>
    </div>
    <div class="control">
      <Icon type="ios-analytics-outline" size="18"/>
      <span>Co-occurrence Frequency</span>
      <Slider v-model="cf_value" :max='cf_max' :min='cf_min' @on-change="cf_change" range></Slider>
    </div>
    <div class="control">
      <Icon type="ios-analytics-outline" size="18" />
      <span>Academic Performance</span>
      <Slider id="df-slider" v-model="df_value" range @on-change="df_change"></Slider>
    </div>
<!--    <div class="control" id="cf_chart" style="top:1%"></div>-->
<!--    <div class="control" id="df_chart" style="top:1%"></div>-->
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
    import DataManager from "../../data/DataManager";
    export default {
        name: "AppControl",
        data(){
            return {
                cf_min:3,
                cf_max:115,
                cf_value:[5,115],

                df_min:0,
                df_max:100,
                df_value:[0,100]
            }
        },
        mounted() {
            this.Init_Title()
            // this.Init('df_chart')
            // DataManager.get_dept07_graph([1,115]).then(res=>{
            //     let cf_data = d3.nest().key(d=>d.value).entries(res.data.links).map(d=>{
            //         return {
            //             name:parseInt(d.key),
            //             value:d.values.length
            //         }
            //     }).sort((a,b)=>a.name - b.name)
            //     let data1 = [...Array(d3.max(cf_data,d=>d.name))].map((d,i)=>{
            //         if(cf_data.findIndex(s=>s.name === i+1) !== -1)
            //             return cf_data[cf_data.findIndex(s=>s.name === i+1)].value
            //         else
            //             return 0
            //     })
            //
            //     let df_data = d3.nest().key(d=>d.degree).entries(res.data.nodes).map(d=>{
            //         return {
            //             name:parseInt(d.key),
            //             value:d.values.length
            //         }
            //     }).sort((a,b)=>a.name - b.name)
            //
            //     let data2 = [...Array(d3.max(df_data,d=>d.name))].map((d,i)=>{
            //         if(df_data.findIndex(s=>s.name === i+1) !== -1)
            //             return df_data[df_data.findIndex(s=>s.name === i+1)].value
            //         else
            //             return 0
            //     })
            //
            //
            //     this.Init('cf_chart',data1)
            //     this.Init('df_chart',data2)
            //     // console.log(data2);
            //
            // })
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

            Init(dom_id,data){
                let chart = this.$echarts.init(document.getElementById(dom_id))
                let echarts = this.$echarts
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter:'{b}: {c}'
                    },
                    grid:{
                        top:'5%',
                        bottom:'20%'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,//坐标轴两边留白
                        data: [...Array(data.length)].map((d,i)=>i+1),
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
                    dataZoom: [
                        {
                            show: false,
                            realtime: true,
                            start: 1,
                            end: 40
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 1,
                            end: 40
                        }
                    ],
                    series: [
                        {
                            name: 'cf',
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
                            data: data
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
            cf_change(value){
                this.cf_value = value
                this.$store.commit('cf_value',this.cf_value);
            },
            df_change(value){
                this.df_value = value
                this.$store.commit('df_value',[value[0]/100,value[1]/100]);
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
    /*padding-left: 10%;*/
    /*margin:0 auto;*/
    margin-right: 3%;
    /*margin-bottom: 20%;*/
    float: right;
    width:50%;
    height: 35%;
    /*background-color: darkred;*/
  }

  #network_info{
    position: absolute;
    background: transparent;
    top: 20%;
    width: 43%;
    height: 80%;
    z-index: 20;
  }

  #c_tool_title{
    position: absolute;
    width: 100%;
    height: 20%;
    /*background-color: royalblue;*/
  }
</style>
