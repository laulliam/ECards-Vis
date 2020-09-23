<template>
  <div id="poverty_portray">
    <div id="cluster_portray_title"></div>
    <div id="portray_main2">
      <div v-for="(i,j) in data " :id="'portray'+i.name" class="sub-portray" :title="'AVG T: ￥'+i.total + '\nAVG CA: ￥'+i.canteen + '\nAVG S: ￥'+i.market+'\nAVG C: '+i.count">
        <div style="z-index: 33;"><Tag :color="color[j]">P{{i.name}}</Tag></div>
        <svg width="64" height="64"  viewBox="0 0 1024 1024" >
<!--          <circle r="300" fill="#ddd" opacity=".4" cx="320" cy="320"></circle>-->
          <path d="M548.1 455.7h-72l-36 39.8 36 39.9h72l36-39.9z" fill="#d4237a" p-id="5385" data-spm-anchor-id="a313x.7781069.0.i18" :opacity="i.count / 120" class="selected"></path>
          <path d="M551.7 543.4h-79.1l-43.2-47.9 43.2-47.9h79.1l43.2 47.9-43.2 47.9z m-72-16h64.9l28.8-31.9-28.8-31.9h-64.9l-28.8 31.9 28.8 31.9z" fill="#0A0408" p-id="5386"></path> <!--tie head-->

          <path d="M512.1 911.2l-111.3-120 67.1-263.8h88.5l67.1 263.8-111.4 120z m-93.7-124.6l93.7 101 93.7-101-61.9-243.4h-63.6l-61.9 243.4z" fill="#0A0408"></path> <!--tie-->
          <path d="M512.1 843.5l72.4-78L539 586.6h-53.7l-45.5 178.9z" fill="#d4237a" p-id="5389" data-spm-anchor-id="a313x.7781069.0.i15" :opacity="i.count / 120"></path><!--tie-->
          <path d="M512.1 899.4l102.5-110.5-64.4-253.6h-76.1l-64.5 253.6z" fill="#d4237a" :opacity="i.count / 120"></path> <!--tie-->
          <path d="M512.1 240.3m-167.3 0a167.3 167.3 0 1 0 334.6 0 167.3 167.3 0 1 0-334.6 0Z" fill="#d0648a" :opacity="i.total/500" :title="'AVG TOTAL:'+i.total"></path> <!--head-->

          <path d="M512.1 415.5c-96.6 0-175.3-78.6-175.3-175.3S415.5 65 512.1 65c96.6 0 175.3 78.6 175.3 175.3s-78.6 175.2-175.3 175.2z m0-334.5c-87.8 0-159.3 71.4-159.3 159.3s71.4 159.3 159.3 159.3c87.8 0 159.3-71.4 159.3-159.3S599.9 81 512.1 81z" fill="#0A0408" p-id="5391"></path> <!--head stroke-->
          <path d="M880.3 950H143.9V645.6c0-61.2 116.2-144.2 177.4-144.2L512 774.7l190.7-273.3c61.2 0 177.4 82.9 177.4 144.2V950z" fill="#fff" p-id="5392" data-spm-anchor-id="a313x.7781069.0.i22" class=""></path> <!--coat-->
          <path d="M888.3 958H135.9V645.6c0-43.4 48.2-85.4 68.9-101.4 39.9-30.9 85.7-50.8 116.6-50.8h4.2l186.6 267.3 186.6-267.3h4.2c30.9 0 76.7 19.9 116.6 50.8 20.7 16 68.9 57.9 68.9 101.4V958z m-736.4-16h720.4V645.6c0-25.2-23.4-58.4-62.6-88.7-35.5-27.4-75.2-45.6-102.7-47.3L512.1 788.8 317.3 509.6c-27.5 1.7-67.2 19.9-102.7 47.3-39.2 30.3-62.6 63.5-62.6 88.7V942z" fill="#0A0408" p-id="5393"></path><!--coat1-->

          <path d="M441.2 896.3H209.6V704.8c0-38.5 31.2-90.7 69.8-90.7h45.3l116.6 172v110.2z" fill="#22c3aa" :opacity="i.canteen/i.total" :title="'AVG CANTEEN:'+i.canteen"></path> <!--left-->
          <path d="M574.6 896.3h231.7V704.8c0-38.5-31.2-90.7-69.8-90.7h-45.3L574.6 786v110.3z" fill="#1296db" :opacity="i.market / 100" :title="'AVG SUPERMARKET:'+i.market"></path> <!--right-->

          <path d="M520.1 930.4h-16v-15.2h16v15.2z m0-31.2h-16v-16h16v16z m0-32h-16v-16h16v16z m0-32h-16v-16h16v16z m0-32h-16v-16h16v16z m0-32h-16v-16h16v16z" fill="#0A0408" p-id="5395"></path>
        </svg>
      </div>
    </div>
    <div id="attr_filter" >
      <div class="filter-slider">
        <div style="position: absolute;left:-43px;top:8px;font-size: 12px;border-bottom: 3px solid #d0648a;" title="Average monthly total consumption">AVG T</div>
        <Slider v-model="range.total" :max="max[0]" :tip-format="format" @on-change="change1" range></Slider>
      </div>
      <div class="filter-slider">
        <div style="position: absolute;left:-43px;top:8px;font-size: 12px;border-bottom: 3px solid #22c3aa;" title="Average monthly canteen consumption">AVG Ca</div>
        <Slider v-model="range.canteen" :max="max[1]" :tip-format="format" @on-change="change2" range></Slider>
      </div>
      <div class="filter-slider">
        <div style="position: absolute;left:-43px;top:8px;font-size: 12px;border-bottom: 3px solid #1296db; " title="Average monthly supermarket consumption">AVG S</div>
        <Slider v-model="range.market" :max="max[2]" :tip-format="format" @on-change="change3" range></Slider>
      </div>
      <div class="filter-slider">
        <div style="position: absolute;left:-43px;top:8px;font-size: 12px;border-bottom: 3px solid #d4237a;" title="Average monthly consumption times">AVG C</div>
        <Slider v-model="range.count" :max="max[3]" :tip-format="format1" @on-change="change4" range></Slider>
      </div>
    </div>
    <!--      <div id="attr_filter_title"></div>-->
  </div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: "AppParallel",
        data(){
            return{
                range:{
                    total:[0,600],
                    canteen:[0,500],
                    market:[0,100],
                    count:[1,120],
                },
                color:[
                    "#19CAAD",
                    "#8CC7B5",
                    "#A0EEE1",
                    "#BEE7E9",
                    "#BEEDC7",
                    "#D6D5B7",
                    "#D1BA74",
                    "#E6CEAC",
                    "#ECAD9E",
                    "#F4606C"
                ],
                max:[600,500,100,120],
                data:[{
                    name:'0', total:268.90, canteen:237.43, market:27.82, charge:268.5,'count':76}, {
                    name:'1', total:141.22, canteen:123.40, market:16.85, charge:93.0 ,'count':37}, {
                    name:'2', total:189.59, canteen:178.09, market:9.537, charge:180.9,'count':56}, {
                    name:'3', total:345.17, canteen:309.70, market:32.04, charge:356.5,'count':89.}, {
                    name:'4', total:232.64, canteen:192.98, market:37.60, charge:181.2,'count':57.}, {
                    name:'5', total:448.15, canteen:394.24, market:47.94, charge:469.8,'count':109}, {
                    name:'6', total:458.86, canteen:246.90, market:31.99, charge:452.3,'count':75}, {
                    name:'7', total:196.88, canteen:148.42, market:46.44, charge:183.3,'count':52}, {
                    name:'8', total:472.67, canteen:404.02, market:55.65, charge:490.2,'count':116}, {
                    name:'9', total:352.94, canteen:309.92, market:37.87, charge:358.7,'count':95}]
            }
        },
        mounted() {
            // this.Init()
            this.Init_Title();
        },
        methods:{

            Init_Title() {

                let chart = this.$echarts.init(document.getElementById('cluster_portray_title'))

                let option = {
                    title: {
                        text: 'CONSUMPTION PROFILE',
                        textStyle: {
                            fontSize: 16
                        }
                    },
                }

                chart.setOption(option)
            },
            Init_(){
                let charts = [...Array(10)].map((d,i)=>this.$echarts.init(document.getElementById('sub_portray'+i)))
                let dashedPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC';
                let color = ['#FF8700', '#ffc300', '#00e473', '#009DFF'];
                let chartData = [{
                    name: "本科及以上",
                    value: 10,
                    unit: '元'
                },
                    {
                        name: "高中",
                        value: 10,
                        unit: '元'
                    },
                    {
                        name: "初中及以下",
                        value: 10,
                        unit: '元'
                    },
                    {
                        name: "其他",
                        value: 10,
                        unit: '元'
                    }
                ];

                // let arrName = [];
                // let arrValue = [];
                let sum = 0;
                let pieSeries = [],
                    lineYAxis = [];

// 数据处理
                chartData.forEach((v, i) => {
                    // arrName.push(v.name);
                    // arrValue.push(v.value);
                    sum = sum + v.value;
                })

// 图表option整理
                chartData.forEach((v, i) => {
                    pieSeries.push({
                        name: '学历',
                        type: 'pie',
                        clockWise: false,
                        hoverAnimation: false,
                        radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
                        center: ["50%", "50%"],
                        label: {
                            show: false
                        },
                        data: [{
                            value: v.value,
                            name: v.name
                        }, {
                            value: sum - v.value,
                            name: '',
                            itemStyle: {
                                color: "rgba(0,0,0,0)"
                            }
                        }]
                    });
                    pieSeries.push({
                        name: '',
                        type: 'pie',
                        silent: true,
                        z: 1,
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [65 - i * 15 + '%',57 - i * 15 + '%'],
                        center: ["50%", "50%"],
                        label: {
                            show: false
                        },
                        data: [{
                            value: 7.5,
                            itemStyle: {
                                color: "#E3F0FF"
                            }
                        }, {
                            value: 2.5,
                            name: '',
                            itemStyle: {
                                color: "rgba(0,0,0,0)"
                            }
                        }]
                    });
                    v.percent = (v.value / sum * 100).toFixed(1) + "%";
                    lineYAxis.push({
                        value: i,
                        textStyle: {
                            rich: {
                                circle: {
                                    color: color[i],
                                    padding: [0, 5]
                                }
                            }
                        }
                    });
                })

                let option = {
                    backgroundColor: '#fff',
                    color: color,
                    grid: {
                        top: '15%',
                        bottom: '54%',
                        left: "30%",
                        containLabel: false
                    },
                    yAxis: [{
                        type: 'category',
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            formatter: function(params) {
                                let item = chartData[params];
                                console.log(item)
                                return '{line|}{circle|●}{name|'+ item.name +'}{bd||}{percent|'+item.percent+'}{value|'+ item.value+'}{unit|元}'
                            },
                            interval: 0,
                            inside: true,
                            textStyle: {
                                color: "#333",
                                fontSize: 14,
                                rich: {
                                    line: {
                                        width: 170,
                                        height: 10,
                                        backgroundColor: {image: dashedPic}
                                    },
                                    name: {
                                        color: '#666',
                                        fontSize: 14,
                                    },
                                    bd: {
                                        color: '#ccc',
                                        padding: [0, 5],
                                        fontSize: 14,
                                    },
                                    percent:{
                                        color: '#333',
                                        fontSize: 14,
                                    },
                                    value: {
                                        color: '#333',
                                        fontSize: 16,
                                        fontWeight: 500,
                                        padding: [0, 0, 0, 20]
                                    },
                                    unit: {
                                        fontSize: 14
                                    }
                                }
                            },
                            show: false
                        },
                        data: lineYAxis
                    }],
                    xAxis: [{
                        show: false
                    }],
                    series: pieSeries
                };

                charts.forEach(d=>d.setOption(option))
            },
            Init(){
                let portray_chart = {};
                portray_chart.width =  document.getElementById('portray_main2').offsetWidth -20;
                portray_chart.height = document.getElementById('portray_main2').offsetHeight;

                portray_chart.svg = d3.select('#portray_main2').append('svg')
                    .attr('width',portray_chart.width)
                    .attr('height',portray_chart.height)
                // .attr("viewBox", [-portray_chart.width / 2, -portray_chart.height / 2, portray_chart.width, portray_chart.height]);

                portray_chart.g = portray_chart.svg.selectAll('g')
                    .data(this.data)
                    .enter()
                    .append('g')
                    // .join('g')
                    .attr('transform',(d,i)=>{
                        return i<5?(`translate(${(i+.7)*portray_chart.width/5.5},50)`):(`translate(${(i-4.3)*portray_chart.width/5.5},${portray_chart.height/2+40})`)
                    })
                // .data(d=>[d])

                // portray_chart.g.append('rect')
                //     .attr('fill','none')
                //     // .attr('r',20)
                //     .attr('width',portray_chart.width/5)
                //     .attr('height',portray_chart.height/2)
                //     .attr('stroke','#ddd')

                portray_chart.g.append('circle')
                    .attr('fill','none')
                    .attr('r',20)
                    // .attr('cx',portray_chart.width/10)
                    // .attr('cy',portray_chart.height/4)
                    .attr('stroke','#ddd')

                portray_chart.g.append('circle')
                    .attr('fill','#ddd')
                    .attr('opacity',.1)
                    .attr('r',40)
                    // .attr('cx',portray_chart.width/10)
                    // .attr('cy',portray_chart.height/4)
                    .attr('stroke','#ddd')

                portray_chart.g.append('path')
                    .attr('fill','#ddd')
                    .attr("d", d3.arc()
                        .innerRadius(22)
                        .outerRadius(28)
                        .startAngle(Math.PI)
                        .endAngle(600*1.95*Math.PI))

                // portray_chart.g
                //     .append('path')
                //     .attr('fill','#1a9950')
                //     .attr("d", d3.arc()
                //         .innerRadius(22)
                //         .outerRadius(28)
                //         .startAngle(Math.PI)
                //         .endAngle((100*50/600*1.95) *Math.PI))


                portray_chart.g.append('path')
                    .attr('fill','#ddd')
                    .attr("d", d3.arc()
                        .innerRadius(22)
                        .outerRadius(28)
                        .startAngle(0.05*Math.PI)
                        .endAngle(Math.PI))

                portray_chart.g.append('path')
                    .attr('fill','#dd5924')
                    .attr('opacity',.6)
                    .attr("d", d3.arc()
                        .innerRadius(22)
                        .outerRadius(28)
                        .startAngle((0.05+400/600)*Math.PI)
                        .endAngle(Math.PI))

            },
            format (val) {
                return '￥' + val;

            },
            format1 (val) {
                return val + ' Times';
            },
            change1(value){
                this.data.forEach(d=>{
                    if(
                        (d.total>=value[0]&&d.total<=value[1])&&
                        (d.canteen >=this.range.canteen[0]&&d.canteen <=this.range.canteen[1])&&
                        (d.market >=this.range.market[0]&&d.market <=this.range.market[1])&&
                        (d.count >=this.range.count[0]&&d.count <=this.range.count[1])
                    ){
                        d3.select('#portray'+d.name).transition().duration(220).style('opacity',1)
                    }
                    else{
                        d3.select('#portray'+d.name).transition().duration(220).style('opacity',.4)
                    }
                })
            },
            change2(value){
                this.data.forEach(d=>{
                    if(
                        (d.canteen>=value[0]&&d.canteen<=value[1])&&
                        (d.total >=this.range.total[0]&&d.total <=this.range.total[1])&&
                        (d.market >=this.range.market[0]&&d.market <=this.range.market[1])&&
                        (d.count >=this.range.count[0]&&d.count <=this.range.count[1])
                    ){
                        d3.select('#portray'+d.name).transition().duration(220).attr('opacity',1)
                    }
                    else{
                        d3.select('#portray'+d.name).transition().duration(220).attr('opacity',.4)
                    }
                })
            },
            change3(value){
                this.data.forEach(d=>{
                    if(
                        (d.market>=value[0]&&d.market<=value[1])&&
                        (d.canteen >=this.range.canteen[0]&&d.canteen <=this.range.canteen[1])&&
                        (d.total >=this.range.total[0]&&d.market <=this.range.total[1])&&
                        (d.count >=this.range.count[0]&&d.count <=this.range.count[1])
                    ){
                        d3.select('#portray'+d.name).transition().duration(220).attr('opacity',1)
                    }
                    else{
                        d3.select('#portray'+d.name).transition().duration(220).attr('opacity',.4)
                    }
                })
            },
            change4(value){
                this.data.forEach(d=>{
                    if(
                        (d.count>=value[0]&&d.count<=value[1])&&
                        (d.canteen >=this.range.canteen[0]&&d.canteen <=this.range.canteen[1])&&
                        (d.market >=this.range.market[0]&&d.market <=this.range.market[1])&&
                        (d.total >=this.range.total[0]&&d.total <=this.range.total[1])
                    ){
                        d3.select('#portray'+d.name).transition().duration(220).attr('opacity',1)
                    }
                    else{
                        d3.select('#portray'+d.name).transition().duration(220).attr('opacity',.4)
                    }
                })
            }
        }
    }
</script>


<style scoped>
  #poverty_portray{
    position: absolute;
    left: 0;
    top:37%;
    width: 27%;
    height: 33%;
    /*background-color: #cb6d89;*/
  }

  #attr_filter{
    bottom:0;
    position: absolute;
    float: left;
    width: 100%;
    height: 30%;
    /*background-color: #cccccc;*/
  }

  #cluster_portray_title{
    position: absolute;
    width: 100%;
    height: 20px;
  }

  .filter-slider{
    position: relative;
    float: left;
    left:10%;
    width: 45%;
    height: 50%;
    margin-left: 5px;
    /*background-color: #f77d8c;*/
  }

  #portray_main2{
    position: absolute;
    top: 10%;
    left: 3%;
    height: 60%;
    width: 100%;
    /*height: 60px;*/
    /*background-color: #cccccc;*/
  }

  .sub-portray{
    position: relative;
    float: left;
    width: 19%;
    height: 50%;
    margin: 1px;
    /*background-color: #ccc;*/
  }
</style>
