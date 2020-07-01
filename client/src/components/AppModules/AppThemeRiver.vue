<template>
  <div id="theme_river"></div>
</template>

<script>
    import DataManager from "../../data/DataManager";
    export default {
        name: "AppThemeRiver",
        mounted() {
            DataManager.get_f1_timeline_data().then(res=>{
                this.Draw(res.data)
            })
        },
        methods:{
            Draw(data){
                let chart = this.$echarts.init(document.getElementById('theme_river'));

                let option = {
                    title:{
                        text:'DAILY AVG COST',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    legend: {
                        left: 5,
                        top:'22%',
                        icon:'rect',
                        itemWidth:10,
                        itemHeight:6,
                        itemGap:7,
                        orient:'vertical',
                        align:'right',
                        textStyle: {
                            fontSize:10,
                            color:'rgba(120,120,120,0.98)'
                        },
                        data:['P0','P1','P2','P3','P4','P5','P6','P7','P8','P9']
                    },
                    tooltip:{
                        trigger: 'axis',
                        // formatter:function (params) {
                        //   console.log(params[0].data[2])
                        //   return params.map(d=>{
                        //
                        //   })[0].data[2]
                        // },
                        // position: 'right',
                        position: ['80%', '15%'],
                        textStyle: {
                            fontSize:9,
                            color:'rgba(204,204,204,0.98)'
                        },
                        axisPointer: {
                            type: 'line',
                            lineStyle: {
                                color: 'rgba(0,0,0,0.2)',
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    color:[

                        "#d07999",
                        "#f58db2",
                        "#f2b3c9",
                        "#f2c4bc",
                        "#dcf296",
                        "#b8f29c",
                        "#7bd9a5",
                        "#22c3aa",
                        "#4ea397",
                        "#d0648a",
                    ],
                    singleAxis: {
                        bottom: '15%',
                        top:'15%',
                        right:'10%',
                        left:'10%',
                        axisLine: {
                            lineStyle: {
                                color: '#aaa'
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            formatter:(params)=>{
                                return `0${new Date(params).getMonth()+1}-${new Date(params).getDate()}`
                            },
                            textStyle: {
                                fontSize: 10,
                                color: '#565656'
                            }
                        },
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
                            label: {
                                show: false
                            },
                            itemStyle:{
                                opacity: .8
                            },
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 20,
                                    shadowColor: 'rgba(0, 0, 0, 0.8)',
                                }
                            },
                            data: data.map(d=>[d.date,d.value,'P'+parseInt(d.label)])
                        }
                    ]
                };

                chart.setOption(option);
            }
        }
    }
</script>

<style scoped>
  #theme_river{
    position: absolute;
    left: 0;
    top:40%;
    width: 27%;
    height: 30%;
  }
</style>
