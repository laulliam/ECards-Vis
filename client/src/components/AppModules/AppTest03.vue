<template>
  <div id="test03">
    <div class="control">
      &nbsp;Frequent relationship
      <Slider v-model="value1" range></Slider>
    </div>
    <div class="control">
      &nbsp;Clustering coefficient
      <Slider v-model="value2" range></Slider>
    </div>
    <div class="control">
      &nbsp;Degree centrality
      <Slider v-model="value3" range></Slider>
    </div>
    <div class="control">
      &nbsp;Betweenness centrality
      <Slider v-model="value4" range></Slider>
    </div>
    <div class="control">
      Orderliness
      <Tag color="#fff"></Tag>
      <Tag color="#d0619b"></Tag>
      <Tag color="rgba(208,97,155,0.88)"></Tag>
      <Tag color="rgba(208,97,155,0.76)"></Tag>
      <Tag color="rgba(208,97,155,0.61)"></Tag>
      <Tag color="rgba(208,97,155,0.38)"></Tag>
    </div>
    <div class="control">
      Diligence
      <Tag color="#fff"></Tag>
      <Tag color="#4ea397"></Tag>
      <Tag color="rgba(78,163,151,0.91)"></Tag>
      <Tag color="rgba(78,163,151,0.75)"></Tag>
      <Tag color="rgba(78,163,151,0.53)"></Tag>
      <Tag color="rgba(78,163,151,0.26)"></Tag>
    </div>

    <div id="c_tool_title"></div>
  </div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: "AppTest03",
        data(){
            return {
                value1:[20,50],
                value2:[0,30],
                value3:[15,40],
                value4:[0,10]
            }
        },
        mounted() {
            this.Init_Title()
        },
        methods:{
            Init_Title() {

                let chart = this.$echarts.init(document.getElementById('c_tool_title'))

                let option = {
                    title: {
                        text: 'CONTROL PANEL',
                        textStyle: {
                            fontSize: 16
                        }
                    },
                }

                chart.setOption(option)
            },
            Init(){
                let width = document.getElementById('test03').offsetWidth;
                let height = document.getElementById('test03').offsetHeight;

                let margin = {top: 10, right: 20, bottom: 10, left:20};
                width = width - margin.left - margin.right;
                height = height - margin.top - margin.bottom;

                let svg = d3.select('#test03')
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    // .attr("viewBox", [-width / 2, -height / 2, width, height])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round");

                let x = d3.scaleBand()
                    .range([0, width])
                    .domain(new Array(30).fill(0).map((d, i) => i + 1))
                // .padding(0.01);

                svg.append("g")
                    .attr("transform", "translate("+margin.left+"," + height + ")")
                    .call(d3.axisBottom(x));

                svg.append('g')
                    .attr("transform", "translate("+margin.left+"," + height + ")")
                    .selectAll('.point')
                    .data([1,3,7])
                    .enter()
                    .append('circle')
                    .attr('r',2)
                    .attr('cx',d=>x(d)+7)
                    .attr('cy',5)
            },
        }
    }
</script>

<style scoped>
  #test03{
    position: absolute;
    right: 0;
    top:0;
    width: 27%;
    height: 25%;
    /*background-color: #3eff3e;*/
  }
  #test03 .control{
    position: relative;
    top:20%;
    margin:0 auto;
    /*margin-bottom: 1%;*/
    /*margin-top: 1%;*/
    float: left;
    width:50%;
    height: 25%;
    /*background-color: darkred;*/
  }

  #c_tool_title{
    position: absolute;
    width: 100%;
    height: 40px;
    /*background-color: royalblue;*/
  }
</style>
