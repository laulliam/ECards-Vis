<template>
  <div id="test05"></div>
</template>

<script>
  import * as d3 from 'd3'
  export default {
    name: "AppTest05",
    mounted() {
      this.Init()
    },
    methods:{
      Init(){
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
      },
      Init1(){
        let width = document.getElementById('test05').offsetWidth;
        let height = document.getElementById('test05').offsetHeight;

        let data = {
          name:'root',
          children:[
            {name:'c1',children: []},
            {name:'c2',children: []},
            {name:'c3',children: []},
            {name:'c3',children: []},
          ]
        }

        let tree = data => {
          let root = d3.hierarchy(data);
          root.dx = height / 5;
          root.dy = width / (root.height + 8);
          return d3.tree().nodeSize([root.dx, root.dy])(root);
        }

        let root = tree(data)

        let x0 = Infinity;
        let x1 = -x0;

        root.each(d => {
          if (d.x > x1) x1 = d.x;
          if (d.x < x0) x0 = d.x;
        });

        let svg = d3.select('#test05')
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
          .attr("stroke-width", 1.5)
          .selectAll("path")
          .data(root.links())
          .join("path")
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
          .attr("fill", d => d.children ? "#555" : "#999")
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
            .innerRadius(10)
            .outerRadius(12)
            .startAngle(function(d) { return angle(d); })
            .endAngle(function(d) { return angle(d) + angle.bandwidth() /1.2; })))

        let x = d3.scaleBand()
          .range([0, width/6])
          .domain(new Array(30).fill(0).map((d, i) => i + 1))
        // .padding(0.01);

        node.call(g=>g.append("g")
          .attr("transform", function(d,i){
            if(d.children)
              d3.select(this).style('display','none');
            return "translate("+ d.dx +"," + d.dy+ ")"
          })
          .selectAll('.point')
          .data([...Array(30)].fill(0).map((d,i)=>i+1))
          .enter()
          .append('circle')
          .attr('r',1)
          .attr('cx',d=>x(d)+20)
          .attr('cy',0))
          // .call(d3.axisBottom(x)))



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
    /*background-color: #ffb8e1;*/
  }
</style>
