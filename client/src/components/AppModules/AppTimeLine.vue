<template>
  <div id="timeline-container">
    <div id="timeline-title"></div>
    <div id="timeline">
      <!--    <div id="rose_pie"></div>-->
      <!--    <div id="calendar"></div>-->
    </div>
  </div>

</template>

<script>
    import DataManager from "../../data/DataManager";
    import * as d3 from 'd3'
    export default {
        name: "AppTimeLine",
        data(){
            return {
                status:false
            }
        },
        mounted() {
            DataManager.get_meal_timeline('C1').then(res=>{
                this.TimeLine(res.data)
            })
            // this.Test()
            this.Init_Title()
            // this.TimeLine()
            // DataManager.get_meal_test().then(res=>{
            //     this.Init(res.data)
            // })
            // this.RosePie()
            // this.Calendar()
            // this.Circular_heat()
            // DataManager.get_meal_dept_data().then(res=>{
            //     this.Stacked_Bar(res.data)
            // })
        },
        methods:{
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
            Init_Title() {
                let title_div = document.getElementById("timeline-title");

                let chart = this.$echarts.init(title_div);

                let option = {
                    title: {
                        text: "DINING TIMELINE",
                        subtext:'DINGING TIMELINE OF C1',
                        textStyle: {
                            fontSize: 16
                        }
                    }
                };

                chart.setOption(option);

                title_div.style.transform = "rotate(-90deg)";
            },
            TimeLine(dataset){

                let chart = this.$echarts.init(document.getElementById('timeline'))

                chart.clear()

                let echarts = this.$echarts
                let nests = d3.nest().key(d=>d.department).entries(dataset)

                let test_data = []

                let max = 0

                nests.forEach((d,i)=>{
                    d.values.forEach((s,j)=>{
                        if(parseInt(s.value)>max)
                            max = parseInt(s.value)
                        test_data.push([i,j,parseInt(s.value)]);
                    })
                })


                let scale = d3.scaleLinear()
                    .domain([0,150])
                    .range([0,50])

                var hours = [...Array(72)].map((d,i)=>`${parseInt(i*20/60)}:${(i*20)%60}`);
                var days = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7','A8'];

                let option = {
                    color:[
                        "#d0648a",
                        "#d07999",
                        "#f58db2",
                        "#dcf296",
                        "#b8f29c",
                        "#7bd9a5",
                        "#22c3aa",
                        "#4ea397"
                    ],
                    tooltip: {
                        // show:false,
                        trigger:'item',
                        position: 'top',
                        formatter:function (params) {
                            return params.name +' -- '+ params.value[1];
                        }
                    },
                    title: [],
                    singleAxis: [],
                    series: [],
                    dataZoom: [
                        {
                            type: 'inside',
                            singleAxisIndex: [0, 1,2,3,4,5,6,7],
                            start: 10,
                            end: 100
                        },
                        {
                            show: false,
                            singleAxisIndex: [0, 1,2,3,4,5,6,7],
                            type: 'slider',
                            bottom: 10,
                            start: 10,
                            end: 100,
                        }
                    ],
                };

                echarts.util.each(days, function (day, idx) {
                    option.title.push({
                        textBaseline: 'middle',
                        left:50,
                        top: (idx +0.3) * 100 / 8.5 + '%',
                        subtext: day
                    });
                    option.singleAxis.push({
                        left: 100,
                        type: 'category',
                        boundaryGap: false,
                        data: hours,
                        top: (idx * 100 / 8.5 +8) + '%',
                        height: (100 / 8.5 - 10) + '%',
                        axisLine: {
                            lineStyle: {
                                width: .4,
                                color: '#999'
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            show:idx === 7,
                            interval: 2
                        }
                    });
                    option.series.push({
                        singleAxisIndex: idx,
                        coordinateSystem: 'singleAxis',
                        type: 'scatter',
                        data: [],
                        symbolSize: function (dataItem) {
                            return scale(dataItem[1]);
                        }
                    });
                });

                echarts.util.each(test_data, function (dataItem) {
                    option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
                });

                chart.setOption(option)
            }
        },
        computed: {
            current_canteen() {
                return this.$store.state.current_canteen;
            },
            arrangeDinging() {
                return this.$store.state.arrangeDinging;
            }
        },
        watch:{
            current_canteen:{
                handler(canteen){
                    let title_div = document.getElementById("timeline-title");

                    let chart = this.$echarts.init(title_div);

                    let option = {
                        title: {
                            text: "DINING TIMELINE",
                            subtext:'DINGING TIMELINE OF '+canteen,
                            textStyle: {
                                fontSize: 16
                            }
                        }
                    };
                    chart.setOption(option);

                    if(!this.status)
                        DataManager.get_meal_timeline(canteen).then(res=>{
                            // d3.select('#timeline').html('')
                            this.TimeLine(res.data)
                        })
                    else
                        DataManager.get_meal_timeline_pro(canteen).then(res=>{
                            // d3.select('#timeline').html('')
                            this.TimeLine(res.data)
                        })
                }
            },
            arrangeDinging:{
                handler(status){
                    this.status = status
                }
            }
        }
    }
</script>

<style scoped>

  #timeline-container{
    position: absolute;
    left: 27%;
    bottom: 0;
    width: 46%;
    height: 30%;
    /*background-color: #ffd82f;*/
  }
  #timeline{
    position: absolute;
    left: 1%;
    bottom: 0;
    width: 99%;
    height: 100%;
    /*background-color: #ffd82f;*/
  }

  #rose_pie{
    position: absolute;
    width: 40%;
    height: 100%;
    /*background-color: indianred;*/
  }
  #timeline-title{
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 200px;
    height: 200px;
    z-index: 20;
  }
  #calendar{
    position: absolute;
    top:0;
    left: 40%;
    width: 60%;
    height: 100%;
  }
</style>
