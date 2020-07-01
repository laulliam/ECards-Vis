<template>
  <div id="test02">
    <div id="rose_pie"></div>
    <div id="calendar"></div>
  </div>
</template>

<script>
    import DataManager from "../../data/DataManager";
    import * as d3 from 'd3'
    export default {
        name: "AppTest02",
        mounted() {
            this.Test()
            // DataManager.get_meal_test().then(res=>{
            //     this.Init(res.data)
            // })
            // this.RosePie()
            // this.Calendar()
            this.Circular_heat()
            // DataManager.get_meal_dept_data().then(res=>{
            //     this.Stacked_Bar(res.data)
            // })
        },
        methods:{
            Test(){
                let chart = this.$echarts.init(document.getElementById('calendar'))

                let color = d3.scaleOrdinal()
                    .domain(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'])
                    .range([
                        "#d0648a",
                        "#d07999",
                        "#f58db2",
                        "#f2b3c9",
                        "#f2c4bc",
                        "#dcf296",
                        "#b8f29c",
                        "#7bd9a5"])

                let test = {
                    nodes:[
                        {name:'C1',itemStyle:{color:'#f77d8c',}},{name:'C2',itemStyle:{color:'#f77d8c',}},
                        {name:'C3',itemStyle:{color:'#f77d8c',}},{name:'C4',itemStyle:{color:'#f77d8c',}},
                        {name:'C5',itemStyle:{color:'#f77d8c',}},
                        {name:'A1',itemStyle:{color:color('A1')}},{name:'A2',itemStyle:{color:color('A2')}},{name:'A3',itemStyle:{color:color('A3')}},{name:'A4',itemStyle:{color:color('A4')}},
                        {name:'A5',itemStyle:{color:color('A5')}},{name:'A6',itemStyle:{color:color('A6')}},{name:'A7',itemStyle:{color:color('A7')}},{name:'A8',itemStyle:{color:color('A8')}}],
                    links:[
                        {'source': 'A1', 'target':'C1', 'value': 145}, {'source':'A2', 'target':'C1', 'value': 127},
                        {'source': 'A3', 'target':'C1', 'value': 19},  {'source':'A4', 'target':'C1', 'value': 50},
                        {'source': 'A5', 'target':'C1', 'value': 147}, {'source':'A6', 'target':'C1', 'value': 102},
                        {'source': 'A7', 'target':'C1', 'value': 9},   {'source':'A8', 'target':'C1', 'value': 122},
                        {'source': 'A1', 'target':'C2', 'value': 174}, {'source':'A2', 'target':'C2', 'value': 196},
                        {'source': 'A3', 'target':'C2', 'value': 29},  {'source':'A4', 'target':'C2', 'value': 81},
                        {'source': 'A5', 'target':'C2', 'value': 308}, {'source':'A6', 'target':'C2', 'value': 154},
                        {'source': 'A7', 'target':'C2', 'value': 8},   {'source':'A8', 'target':'C2', 'value': 195},
                        {'source': 'A1', 'target':'C3', 'value': 66},  {'source':'A2', 'target':'C3', 'value': 195},
                        {'source': 'A3', 'target':'C3', 'value': 44},  {'source':'A4', 'target':'C3', 'value': 142},
                        {'source': 'A5', 'target':'C3', 'value': 21},  {'source':'A6', 'target':'C3', 'value': 13},
                        {'source': 'A7', 'target':'C3', 'value': 21},  {'source':'A8', 'target':'C3', 'value': 54},
                        {'source': 'A1', 'target':'C4', 'value': 149}, {'source':'A2', 'target':'C4', 'value': 176},
                        {'source': 'A3', 'target':'C4', 'value': 29},  {'source':'A4', 'target':'C4', 'value': 82},
                        {'source': 'A5', 'target':'C4', 'value': 242}, {'source':'A6', 'target':'C4', 'value': 121},
                        {'source': 'A7', 'target':'C4', 'value': 15},  {'source':'A8', 'target':'C4', 'value': 119},
                        {'source': 'A1', 'target':'C5', 'value': 120}, {'source':'A2', 'target':'C5', 'value': 386},
                        {'source': 'A3', 'target':'C5', 'value': 100}, {'source':'A4', 'target':'C5', 'value': 199},
                        {'source': 'A5', 'target':'C5', 'value': 46},  {'source':'A6', 'target':'C5', 'value': 11},
                        {'source': 'A7', 'target':'C5', 'value': 52},  {'source':'A8', 'target':'C5', 'value': 77}
                    ]
                }

                let option = {
                    title: {
                        text: 'THERE IS A TEXT',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'sankey',
                            // orient: 'vertical',
                            data: test.nodes,
                            top:'15%',
                            bottom:'5%',
                            right:'5%',
                            links: test.links,
                            focusNodeAdjacency: true,
                            lineStyle: {
                                curveness: 0.5
                            },
                            levels: [{
                                depth: 0,
                                itemStyle: {
                                    color: '#fbb4ae'
                                },
                                lineStyle: {
                                    color: '#ccc',
                                    opacity: .6
                                }
                            }]
                        }
                    ]
                }

                chart.setOption(option)
            },
            Init(data){

                let margin = {top: 30, right: 30, bottom: 30, left: 40};

                let width = document.getElementById('test02').offsetWidth;
                let height = document.getElementById('test02').offsetHeight;

                width = width - margin.left - margin.right;
                height = height - margin.top - margin.bottom;

                let svg = d3.select('#test02')
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                let histogramChart = ()=>{

                    let test_data = [];

                    for (let i = 1;i<=7;i++)
                        for(let j = 0 ;j<24;j++)
                            test_data.push({day:i,hour:j,value:Math.random()*50})

                    let x = d3.scaleBand()
                        .range([ 0, width ])
                        .domain(new Array(7).fill(0).map((d,i)=>i+1))
                        .padding(0.05)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.

                    let y = d3.scaleLinear()
                        .domain([0, 23])          // Note that here the Y scale is set manually
                        .range([height, 0])

                    let histogram = d3.histogram()
                        .domain(y.domain())
                        .thresholds(y.ticks(20))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
                        .value(d => d)

                    let sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
                        .key(function(d) { return d.day;})
                        .rollup(function(d) {   // For each key..
                            let input = d.map(function(g) { return g.value;})    // Keep the letiable called Sepal_Length
                            let bins = histogram(input)   // And compute the binning on it.
                            return(bins)
                        })
                        .entries(test_data)

                    // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
                    let maxNum = 0
                    for (let i in sumstat ){
                        let allBins = sumstat[i].value
                        let lengths = allBins.map(function(a){return a.length;})
                        let longuest = d3.max(lengths)
                        if (longuest > maxNum) { maxNum = longuest }
                    }

                    // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
                    let xNum = d3.scaleLinear()
                        .range([0, x.bandwidth()])
                        .domain([-maxNum,maxNum])

                    // Add the shape to this svg!
                    svg
                        .selectAll("myViolin")
                        .data(sumstat)
                        .enter()        // So now we are working group per group
                        .append("g")
                        .attr("transform", function(d){ return("translate(" + x(d.key) +" ,0)") } ) // Translation on the right to be at the group position
                        .append("path")
                        .datum(function(d){ return(d.value)})     // So now we are working bin per bin
                        .style("stroke", "none")
                        .style("fill","#f2c4bc")
                        .attr("d", d3.area()
                            .x0(function(d){ return(xNum(-d.length)) } )
                            .x1(function(d){ return(xNum(d.length)) } )
                            .y(function(d){ return(y(d.x0)) } )
                            .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                        )

                    svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x))

                    // svg.append("g").call( d3.axisLeft(y) );

                }

                // histogramChart();

                let calendar = ()=> {
                    let gridSize = width / 33;
                    let gridHeight = height / 30;

                    let data = [];

                    for (let i = 1; i <= 7; i++)
                        for (let j = 0; j < 24; j++)
                            data.push({day: i, hour: j, value: Math.random() * 100})

                    let myColor = d3.scaleLinear()
                        .range(["white", "#69b3a2"])
                        .domain([0, 100])

                    // Build X scales and axis:
                    let x = d3.scaleBand()
                        .range([0, width])
                        .domain(new Array(30).fill(0).map((d, i) => i + 1))
                        .padding(0.01);

                    let y = d3.scaleBand()
                        .range([height, 0])
                        .domain(new Array(24).fill(0).map((d, i) => i))
                        .padding(0.01);

                    let calender_g = svg.append("g");

                    let calendar_rects = calender_g.selectAll(".hour")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("x", function (d) {
                            return x(d.day)
                        })
                        .attr("y", function (d) {
                            return y(d.hour)
                        })
                        .attr("width", x.bandwidth())
                        .attr("height", y.bandwidth())
                        .style("fill", function (d) {
                            return myColor(d.value)
                        })
                }


                // calendar()

                let time_line = {}


            },
            Circular_heat(){
                let chart = this.$echarts.init(document.getElementById('rose_pie'))

                let echarts = this.$echarts

                function renderItem(params, api) {
                    let values = [api.value(0), api.value(1)];
                    let coord = api.coord(values);
                    let size = api.size([1, 1], values);
                    return {
                        type: 'sector',
                        shape: {
                            cx: params.coordSys.cx,
                            cy: params.coordSys.cy,
                            r0: coord[2] - size[0] / 2,
                            r: coord[2] + size[0] / 2,
                            startAngle: -(coord[3] + size[1] / 2),
                            endAngle: -(coord[3] - size[1] / 2)
                        },
                        style: api.style({
                            fill: api.visual('color')
                        })
                    };
                }

       /*         let hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
                let days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

                let data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];
                let maxValue = echarts.util.reduce(data, function (max, item) {
                    return Math.max(max, item[2]);
                }, -Infinity);

                let option = {
                    title:{
                        text:'Canteen Polar',
                        subtext:'name: C1',
                        textStyle:{
                            fontSize:16
                        }
                    },
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
                    legend: {
                        show:false,
                        data: ['Punch Card']
                    },
                    polar: {
                        radius: ['0','65%'],//半径大小
                        center:['50%','55%']
                    },
                    tooltip: {
                    },
                    visualMap: {
                        // show:false,
                        inRange: {
                            color: ['#fff', '#15c225']
                        },
                        type: 'continuous',
                        min: 0,
                        orient:'horizontal',
                        max: maxValue,
                        top: '0',
                        text:['High', 'Low'],
                        borderColor:"#a8a8a8",
                        itemWidth:10,                          //图形的宽度，即长条的宽度。
                        itemHeight:55,                        //图形的高度，即长条的高度。
                        right:0,
                        dimension: 2,
                        calculable: false
                    },
                    angleAxis: {
                        type: 'category',
                        data: hours.map((d,i)=>i),
                        boundaryGap: false,
                        axisTick:{
                            lineStyle: {
                                'color':'#ccc'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#ddd',
                                type: 'dashed'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize:10,
                                color: '#676767'
                            }
                        }
                    },
                    radiusAxis: {
                        show:false,
                        type: 'category',
                        data: days,
                        z: 100
                    },
                    series: [{
                        name: 'Punch Card',
                        type: 'custom',
                        coordinateSystem: 'polar',
                        itemStyle: {
                            color: '#15c225'
                        },
                        renderItem: renderItem,
                        data: data
                    }]
                };*/

                var hours = ['A1','A2','A3','A4','A5','A6','A7','A8'];
                var days = ['C1','C2','C3','C4','C5'];

                var test = [[5.5, 5.0, 3.5, 5.0, 4.0], [3.5, 5.0, 5.5, 4.5, 6.5], [1.5, 2.5, 4.0, 2.0, 5.0], [2.0, 2.5, 5.5, 3.0, 6.0], [4.0, 6.5, 1.5, 6.0, 2.0], [3.5, 4.5, 1.5, 4.5, 1.0], [1.5, 1.0, 3.5, 2.0, 4.0], [5.5, 6.0, 3.0, 3.5, 3.0]]

                let data = []

                test.forEach((d,i)=>{
                    d.forEach((s,j)=>{
                        data.push([i,j,s])
                    })
                })

                let option = {
                    title:{
                        text:'PREFERENCE MATRIX',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    tooltip: {
                        position: 'top'
                    },
                    animation: false,
                    grid: {
                        top: '15%',
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
                        inRange: {
                            color: ['#fff', '#9d436a']
                        },
                        type: 'continuous',
                        min: 0,
                        orient:'horizontal',
                        max: 8,
                        top: '0',
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
                        // type: 'heatmap',
                        data: data,
                        label: {
                            show: true
                        },
                        type: 'effectScatter',
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
            RosePie(){
                let chart = this.$echarts.init(document.getElementById('rose_pie'))

                let plantCap = [{
                    name: '一线',
                    value: '154'
                }, {
                    name: '二线',
                    value: '115'
                }, {
                    name: '三线',
                    value: '113'
                }, {
                    name: '四线',
                    value: '95'
                }, {
                    name: '六线',
                    value: '92'
                }, {
                    name: '五线',
                    value: '87'
                }, {
                    name: '七线',
                    value: '87'
                }, {
                    name: '八线',
                    value: '60'
                }];

                let datalist = [{
                    offset: [56, 48],
                    symbolSize: 84,
                    opacity: .95,
                    color: 'rgba(104,184,55, 1)'
                },  {
                    offset: [20, 43],
                    symbolSize: 55,
                    opacity: .84,
                    color: 'rgba(104,184,55, 0.95)'
                }, {
                    offset: [83, 35],
                    symbolSize: 50,
                    opacity: .8,
                    color: 'rgba(104,184,55, 0.95)'
                }, {
                    offset: [36, 30],
                    symbolSize: 45,
                    opacity: .75,
                    color: 'rgba(104,184,55, 0.90)'
                }, {
                    offset: [64, 20],
                    symbolSize: 52,
                    opacity: .7,
                    color: 'rgba(104,184,55, 0.90)'
                }, {
                    offset: [35, 45],
                    symbolSize: 47,
                    opacity: .68,
                    color: 'rgba(104,184,55, 0.85)'
                }, {
                    offset: [80, 52],
                    symbolSize: 30,
                    opacity: .7,
                    color: 'rgba(104,184,55, 0.80)'
                },{
                    offset: [40, 65],
                    symbolSize: 30,
                    opacity: .88,
                    color: 'rgba(104,184,55, 0.95)'
                }];
                let datas = [];
                for (let i = 0; i < plantCap.length; i++) {
                    let item = plantCap[i];
                    let itemToStyle = datalist[i];
                    datas.push({
                        name: item.value + '\n' + item.name,
                        value: itemToStyle.offset,
                        symbolSize: itemToStyle.symbolSize,
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: 14,
                                    color:'#fff'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: itemToStyle.color,
                                opacity: itemToStyle.opacity
                            }
                        },
                    })
                }
                let option = {
                    grid: {
                        show: false,
                        top: 10,
                        bottom: 10
                    },
                    xAxis: [{
                        gridIndex: 0,
                        type: 'value',
                        show: false,
                        min: 0,
                        max: 100,
                        nameLocation: 'middle',
                        nameGap: 5
                    }],
                    yAxis: [{
                        gridIndex: 0,
                        min: 0,
                        show: false,
                        max: 100,
                        nameLocation: 'middle',
                        nameGap: 30
                    }],
                    series: [{
                        type: 'scatter',
                        symbol: 'circle',
                        symbolSize: 120,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}',
                                color: '#fff',
                                textStyle: {
                                    fontSize: '20'
                                }
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: '4',
                                borderType: 'solid',
                                borderColor: '#fff',
                                color: '#68b837',
                                shadowColor: '#68b837',
                                shadowBlur: 10
                            }
                        },
                        data: datas
                    }]
                };

                chart.setOption(option);
            },
            Calendar(){
                let margin = {top: 30, right: 30, bottom: 30, left: 40};

                let width = document.getElementById('calendar').offsetWidth;
                let height = document.getElementById('calendar').offsetHeight;

                width = width - margin.left - margin.right;
                height = height - margin.top - margin.bottom;

                let svg = d3.select('#calendar')
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                let canteen = ['C1','C2','C3','C4','C5']

                let data = [];

                for (let i = 1; i <= 7; i++)
                    for (let j = 0; j < 24; j++)
                        data.push({day: i, hour: j, value: Math.random() * 100})

                let myColor = d3.scaleLinear()
                    .range(["white", "#69b3a2"])
                    .domain([0, 100])

                // Build X scales and axis:
                let x = d3.scaleBand()
                    .range([0, width])
                    .domain(new Array(24).fill(0).map((d, i) => i))
                    .padding(0.01);

                let y = d3.scaleBand()
                    .range([height/5, 0])
                    .domain(new Array(7).fill(0).map((d, i) => i+1))
                    .padding(0.01);

                let canteen_g = svg.selectAll('g')
                    .data(canteen)
                    .enter()
                    .append('g')
                    .attr('transform',(d,i)=>{
                        return `translate(0,${i*height/5+i*2})`
                    });

                canteen_g.call(g=>g.selectAll(".hour")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", function (d) {
                        return x(d.hour)
                    })
                    .attr("y", function (d) {
                        return y(d.day)
                    })
                    .attr("width", x.bandwidth())
                    .attr("height", y.bandwidth()/1.2)
                    .style("fill", function (d) {
                        return myColor(d.value)
                    }))

            },
            TimeLine(){
                let margin = {top: 30, right: 30, bottom: 30, left: 40};

                let width = document.getElementById('calendar').offsetWidth;
                let height = document.getElementById('calendar').offsetHeight;

                width = width - margin.left - margin.right;
                height = height - margin.top - margin.bottom;

                let svg = d3.select('#calendar')
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);

                let categories = ['C1','C2','C3','C4','C5']


            },
            Stacked_Bar(data){
                let width = document.getElementById('calendar').offsetWidth;
                let height = document.getElementById('calendar').offsetHeight;

                let margin = {top: 10, right: 10, bottom: 20, left: 40}

                let svg = d3.select('#calendar').append("svg")
                    .attr('width',width)
                    .attr('height',height)
                    // .attr("viewBox", [-width / 2, -height / 2, width, height])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round");

                data  = d3.nest().key(d=>d.time).entries(data).map((d,i)=>{
                    return {
                        name: i,
                        'A1': parseInt(d.values[0].value),
                        'A2': parseInt(d.values[1].value),
                        'A3': parseInt(d.values[2].value),
                        'A4': parseInt(d.values[3].value),
                        'A5': parseInt(d.values[4].value),
                        'A6': parseInt(d.values[5].value),
                        'A7': parseInt(d.values[6].value),
                        'A8': parseInt(d.values[7].value),
                        total: d3.sum(d.values, d => parseInt(d.value))
                    }
                }).slice(10,47)

                let test_data = [...Array(48)].map((d,i)=>{
                    return {
                        name:i,
                        A1:Math.random()*100,
                        A2:Math.random()*100,
                        A3:Math.random()*100,
                        A4:Math.random()*100,
                        A5:Math.random()*100,
                        A6:Math.random()*100,
                        A7:Math.random()*100,
                        A8:Math.random()*100,
                    }
                }).map(d=>{
                    return {
                        name:d.name,
                        A1:d.A1,
                        A2:d.A2,
                        A3:d.A3,
                        A4:d.A4,
                        A5:d.A5,
                        A6:d.A6,
                        A7:d.A7,
                        A8:d.A8,
                        total:d3.sum([d.A1,d.A2,d.A3,d.A4,d.A5,d.A6,d.A7,d.A8],d=>d)
                    }
                }).slice(10,47)

                let series = d3.stack()
                    .keys(['A1','A2','A3','A4','A5','A6','A7','A8'])
                    (data)
                    .map(d => (d.forEach(v => v.key = d.key), d))

                let series1 = d3.stack()
                    .keys(['A1','A2','A3','A4','A5','A6','A7','A8'])
                    (test_data)
                    .map(d => (d.forEach(v => v.key = d.key), d))

                let x = d3.scaleBand()
                    .domain(data.map(d => d.name))
                    .range([margin.left, width - margin.right])
                    .padding(0.1)

                let y = d3.scaleLinear()
                    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
                    .rangeRound([height/2 - margin.bottom, margin.top])

                let y1 = d3.scaleLinear()
                    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
                    .rangeRound([ margin.top,height/2 - margin.bottom])

                let xAxis = g => g
                    .attr("transform", `translate(0,${height/2- margin.bottom})`)
                    .call(d3.axisBottom(x).tickSizeOuter(0))
                    .call(g => g.selectAll(".tick").remove())
                    .call(g => g.selectAll("path").attr('stroke-opacity',.4))

                let color = d3.scaleOrdinal()
                    .domain(series.map(d => d.key))
                    .range([
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
                    ])
                    .unknown("#ccc")

                let stacked_bar_g = svg.selectAll('g')
                    .data(['C1'])
                    .enter()
                    .append('g')
                    // .attr('transform',(d,i)=>{
                    //     return `translate(0,${i*height+ 10})`
                    // })


                stacked_bar_g.call(g=>g.append("g")
                    .selectAll("g")
                    .data(series1)
                    .join("g")
                    .attr("fill", d => color(d.key))
                    .attr("opacity", .3)
                    .selectAll("rect")
                    .data(d => d)
                    .join("rect")
                    .attr("x", (d, i) => x(d.data.name))
                    .attr("y", d => y1(d[1]))
                    .attr("height", d => y1(d[0]) - y1(d[1]))
                    .attr("width", x.bandwidth()))

                stacked_bar_g.call(g=>g.append("g")
                    .selectAll("g")
                    .data(series)
                    .join("g")
                    .attr("fill", d => color(d.key))
                    .attr("opacity", .8)
                    .selectAll("rect")
                    .data(d => d)
                    .join("rect")
                    .attr("x", (d, i) => x(d.data.name))
                    .attr("y", d => y(d[1]))
                    .attr("height", d => y(d[0]) - y(d[1]))
                    .attr("width", x.bandwidth()))


                stacked_bar_g.call(g=>g.append('g').call(xAxis))

            }
        }
    }
</script>

<style scoped>
  #test02{
    position: absolute;
    left: 27%;
    bottom: 0;
    width: 46%;
    height: 30%;
    /*background-color: #ffd82f;*/
  }

  #rose_pie{
    position: absolute;
    width: 40%;
    height: 100%;
    /*background-color: indianred;*/
  }

  #calendar{
    position: absolute;
    top:0;
    left: 40%;
    width: 60%;
    height: 100%;
  }
</style>
