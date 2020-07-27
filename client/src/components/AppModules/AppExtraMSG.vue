<template>
  <div id="extra_msg">
    <!-- <div class="extra" id="extra01"></div>
    <div class="extra" id="extra02"></div>-->
  </div>
</template>

<script>
import DataManager from "../../data/DataManager";
import * as d3 from "d3";
export default {
  name: "AppExtraMSG",
  mounted() {
    this.Test()
    // DataManager.get_meal_prefer("cluster0").then(res => {
    //   this.Meal_info(res.data);
    // });
    // this.$axios.all([DataManager.get_f1_graph_data('cluster8'),DataManager.get_f1_mealRate_data('cluster8')]).then(this.$axios.spread((res1,res2)=>{
    //     this.Extra_Apriori('P0',res1.data)
    //     this.Extra_MealRate(res2.data)
    // }))
  },
  methods: {
          Test(){
                let chart = this.$echarts.init(document.getElementById('extra_msg'))

                let color = d3.scaleOrdinal()
                    .domain(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'])
                    .range([
                        "#d0648a",
                        "#d07999",
                        "#f58db2",
                        "#f2b3c9",
                        "#f2c4bc",
                        "#f2c287",
                        "#b8f29c",
                        "#7bd9a5",
                        "#22c3aa",
                        "#4ea397"])

                let test = {
                    nodes:[
                        {name:'P1',itemStyle:{color:'#f77d8c',}},{name:'P2',itemStyle:{color:'#f77d8c',}},
                        {name:'P3',itemStyle:{color:'#f77d8c',}},{name:'P4',itemStyle:{color:'#f77d8c',}},
                        {name:'P5',itemStyle:{color:'#f77d8c',}}, {name:'P6',itemStyle:{color:'#f77d8c',}},
                        {name:'P7',itemStyle:{color:'#f77d8c',}}, {name:'P8',itemStyle:{color:'#f77d8c',}},
                        {name:'P9',itemStyle:{color:'#f77d8c',}}, {name:'P0',itemStyle:{color:'#f77d8c',}},
                        {name:'A1',itemStyle:{color:color('A1')}},{name:'A2',itemStyle:{color:color('A2')}},{name:'A3',itemStyle:{color:color('A3')}},{name:'A4',itemStyle:{color:color('A4')}},
                        {name:'A5',itemStyle:{color:color('A5')}},{name:'A6',itemStyle:{color:color('A6')}},{name:'A7',itemStyle:{color:color('A7')}},{name:'A8',itemStyle:{color:color('A8')}}],
                    links:[{'source': 'A1', 'target': 'P0', 'value': 82}, {'source': 'A1', 'target': 'P1', 'value': 40}, {'source': 'A1', 'target': 'P2', 'value': 67}, {'source': 'A1', 'target': 'P3', 'value': 51}, {'source': 'A1', 'target': 'P4', 'value': 36}, {'source': 'A1', 'target': 'P5', 'value': 30}, {'source': 'A1', 'target': 'P6', 'value': 41}, {'source': 'A1', 'target': 'P7', 'value': 22}, {'source': 'A1', 'target': 'P8', 'value': 26}, {'source': 'A1', 'target': 'P9', 'value': 59}, {'source': 'A2', 'target': 'P0', 'value': 158}, {'source': 'A2', 'target': 'P1', 'value': 78}, {'source': 'A2', 'target': 'P2', 'value': 113}, {'source': 'A2', 'target': 'P3', 'value': 105}, {'source': 'A2', 'target': 'P4', 'value': 77}, {'source': 'A2', 'target': 'P5', 'value': 43}, {'source': 'A2', 'target': 'P6', 'value': 44}, {'source': 'A2', 'target': 'P7', 'value': 32}, {'source': 'A2', 'target': 'P8', 'value': 26}, {'source': 'A2', 'target': 'P9', 'value': 93}, {'source': 'A3', 'target': 'P0', 'value': 32}, {'source': 'A3', 'target': 'P1', 'value': 11}, {'source': 'A3', 'target': 'P2', 'value': 13}, {'source': 'A3', 'target': 'P3', 'value': 19}, {'source': 'A3', 'target': 'P4', 'value': 13}, {'source': 'A3', 'target': 'P5', 'value': 6}, {'source': 'A3', 'target': 'P6', 'value': 13}, {'source': 'A3', 'target': 'P7', 'value': 8}, {'source': 'A3', 'target': 'P8', 'value': 9}, {'source': 'A3', 'target': 'P9', 'value': 25}, {'source': 'A4', 'target': 'P0', 'value': 52}, {'source': 'A4', 'target': 'P1', 'value': 31}, {'source': 'A4', 'target': 'P2', 'value': 32}, {'source': 'A4', 'target': 'P3', 'value': 40}, {'source': 'A4', 'target': 'P4', 'value': 43}, {'source': 'A4', 'target': 'P5', 'value': 40}, {'source': 'A4', 'target': 'P6', 'value': 24}, {'source': 'A4', 'target': 'P7', 'value': 21}, {'source': 'A4', 'target': 'P8', 'value': 42}, {'source': 'A4', 'target': 'P9', 'value': 53}, {'source': 'A5', 'target': 'P0', 'value': 68}, {'source': 'A5', 'target': 'P1', 'value': 15}, {'source': 'A5', 'target': 'P2', 'value': 43}, {'source': 'A5', 'target': 'P3', 'value': 56}, {'source': 'A5', 'target': 'P4', 'value': 29}, {'source': 'A5', 'target': 'P5', 'value': 62}, {'source': 'A5', 'target': 'P6', 'value': 49}, {'source': 'A5', 'target': 'P7', 'value': 15}, {'source': 'A5', 'target': 'P8', 'value': 40}, {'source': 'A5', 'target': 'P9', 'value': 76}, {'source': 'A6', 'target': 'P0', 'value': 41}, {'source': 'A6', 'target': 'P1', 'value': 17}, {'source': 'A6', 'target': 'P2', 'value': 35}, {'source': 'A6', 'target': 'P3', 'value': 31}, {'source': 'A6', 'target': 'P4', 'value': 35}, {'source': 'A6', 'target': 'P5', 'value': 18}, {'source': 'A6', 'target': 'P6', 'value': 24}, {'source': 'A6', 'target': 'P7', 'value': 1}, {'source': 'A6', 'target': 'P8', 'value': 17}, {'source': 'A6', 'target': 'P9', 'value': 29}, {'source': 'A7', 'target': 'P0', 'value': 13}, {'source': 'A7', 'target': 'P1', 'value': 9}, {'source': 'A7', 'target': 'P2', 'value': 6}, {'source': 'A7', 'target': 'P3', 'value': 7}, {'source': 'A7', 'target': 'P4', 'value': 11}, {'source': 'A7', 'target': 'P5', 'value': 3}, {'source': 'A7', 'target': 'P6', 'value': 4}, {'source': 'A7', 'target': 'P7', 'value': 7}, {'source': 'A7', 'target': 'P8', 'value': 4}, {'source': 'A7', 'target': 'P9', 'value': 17}, {'source': 'A8', 'target': 'P0', 'value': 82}, {'source': 'A8', 'target': 'P1', 'value': 21}, {'source': 'A8', 'target': 'P2', 'value': 54}, {'source': 'A8', 'target': 'P3', 'value': 45}, {'source': 'A8', 'target': 'P4', 'value': 32}, {'source': 'A8', 'target': 'P5', 'value': 30}, {'source': 'A8', 'target': 'P6', 'value': 22}, {'source': 'A8', 'target': 'P7', 'value': 17}, {'source': 'A8', 'target': 'P8', 'value': 15}, {'source': 'A8', 'target': 'P9', 'value': 55}]
                }

                let option = {
                    title: {
                        text: 'CLUSTERING DISTRIBUTION',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    legend:{},
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove',
                        formatter:()=>''
                    },
                    series: [{
                        type: 'sankey',
                        orient: 'vertical',
                        nodeAlign:'top',
                        nodeGap: 15,
                        label: {
                            position: 'top'
                        },
                        data: test.nodes,
                        top: '15%',
                        bottom: '5%',
                        right: '10%',
                        links: test.links,
                        focusNodeAdjacency: true,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#aaa'
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.5
                        }
                    }
                    ]
                }

                chart.setOption(option)
            },
    Extra_Apriori(level, graph) {
      let chart = this.$echarts.init(document.getElementById("extra01"));

      // chart.clear()

      graph.nodes.forEach(function(node) {
        node.itemStyle = {
          borderColor: "rgba(120,120,120,0.2)",
          borderWidth: 10
        };
        node.symbolSize = parseFloat(node.value) * 70;
        node.category = node.name;
      });

      graph.links.forEach(d => {
        d.lineStyle = {
          width: parseFloat(d.value) * 70
        };
      });

      let option = {
        title: {
          text: "FREQUENT ITEMSET",
          subtext: `OPERANDS:${level}`,
          textStyle: {
            fontSize: 16
          }
        },
        color: [
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
          top: "30%",
          left: "5",
          icon: "circle",
          orient: "vertical",
          itemWidth: 10,
          itemHeight: 7,
          itemGap: 10,
          textStyle: {
            fontSize: 10,
            color: "rgba(120,120,120,0.98)"
          },
          data: graph.nodes.map(function(a) {
            return a.name;
          })
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: "FREQUENT ITEMSET",
            type: "graph",
            top: "25%",
            bottom: "10%",
            left: "15%",
            layout: "circular",
            circular: {
              rotateLabel: true
            },
            data: graph.nodes,
            links: graph.links,
            categories: graph.nodes.map(d => {
              return {
                name: d.name
              };
            }),
            roam: true,
            label: {
              position: "right",
              formatter: "{b}"
            },
            lineStyle: {
              color: "#bbb",
              curveness: 0.3
            }
          }
        ]
      };

      chart.setOption(option);
    },
    Extra_MealRate(data) {
      let chart = this.$echarts.init(document.getElementById("extra02"));

      let color = ["#dcf296", "#b8f29c", "#7bd9a5"];
      let dataStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          shadowBlur: 40,
          borderWidth: 10,
          shadowColor: "rgba(0, 0, 0, 0)" //边框阴影
        }
      };
      let placeHolderStyle = {
        normal: {
          color: "transparent",
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          color: "#eee"
        }
      };
      let option = {
        // backgroundColor: '#142058',
        title: {
          show: true,
          text: "DINING RATE",
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "item",
          show: true,
          formatter: "{b} : {d}%",
          // backgroundColor: 'rgba(0,0,0,0.1)', // 背景
          // textStyle: {
          //     color: "#aaa"
          // },
          // padding: [8, 10], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.1);" //添加阴影
        },
        legend: {
          orient: "vertical",
          // icon: 'circle',
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 10,
          textStyle: {
            fontSize: 12,
            color: "rgba(120,120,120,0.98)"
          },
          right: "20%",
          top: "26%",
          data: ["dinner", "lunch", "breakfast"]
        },
        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: false,
            radius: ["30%", "35%"],
            center: ["45%", "60%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            label: {
              borderRadius: "10"
            },
            data: [
              {
                value: parseFloat(data[0]) * 100,
                name: "breakfast",
                itemStyle: {
                  normal: {
                    color: color[0]
                  }
                }
              },
              {
                value: 100 - parseFloat(data[0]) * 100,
                name: "",
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: "#fff"
                  }
                }
              }
            ]
          },
          {
            name: "Line 2",
            type: "pie",
            clockWise: false,
            radius: ["45%", "50%"],
            center: ["45%", "60%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            data: [
              {
                value: parseFloat(data[1]) * 100,
                name: "lunch",
                itemStyle: {
                  normal: {
                    color: color[1]
                  }
                }
              },
              {
                value: 100 - parseFloat(data[1]) * 100,
                name: "",
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            name: "Line 3",
            type: "pie",
            clockWise: false,
            radius: ["60%", "65%"],
            center: ["45%", "60%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            data: [
              {
                value: parseFloat(data[2]) * 100,
                name: "dinner",
                itemStyle: {
                  normal: {
                    color: color[2]
                  }
                }
              },
              {
                value: 100 - parseFloat(data[2]) * 100,
                name: "",
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              }
            ]
          }
        ]
      };

      chart.setOption(option);
    },
    Meal_info(data) {
      let chart = this.$echarts.init(document.getElementById("extra_msg"));

      let max = 0;

      data.forEach(d => {
        max = d3.max(
          [
            max,
            parseInt(d.C1),
            parseInt(d.C2),
            parseInt(d.C3),
            parseInt(d.C4),
            parseInt(d.C5)
          ],
          s => s
        );
      });

      let scale = d3
        .scaleLinear()
        .domain([0, max])
        .range([5, 50]);

      let option = {
        title: {
          text: "DINGING PREFERENCE",
        },
        color:[
                    "#d0648a",
                    "#d07999",
                    "#f58db2",
        ],

        grid: {
        },
        yAxis: {
          data: ["0", "1", "2"],
          splitLine: {
            show: true
          },
          axisLine: {
            show: true
          }
        },
        xAxis: {
          data: ["C1", "C2", "C3", "C4", "C5"],
          axisLine: {
            show: true
          }
        },
        series: [
          {
            name: "a",
            type: "scatter",
            symbol: "circle", //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: function(data) {
              return scale(parseInt(data[2]));
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[2];
                },
                position: "top"
              }
            },
            data: [
              ["C1", "0", data[0].C1],
              ["C2", "0", data[0].C2],
              ["C3", "0", data[0].C3],
              ["C4", "0", data[0].C4],
              ["C5", "0", data[0].C5]
            ]
          },
          {
            name: "b",
            type: "scatter",
            symbol: "circle", //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: function(data) {
              return scale(parseInt(data[2]));
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[2];
                },
                position: "top"
              }
            },
            data: [
              ["C1", "1", data[1].C1],
              ["C2", "1", data[1].C2],
              ["C3", "1", data[1].C3],
              ["C4", "1", data[1].C4],
              ["C5", "1", data[1].C5]
            ]
          },
          {
            name: "c",
            type: "scatter",
            symbol: "circle", //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: function(data) {
              return scale(parseInt(data[2]));
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[2];
                },
                position: "top"
              }
            },
            data: [
              ["C1", "2", data[2].C1],
              ["C2", "2", data[2].C2],
              ["C3", "2", data[2].C3],
              ["C4", "2", data[2].C4],
              ["C5", "2", data[2].C5]
            ]
          }
        ]
      };

      chart.setOption(option);
    }
  }
};
</script>

<style scoped>
#extra_msg {
  position: absolute;
  left: 0;
  top: 40%;
  width: 27%;
  height: 30%;
  /* background-color: #ccc; */
}
.extra {
  float: left;
  position: relative;
  width: 50%;
  height: 100%;
  /*background-color: orangered;*/
}
</style>
