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
                    "#f2c287",
                    "#b8f29c",
                    "#7bd9a5",
                    "#22c3aa",
                    "#4ea397"
                ]

                let option = {
                    title:{
                        text:'CONSUMPTION CLUSTER',
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
                        "#f2c287",
                        "#b8f29c",
                        "#7bd9a5",
                        "#22c3aa",
                        "#4ea397"
                    ],
                    legend:{
                        // show:false,
                        //默认横向布局，纵向布局值为'vertical' horizontal
                        left:'3',
                        top:'7%',
                        // bottom:'0',
                        // y:'20%',
                        // orient:'vertical',
                        icon:'rect',
                        itemWidth:15 ,
                        itemHeight:8,
                        itemGap:13,
                        textStyle:{
                            fontSize:10,
                            color:'rgba(120,120,120,0.98)'
                        },
                        // data:pie_data.map(d=>d.name).sort((a,b)=>{a.localeCompare(b)})
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
                        x: '40%',
                        y:'35%',
                        containLabel: true
                    },{
                        width:'30%',
                        height:'70%',
                        left:8,
                        y:'20%',
                        containLabel: true
                    }],
                    series: [{
                            name:'',
                            type: 'pie',
                            y:'8%',
                            roseType: 'radius',
                            center: ['60%', '50%'],
                            radius: ['60%', '80%'],
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
                        }, {
                            name:'out_label',
                            type: 'pie',
                            y:'8%',
                            roseType: 'radius',
                            center: ['60%', '50%'],
                            radius: ['65%', '90%'],
                            hoverAnimation: false,
                            itemStyle: {
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
                        }, {
                            type: 'bar',
                            itemGap: '30',
                            barWidth: '5',
                            z: 2,
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        return color[params.dataIndex];
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: 'rgba(29,24,26,0.74)',
                                        fontSize: 12
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
