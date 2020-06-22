<template>
  <div id="pie_chart"></div>
</template>

<script>
    import DataManager from "../../data/DataManager";
    export default {
        name: "AppPie",
        mounted() {
            this.$axios.all([DataManager.get_f1_cluster_data(),DataManager.get_f1_scatter_data()]).then(this.$axios.spread((res1,res2)=>{
                this.Draw(res1.data,res2.data)
            }))
        },
        methods:{

            Draw(pie_data,scatter_data){
                let chart = this.$echarts.init(document.getElementById('pie_chart'));

                let angleText = (i, num) =>{
                    //每个元素的角度
                    let everyAngle = 360 / num;
                    //文字现在所在的角度
                    let currentAngle = i * everyAngle + everyAngle / 2;
                    //文字所在模块的所占角度
                    let currentArea = (i + 1) * everyAngle;

                    if (currentAngle <= 90) {
                        return -currentAngle;
                    } else if (currentAngle <= 180 && currentAngle > 90) {
                        return 180 - currentAngle;
                    } else if (currentAngle < 270 && currentAngle > 180) {
                        return 180 - currentAngle;
                    } else if (currentAngle < 360 && currentAngle >= 270) {
                        return 360 - currentAngle;
                    }
                }
                pie_data.forEach(d=>{
                    d.itemStyle = {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                    }
                })

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
                ]
                //console.log(source);
                let option = {
                    title:{
                        text:'Poverty Distribution',
                        subtext:'Notes: Poverty level is range from P0 to P9',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    backgroundColor: '#fff',
                    color:[
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
                    ],
                    legend:{
                        // show:false,
                        //默认横向布局，纵向布局值为'vertical' horizontal
                        right:'10%',
                        top:'5',
                        // bottom:'0',
                        // y:'20%',
                        // orient:'vertical',
                        icon:'rect',
                        itemWidth:10 ,
                        itemHeight:6,
                        itemGap:4,
                        textStyle:{
                            fontSize:9,
                            color:'rgba(204,204,204,0.98)'
                        },
                        data:pie_data.map(d=>d.name).sort((a,b)=>{a.localeCompare(b)})
                    },
                    xAxis: [{
                        gridIndex:0,
                        show:false,
                        type: 'value',
                        scale: true,
                        splitLine: {
                            show: true
                        }
                    },{
                        gridIndex:1,
                        show: false,
                    }],
                    yAxis: [{
                        gridIndex:0,
                        show:false,
                        type: 'value',
                        scale: true,
                        splitLine: {
                            show: true
                        }
                    },{
                        gridIndex:1,
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
                    grid: [{
                        width:'40%',
                        height:'45%',
                        x: '38%',
                        y:'37%',
                        containLabel: true
                    },{
                        width:'20%',
                        height:'70%',
                        left:8,
                        y:'20%',
                        containLabel: true
                    }]  ,
                    series: [
                        {
                            name:'',
                            type: 'pie',
                            y:'8%',
                            roseType: 'radius',
                            center: ['60%', '50%'],
                            radius: ['60%', '80%'],
                            //avoidLabelOverlap: false,
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0)'
                                    },
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            data:pie_data
                        },
                        {
                            name:'out_label',
                            type: 'pie',
                            y:'8%',
                            roseType: 'radius',
                            center: ['60%', '50%'],
                            radius: ['65%', '91%'],
                            //avoidLabelOverlap: false,
                            hoverAnimation: false,
                            itemStyle: {
                                // color: 'transparent'
                                opacity:.2
                            },
                            label: {
                                normal: {
                                    // show: false,
                                    position: "inside",
                                    // padding:10,
                                    color:'#565656',
                                    alignTo: "edge",
                                    // formatter: '{b}--{d}%',
                                    formatter: '{b}',
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {

                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            data:pie_data
                        },
                        {
                            type: 'bar',
                            itemGap: '30',
                            barWidth: '5',
                            z: 2,
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            itemStyle: {
                                //通常情况下：
                                normal: {
                                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组中的颜色
                                    color: function (params) {
                                        return color[params.dataIndex];
                                    },
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
                            data:pie_data
                        }
                    ].concat(scatter_data.map((d,i)=>{
                        return {
                            name: d.name,
                            type: 'scatter',
                            data: d.data,
                            symbolSize:2,
                            itemStyle: {
                                normal:{
                                    color:color[i]
                                }
                            }
                        }
                    }))
                };
                chart.setOption(option);
                chart.on('click',params=> {
                    if (params.componentSubType === 'pie') {
                        // console.log(params.data.name)
                        this.$store.commit('current_cluster',params.data.name);
                    }
                })
            }
        }
    }
</script>

<style scoped>
  #pie_chart{
    position: absolute;
    left: 0;
    top:0;
    width: 27%;
    height: 40%;
    /*background-color: rgba(148, 137, 142, 0.62);*/
  }
</style>
