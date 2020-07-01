<template>
  <div id="extra_msg">
    <div class="extra" id="extra01"></div>
    <div class="extra" id="extra02"></div>
  </div>
</template>

<script>
    import DataManager from "../../data/DataManager";
    export default {
        name: "AppExtraMSG",
        mounted() {
            DataManager.get_f1_graph_data().then(res=>{
                console.log(res.data);
                this.Extra_Apriori(res.data[0].data)
            })
        },
        methods:{
            Extra_Apriori(graph){
                let chart = this.$echarts.init(document.getElementById('extra01'))

                graph.nodes.forEach(function (node) {
                    node.itemStyle = null;
                    node.symbolSize = parseFloat(node.value) *70;
                    node.category = node.name;
                });

                graph.links.forEach(d=>{
                    d.lineStyle = {
                        width:parseFloat(d.value)*70,
                    }
                })

                let option = {
                    title: {
                        text: 'FREQUENT ITEMSET',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    color:[
                        "#d0648a",
                        "#d07999",
                        "#f58db2",
                        "#f2b3c9",
                        "#b8f29c",
                        "#7bd9a5",
                        "#22c3aa",
                        "#4ea397"
                    ],
                    tooltip: {},
                    legend: {
                        top:'10%',
                        left:'5',
                        icon:'circle',
                        itemWidth:10 ,
                        itemHeight:7,
                        itemGap:4,
                        textStyle:{
                            fontSize:10,
                            color:'rgba(120,120,120,0.98)'
                        },
                        data: graph.nodes.map(function (a) {
                            return a.name;
                        })
                    },
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            name: 'Les Miserables',
                            type: 'graph',
                            top:'25%',
                            bottom:'10%',
                            layout: 'circular',
                            circular: {
                                rotateLabel: true
                            },
                            data: graph.nodes,
                            links: graph.links,
                            categories:graph.nodes.map(d=>{
                                return {
                                    name:d.name
                                }
                            }),
                            roam: true,
                            label: {
                                position: 'right',
                                formatter: '{b}'
                            },
                            lineStyle:{
                                color: 'source',
                                curveness: 0.3
                            }
                        }
                    ]
                };

                chart.setOption(option)

            }
        }
    }
</script>

<style scoped>
  #extra_msg {
    position: absolute;
    left: 0;
    top:40%;
    width: 27%;
    height: 30%;
    /*background-color: #ccc;*/
  }
  .extra{
    float: left;
    position: relative;
    width: 50%;
    height: 100%;
    /*background-color: orangered;*/
  }
</style>
