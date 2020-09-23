<template>
  <div id="control_panel">
    <div id="network_info">
      <Card  style="width: 250px">
        <CellGroup>
          <Cell title="Department" extra="A1" >
            <Icon type="ios-school"></Icon>
            <span>Department</span>
          </Cell>
          <Cell title="Number of Nodes" extra="239">
            <Icon type="ios-ionic" />
            <span>Number of Nodes</span>
          </Cell>
          <Cell title="Number of Links" extra="219" >
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
    <div id="cf_chart">
<!--      <Icon type="ios-analytics-outline" size="18" />-->
<!--      <span>Academic Performance</span>-->
<!--      <Slider id="df-slider" v-model="df_value" range @on-change="df_change"></Slider>-->
    </div>
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
            DataManager.get_dept07_graph([1,115]).then(res=>{
                // d3.selectAll('.ivu-cell-extra').data(['A1',res.data.nodes.length,res.data.links.length]).html(d=>d)

                let cf_data = d3.nest().key(d=>d.value).entries(res.data.links).map(d=>{
                    return {
                        name:parseInt(d.key),
                        value:d.values.length
                    }
                }).sort((a,b)=>a.name - b.name)
                // console.log(cf_data);
                let data1 = [...Array(d3.max(cf_data,d=>d.name))].map((d,i)=>{
                    if(cf_data.findIndex(s=>s.name === i+1) !== -1)
                        return cf_data[cf_data.findIndex(s=>s.name === i+1)].value
                    else
                        return 0
                })

                // console.log(data1);

                this.Init('cf_chart',data1)

            })
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
                        top:'3%',
                        bottom:'27%'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,//坐标轴两边留白
                        data: [...Array(115)].map((d,i)=>i+1),
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
    /*background-color: #3e ff3e;*/
  }
  #control_panel .control{
    position: relative;
    top:23%;
    /*padding-left: 10%;*/
    /*margin:0 auto;*/
    margin-right: 3%;
    /*margin-bottom: 20%;*/
    float: right;
    width:50%;
    height: 35%;
    /*background-color: darkred;*/
  }

  #cf_chart{
    position: absolute;
    top:53%;
    /*padding-left: 10%;*/
    /*margin:0 auto;*/
    margin-right: 3%;
    /*margin-bottom: 20%;*/
    float: right;
    width:50%;
    left: 45%;
    height: 35%;
  }

  #network_info{
    position: absolute;
    background: transparent;
    top: 18%;
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
