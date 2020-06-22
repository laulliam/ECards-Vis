<template>
  <div id="test05">
    <div id="test05_title"></div>
    <div id="adjacent"></div>
    <div id="radar"></div>
  </div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: "AppTest05",
        mounted() {
            this.Init_Title()
            this.Init_Adjac()
            this.Init_Radar()
        },
        methods:{
            Init_Title() {

                let chart = this.$echarts.init(document.getElementById('test05_title'))

                let option = {
                    title: {
                        text: 'THERE IS A TEXT',
                        textStyle: {
                            fontSize: 16
                        }
                    },
                }

                chart.setOption(option)
            },
            /*    Init(){
                  let width = document.getElementById('test05').offsetWidth;
                  let height = document.getElementById('test05').offsetHeight;

                  let svg = d3.select('#test05')
                    .append("svg")
                    .attr('width',width)
                    .attr('height',height)
                    .attr("viewBox", [-width / 2, -height / 2, width, height])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round");


                  let arc = d3.arc()
                    .innerRadius(60)
                    .outerRadius(65)

                  let pie = d3.pie()
                    .padAngle(.001)
                    .startAngle(-.25*Math.PI)
                    .endAngle(-.75*Math.PI);

                  let color = d3.scaleOrdinal()
                    .domain([0,1,2,3])
                    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), 4).reverse())

                  svg.selectAll('path')
                    .data(pie([20,50,30,24]))
                    .enter()
                    .append('path')
                    .attr('fill',(d,i)=> color(i))
                    .attr("d", arc)
                },*/
            Init_Adjac(){
                let width = document.getElementById('adjacent').offsetWidth;
                let height = document.getElementById('adjacent').offsetHeight;

                let data = {
                    name:'root',
                    children:[
                        {name:'c1',children: []},
                        {name:'c2',children: []},
                        {name:'c3',children: []},
                        {name:'c4',children: []},
                        {name:'c4',children: []},
                        {name:'c4',children: []},
                        {name:'c4',children: []},
                        {name:'c4',children: []},
                    ]
                }

                let tree = data => {
                    let root = d3.hierarchy(data);
                    root.dx = height / data.children.length -5;
                    root.dy = width / (root.height+2);
                    return d3.tree().nodeSize([root.dx, root.dy])(root);
                }

                let root = tree(data)

                let x0 = Infinity;
                let x1 = -x0;

                root.each(d => {
                    if (d.x > x1) x1 = d.x;
                    if (d.x < x0) x0 = d.x;
                });

                let svg = d3.select('#adjacent')
                    .append("svg")
                    .attr('width',width)
                    .attr('height',height)
                    // .attr("viewBox", [-width / 2, -height / 2, width, height])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round");

                const g = svg.append("g")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

                const link = g.append("g")
                    .attr("fill", "none")
                    .attr("stroke", "#555")
                    .attr("stroke-opacity", 0.4)
                    .selectAll("path")
                    .data(root.links())
                    .join("path")
                    .attr("stroke-width", (d,i)=>Math.random()*4)
                    .attr("d", d3.linkHorizontal()
                        .x(d => d.y)
                        .y(d => d.x));

                const node = g.append("g")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-width", 3)
                    .selectAll("g")
                    .data(root.descendants())
                    .join("g")
                    .attr("transform", d => `translate(${d.y},${d.x})`);

                node.append("circle")
                    .attr("fill", "#999")
                    .attr("r", 2.5);

                let angle = d3.scaleBand()
                    .domain([1,2])
                    .range([0, 2 * Math.PI])
                // .align(0)

                node.call(g=>g.append('g').selectAll('.path')
                    .data([1,2])
                    .enter()
                    .append("path")
                    .attr('class','path')
                    .attr('fill',(d,i)=>['#d0619b','#4ea397'][i])
                    // .attr('fill','#ccc')
                    // .attr('stroke','#cc2e15')
                    .attr("d", d3.arc()
                        .innerRadius(5)
                        .outerRadius(6)
                        .startAngle(function(d) { return angle(d); })
                        .endAngle(function(d) { return angle(d) + angle.bandwidth() /1.2; })))
            },
            Init_Radar(){

                let chart = this.$echarts.init(document.getElementById('radar'))
                let echarts = this.$echarts
                let color = ["#FFC2C2", "#FF8C8C", "#FFD4AB", "#FFB46E", "#FFEE99", "#FFE048", ];
                let data = [{
                    "name": "E",
                    "percent": 0.54,
                    "value": 20
                },
                    {
                        "name": "A",
                        "percent": 0.80,
                        "value": 30
                    },
                    {
                        "name": "B",
                        "percent": 0.43,
                        "value": 22
                    },
                    {
                        "name": "C",
                        "percent": 0.76,
                        "value": 50
                    },
                    {
                        "name": "D",
                        "percent": 0.49,
                        "value": 12
                    }
                ];

                let max = data[0].value;
                data.forEach(function(d) {
                    max = d.value > max ? d.value : max;
                });

                let renderData = [{
                    value: [],
                    name: [],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: '#ecc03e',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
                                [{
                                    offset: 0,
                                    color: 'rgba(203, 158, 24, 0.8)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(190, 96, 20, 0.8)'
                                }],
                                false)
                        }
                    }
                }];


                data.forEach(function(d, i) {
                    let value = data.map(d => '');
                    value[i] = d.value;
                    renderData[0].value[i] = d.value;
                    renderData[0].name[i] = d.name;
                    renderData[0].areaStyle.normal.color = 'transparent';
                    renderData.push({
                        value: value,
                        symbol: 'circle',
                        symbolSize: d.percent * 30,
                        lineStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: color[i],
                            }
                        }
                    })
                })
                let indicator = [];

                data.forEach(function(d) {
                    indicator.push({
                        name: d.name,
                        max: max + 10,
                        color: '#ccc'
                    })
                })


                let contentArr = data.map((d) => `${d.name}: ${d.value}, 占比：${d.percent*100}%`);
                contentArr.unshift('明星性格');

                let option = {
                    // backgroundColor: '#01193d',
                    tooltip: {
                        show: true,
                        trigger: "item",
                        formatter: contentArr.join('<br />')
                    },
                    radar: {
                        center: ["50%", "50%"],
                        radius: "70%",
                        startAngle: 90, // 起始角度
                        splitNumber: 4,
                        shape: "circle",
                        splitArea: {
                            areaStyle: {
                                color: 'transparent'
                            }
                        },
                        axisLabel: {
                            show: false,
                            fontSize: 20,
                            color: "#000",
                            fontStyle: "normal",
                            fontWeight: "normal"
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#ccc"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#ccc"
                            }
                        },
                        indicator: indicator
                    },
                    series: [{
                        type: "radar",
                        data: renderData
                    }]
                }

                chart.setOption(option)
            }
        }
    }
</script>

<style scoped>
  #test05{
    position: absolute;
    right: 0;
    bottom:0;
    width: 27%;
    height: 30%;
    /*background-color: #ff8f44;*/
  }

  #adjacent{
    position: absolute;
    right: 0;
    width: 45%;
    height: 100%;
    /*background-color: #9990ff;*/
  }

  #radar{
    position: absolute;
    left: 0;
    width: 55%;
    height: 100%;
    /*background-color: #f77d8c;*/
  }



  #test05 #test05_title{
    position: absolute;
    width: 100%;
    height: 40px;
    z-index: 20;
    /*background-color: royalblue;*/
  }
</style>
