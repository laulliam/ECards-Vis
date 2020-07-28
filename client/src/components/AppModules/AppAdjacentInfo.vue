<template>
  <div id="adjacent_info">
    <div id="adjacent_info_title"></div>
    <div id="wordCloud"></div>
    <div id="wordCloud-main"></div>
    <div id="adjac_legend">
      <Tag checkable v-for="(id,index) in nodes" :key="id" :color="color[index]">{{id}}</Tag>
    </div>
  </div>
</template>

<script>
    import DataManager from "../../data/DataManager";
    import '../../../static/echarts-wordcloud.min'
    import * as d3 from 'd3'
    export default {
        name: "AppAdjacentInfo",
        data(){
            return {
                nodes:[],
                color: [
                    "#d0648a",
                    "#7bd9a5",
                    "#f58db2",
                    "#22c3aa",
                    "#f2b3c9",
                    "#4ea397"
                ]
            }
        },
        mounted() {
            this.Init_Title()
            this.Init()
            // this.wordCloud()
            // this.Init_Radar()
        },
        methods:{
            Init_Title() {

                let chart = this.$echarts.init(document.getElementById('adjacent_info_title'))

                let option = {
                    title: {
                        text: 'ADJACENT INFORMATION',
                        textStyle: {
                            fontSize: 16
                        }
                    },
                }

                chart.setOption(option)
            },
            Init(){
                let width = document.getElementById('adjacent_info').offsetWidth;
                let height = document.getElementById('adjacent_info').offsetHeight;

                let data = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 37.0, 76.0, 24.0, 25.0, 10.0, 6.0, 8.0, 2.0, 1.0, 0.0, 1.0, 0.0, 2.0, 10.0, 22.0, 35.0, 16.0, 9.0, 2.0, 3.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 8.0, 16.0, 18.0, 19.0, 14.0, 10.0, 1.0, 2.0, 0.0, 2.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]
                    .map((d,i)=>{
                        return {
                            name:i,
                            value: d
                        }
                    })


                let svg = d3.select('#adjacent_info')
                    .append("svg")
                    .attr('width',width)
                    .attr('height',height)
                    .attr("viewBox", [-width / 2, -height / 2, width, height])
                // .attr("stroke-linejoin", "round")
                // .attr("stroke-linecap", "round");

                let innerRadius = 50
                let outerRadius = 100

                let x = d3.scaleLinear()
                    .domain([1,72])
                    .range([0,2*Math.PI])

                let x2 = d3.scaleLinear()
                    .domain([1,24])
                    .range([0,2*Math.PI])

                let y = d3.scaleLinear()
                    .domain([0,d3.max(data,d=>d.value)])
                    .range([50, outerRadius])


                let xAxis = g =>
                    g.call(g =>
                        g
                            .selectAll("g")
                            .data([...Array(23)].map((d,i)=>(i+1)))
                            .join("g")
                            .call(g =>
                                g
                                    .append("path")
                                    .attr("stroke", "#565656")
                                    .attr("stroke-opacity", 0.2)
                                    .attr(
                                        "d",
                                        d => `M${d3.pointRadial(x2(d), innerRadius-10)} L${d3.pointRadial(x2(d), outerRadius)}`
                                    )
                            )

                    );

                let yAxis = g =>
                    g.call(g =>
                        g
                            .selectAll("g")
                            .data(y.ticks(5))
                            .join("g")
                            .attr("fill", "none")
                            .call(g =>
                                g
                                    .append("circle")
                                    .attr("stroke", "#565656")
                                    .attr("stroke-opacity", 0.1)
                                    .attr("r", y)
                            ) );


                svg.call(g => g.append("g").attr('transform','translate(-150,20)').call(xAxis));
                svg.call(g => g.append("g").attr('transform','translate(-150,20)').call(yAxis));

                // let y1 = d3.scaleLinear()
                //     .domain([0,d3.max(data1,d=>d.value)])
                //     .range([50, outerRadius])
                //
                // let line = d3.lineRadial()
                //     .curve(d3.curveBasisClosed)
                //     .angle(d => x(d.name))
                //
                // let area = d3.areaRadial()
                //     .curve(d3.curveBasisClosed)
                //     .angle(d => x(d.name))

                // let radial_g = svg.append('g').attr('transform','translate(-120)')
                //
                // radial_g.append("path")
                //     .attr("fill", "#9d436a")
                //     .attr("fill-opacity", 0.2)
                //     .attr("d", area
                //         .innerRadius(50)
                //         .outerRadius(d => y(d.value))
                //         (data));
                //
                // radial_g.append("path")
                //     .attr("fill", "none")
                //     .attr("stroke", "#9d436a")
                //     .attr("stroke-width", 1.5)
                //     .attr("d", line
                //         .radius(d => y(d.value))
                //         (data));
                //
                // radial_g.append("path")
                //     .attr("fill", "#4ea397")
                //     .attr("fill-opacity", 0.2)
                //     .attr("d", area
                //         .innerRadius(50)
                //         .outerRadius(d => y1(d.value))
                //         (data1));
                //
                // radial_g.append("path")
                //     .attr("fill", "none")
                //     .attr("stroke", "#4ea397")
                //     .attr("stroke-width", 1.5)
                //     .attr("d", line
                //         .radius(d => y1(d.value))
                //         (data1));

            },
            wordCloud(data){
                let chart = this.$echarts.init(document.getElementById('wordCloud-main'))
                let maskImage = new Image();
                // maskImage.src = ''
                chart.clear()
                // datas = [
                //     {
                //         "name": "希特勒",
                //         "value": 2
                //     },
                //     {
                //         "name": "漫步",
                //         "value": 1
                //     },
                //     {
                //         "name": "华尔街",
                //         "value": 1
                //     },
                //     {
                //         "name": "中国式",
                //         "value": 1
                //     },
                //     {
                //         "name": "饭局",
                //         "value": 1
                //     },
                //     {
                //         "name": "散户",
                //         "value": 1
                //     },
                //     {
                //         "name": "技巧",
                //         "value": 1
                //     },
                //     {
                //         "name": "行政监督",
                //         "value": 1
                //     },
                //     {
                //         "name": "原论",
                //         "value": 1
                //     },
                //     {
                //         "name": "巴菲特",
                //         "value": 1
                //     },
                //     {
                //         "name": "共进午餐",
                //         "value": 1
                //     },
                //     {
                //         "name": "曲线",
                //         "value": 1
                //     },
                //     {
                //         "name": "秘密",
                //         "value": 1
                //     },
                //     {
                //         "name": "中国",
                //         "value": 1
                //     },
                //     {
                //         "name": "文人",
                //         "value": 1
                //     },
                //     {
                //         "name": "不要",
                //         "value": 1
                //     },
                //     {
                //         "name": "相信",
                //         "value": 1
                //     },
                //     {
                //         "name": "任何人",
                //         "value": 1
                //     },
                //     {
                //         "name": "格雷厄姆",
                //         "value": 1
                //     },
                //     {
                //         "name": "发现",
                //         "value": 1
                //     },
                //     {
                //         "name": "价值",
                //         "value": 1
                //     },
                //     {
                //         "name": "操盘",
                //         "value": 1
                //     },
                //     {
                //         "name": "圣经",
                //         "value": 1
                //     },
                //     {
                //         "name": "投资",
                //         "value": 1
                //     },
                //     {
                //         "name": "重要",
                //         "value": 1
                //     },
                //     {
                //         "name": "股市",
                //         "value": 1
                //     },
                //     {
                //         "name": "趋势",
                //         "value": 1
                //     },
                //     {
                //         "name": "技术",
                //         "value": 1
                //     },
                //     {
                //         "name": "分析",
                //         "value": 1
                //     }
                // ]
                let color = [
                    "#d0648a",
                    "#7bd9a5",
                    "#f58db2",
                    "#22c3aa",
                    "#f2b3c9",
                    "#4ea397"
                ]

                let option = {
                    tooltip: {},
                    backgroundColor: 'transparent',
                    series: [ {
                        type: 'wordCloud',
                        gridSize: 18,
                        sizeRange: [12, 17],
                        //  rotationRange: [0, 90],
                        shape: 'circle',
                        //width: 600,
                        //height: 400,
                        maskImage:maskImage,
                        rotationRange: [0, 0],
                        textStyle: {

                            normal: {
                                fontFamily:'Arial',
                                color: function (d) {
                                    // console.log(d);
                                    return color[d.data.class]
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: data
                    } ]
                };

                maskImage.src = '../../../static/Book.png';

                maskImage.onload = function () {
                    option.series[0].maskImage = maskImage
                    chart.setOption(option);
                }


                // chart.setOption(option)
            },
            Init_Arc(){
                let width = document.getElementById('adjacent_info').offsetWidth;
                let height = document.getElementById('adjacent_info').offsetHeight;

                let svg = d3.select('#adjacent_info')
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
            },
            /*Init_Adjac(){
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
                    .data([1,8])
                    .enter()
                    .append("path")
                    .attr('class','path')
                    .attr('fill',(d,i)=>['#d0619b','#4ea397'][i])
                    // .attr('fill','#ccc')
                    // .attr('stroke','#cc2e15')
                    .attr("d", d3.arc()
                        .innerRadius(5)
                        .outerRadius(6)
                        .startAngle(function(d,i) { return i*Math.PI; })
                        .endAngle(function(d,i) { return i*Math.PI + angle.bandwidth(); })))
            },*/
            Init_Adjac(){

                let chart = this.$echarts.init(document.getElementById('adjacent'))

                var hours = ['A1','A2','A3','A4','A5'];
                var days = ['C1','C2','C3','C4','C5'];

                var test = [[5.5, 5.0, 3.5, 5.0, 4.0], [3.5, 5.0, 5.5, 4.5, 6.5], [1.5, 2.5, 4.0, 2.0, 5.0], [2.0, 2.5, 5.5, 3.0, 6.0], [4.0, 6.5, 1.5, 6.0, 2.0]]

                let data = []

                test.forEach((d,i)=>{
                    d.forEach((s,j)=>{
                        data.push([i,j,s])
                    })
                })

                let option = {
                    title:{
                        text:'ADJACENCY MATRIX',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    tooltip: {
                        position: 'top'
                    },
                    animation: false,
                    grid: {
                        top: '20%',
                        bottom:'10%'
                    },
                    xAxis: {
                        type: 'category',
                        data: hours,
                        splitArea: {
                            show: true
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick:{
                            color:'#fff'
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: days,
                        splitArea: {
                            show: true
                        },
                        // axisTick: {
                        //     show: false
                        // },
                        axisLine: {
                            show:false
                        },
                    },
                    visualMap: {
                        show:false,
                        inRange: {
                            color: ['#fff', '#18d02c']
                        },
                        type: 'continuous',
                        min: 0,
                        orient:'horizontal',
                        max: 8,
                        top: '10%',
                        left:'0',
                        text:['High', 'Low'],
                        borderColor:"#a8a8a8",
                        itemWidth:10,                          //图形的宽度，即长条的宽度。
                        itemHeight:55,                        //图形的高度，即长条的高度。
                        right:'10%',
                        dimension: 2,
                        calculable: false
                    },
                    series: [{
                        name: 'Punch Card',
                        type: 'heatmap',
                        data: data,
                        label: {
                            show: false
                        },
                        // type: 'effectScatter',
                        symbolSize: function (val) {
                            return val[2]*3;
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };

                chart.setOption(option)
            },
            Init_Radar(){
                let chart = this.$echarts.init(document.getElementById('radar'))

                let option = {
                    title:{
                        text:'THERE IS A TEXT',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    legend: {
                        show:false
                    },
                    radar: {
                        // shape: 'circle',
                        radius:'85%',
                        center:['50%','55%'],
                        triggerEvent: true,
                        name: {
                            textStyle: {
                                color: '#fff',
                                fontSize:'20',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        nameGap:'2',
                        indicator: [{//[4300, 10000, 28000, 35000, 50000, 19000, 21000]
                            name: '资金周转', max: 6500},
                            {name: '其他', max: 16000},
                            {name: '金融理财', max: 30000 },
                            {name: '投资', max: 38000},
                        ], // 数据的数量代表展示什么形状的图形
                        splitArea: {
                            areaStyle: {
                                color: [
                                    'rgba(120,120,120,0.1)', 'rgba(120,120,120,0.2)',
                                    'rgba(120,120,120,0.2)', 'rgba(120,120,120,0.3)',
                                    'rgba(120,120,120,0.3)', 'rgba(120,120,120,0.4)'
                                ].reverse(),
                                shadowColor: 'rgba(0, 0, 0, 1)'
                            }
                        },
                        // axisLabel:{//展示刻度
                        //     show: true
                        // },
                        axisLine: { //指向外圈文本的分隔线样式
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                width:1,
                                color: [
                                    'rgba(120,120,120,0.1)', 'rgba(120,120,120,0.2)',
                                    'rgba(120,120,120,0.2)', 'rgba(120,120,120,0.3)',
                                    'rgba(120,120,120,0.3)', 'rgba(120,120,120,0.4)'
                                ].reverse()
                            }
                        },

                    },

                    series: [{
                        name: '一级权重分析',
                        type: 'radar',
                        //areaStyle: {normal: {}},
                        areaStyle: {
                            normal: {
                                color: 'rgba(78,163,151,0.3)'
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 12,
                        itemStyle: { color: 'rgba(157,67,106,0.8)', borderColor: 'rgba(157,67,106,0.2)', borderWidth: 10, },
                        lineStyle: {
                            normal: {
                                color: 'rgb(78,163,151)',
                                width: 1
                            }
                        },
                        data: [{
                            value: [4300, 10000, 28000, 35000, 50000, 19000, 21000],
                            name: '因素',
                        }
                        ]
                    }]
                }

                chart.setOption(option)
            }
        },
        computed:{
            adj_nodes() {
                return this.$store.state.adj_nodes;
            }
        },
        watch:{
            adj_nodes:{
                handler(nodes){
                    this.nodes = nodes
                    let color = [
                        "#d0648a",
                        "#7bd9a5",
                        "#f58db2",
                        "#22c3aa",
                        "#f2b3c9",
                        "#4ea397"
                    ]

                    // let legend_g = d3.select('#adjacent_info')
                    //     .append('div')
                    //     .style({
                    //         position:'absolute',
                    //         width:'300px',
                    //         height:'50px',
                    //         'z-index':50
                    //     })
                    //
                    // legend_g.selectAll('.adjac_legend')
                    //     .data(nodes)
                    //     .enter()
                    //     .append('Tag')
                    //     .attr('class','adjac_legend')
                    //     .attr('color',(d,i)=>color[i])
                    //     .html(d=>d)

                    d3.select('#adjacent_info').selectAll('.radial_line').remove()
                    d3.select('#adjacent_info').selectAll('.radial_area').remove()

                    this.$axios.all([nodes.map(d=>DataManager.get_orderliness_detail(d))]).then(this.$axios.spread(res=>{
                        for (let index=0;index<nodes.length;index++)
                            res[index].then((d)=>{

                                let data = d.data

                                let x = d3.scaleLinear()
                                    .domain([0,71])
                                    .range([0,2*Math.PI])

                                let y = d3.scaleLinear()
                                    .domain([0,d3.max(data,d=>d.value)])
                                    .range([50, 100])

                                let svg = d3.select('#adjacent_info svg')

                                let line = d3.lineRadial()
                                    .curve(d3.curveBasisClosed)
                                    .angle(d => x(d.name))

                                let area = d3.areaRadial()
                                    .curve(d3.curveBasisClosed)
                                    .angle(d => x(d.name))

                                let radial_g = svg.append('g').attr('transform','translate(-150,20)')

                                radial_g.append("path")
                                    .attr('class','radial_area')
                                    .attr("fill", color[index])
                                    .attr("fill-opacity", 0.2)
                                    .attr("d", area
                                        .innerRadius(50)
                                        .outerRadius(d => y(d.value))
                                        (data));

                                radial_g.append("path")
                                    .attr('class','radial_line')
                                    .attr("fill", "none")
                                    .attr("stroke", color[index])
                                    .attr("stroke-width", 1.5)
                                    .attr("stroke-opacity", .5)
                                    .attr("d", line
                                        .radius(d => y(d.value))
                                        (data));
                                //
                            });
                    }))
                    DataManager.get_freq_words_data().then(res=>{
                        let data = []
                            res.data.filter(d=>nodes.includes(parseInt(d.card_id))).map((d,i)=>{
                            return {
                                data:d.data.map(s=>{
                                    return {
                                        name:s.name,
                                        value:s.value,
                                        id:d.card_id,
                                        class:i
                                    }
                                })
                            }
                        }).forEach(d=>{
                            d.data.forEach(s=>{
                                data.push(s)
                            })
                            })
                        // console.log(data);
                        this.wordCloud(data)
                    })
                }
            }
        }
    }
</script>

<style scoped>
  #adjacent_info{
    position: absolute;
    right: 0;
    bottom:0;
    width: 27%;
    height: 30%;
    /*background-color: #ff8f44;*/
  }

  #adjac_legend{
    position: absolute;
    left: 0;
    top:10%;
    width: 100%;
    height: 10%;
    z-index: 99;
    /*background-color: #f77d8c;*/
  }

  #wordCloud{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 55%;
    height: 90%;
    /*background-color: #9990ff;*/
    z-index: 20;
    opacity: .06;
    filter:alpha(opacity=10);
    background: url('../../../static/Book.png') no-repeat center center;
  }

  #wordCloud-main{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 55%;
    height: 90%;
    /*background-color: #9990ff;*/
    z-index: 21;
  }



  #adjacent_info #adjacent_info_title{
    position: absolute;
    width: 100%;
    height: 40px;
    z-index: 20;
    /*background-color: royalblue;*/
  }
</style>
