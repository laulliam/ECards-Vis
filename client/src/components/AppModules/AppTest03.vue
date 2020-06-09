<template>
  <div id="test03"></div>
</template>

<script>
  import * as d3 from 'd3'
  export default {
    name: "AppTest03",
    mounted() {
      this.Init()
    },
    methods:{
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

      }
    }
  }
</script>

<style scoped>
  #test03{
    position: absolute;
    right: 0;
    top:45%;
    width: 27%;
    height: 25%;
    /*background-color: #ff6dd2;*/
  }
</style>
