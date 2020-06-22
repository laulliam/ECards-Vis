<template>
  <div id="network">
    <div id="n_tool_title"></div>
    <div id="legend">
      <Tag color="#d0648a">A1</Tag>
      <Tag color="#d07999">A2</Tag>
      <Tag color="#f58db2">A3</Tag>
      <Tag color="#f2b3c9">A4</Tag>
      <Tag color="#f2c4bc">A5</Tag>
      <Tag color="#dcf296">A6</Tag>
      <Tag color="#b8f29c">A7</Tag>
      <Tag color="#7bd9a5">A8</Tag>
    </div>
    <div id="test04"></div>
  </div>
</template>

<script>
    import DataManager from "../../data/DataManager";
    // import cytoscape from 'cytoscape';
    import * as d3 from 'd3'
    export default {
        name: "AppMain",
        mounted() {

            DataManager.get_f4_network_data().then(res=>{
                this.Init(res.data);
            });
            this.Init_Title()
        },
        methods:{
            Init_Title() {

                let chart = this.$echarts.init(document.getElementById('n_tool_title'))

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
            Init(data){

                console.log(data);

                let width = document.getElementById('test04').offsetWidth;
                let height = document.getElementById('test04').offsetHeight;

                let margin = {top: 20, right: 20, bottom: 30, left: 30}

                let zoom = d3.zoom()
                    .scaleExtent([0, 32])
                    .extent([[margin.left, 0], [width - margin.right, height]])
                    // .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
                    .on("zoom", zoomed);

                let svg = d3.select('#test04')
                    .append("svg")
                    // .attr('width',width)
                    // .attr('height',height)
                    .attr("viewBox", [0, 0, width, height])
                    // .attr("viewBox", [-width / 2, -height / 2, width, height])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")


                function zoomed() {
                    svg.attr("transform", "translate(" + 0 + ")scale(" + d3.event.transform.k + ")");
                    // svg.attr("transform", d3.event.transform);
                }

                // let data = {
                //   nodes: [...Array(50).keys()].map(i => ({ id: i })),
                //   links: [...Array(50).keys()]
                //     .filter(id => id)
                //     .map(id => ({
                //       source: id,
                //       target: Math.round(Math.random() * (id-1)),
                //       value:Math.random()*10
                //     }))
                // };

                let simulation = d3.forceSimulation(data.nodes)
                    .force("link", d3.forceLink(data.links).id(d => d.id))
                    .force("charge", d3.forceManyBody().distanceMax(100))
                    .force("collide", d3.forceCollide(10).strength(0.2).iterations(5))
                    .force("center", d3.forceCenter(width / 2, height / 2))

                let link = svg.append("g")
                    .attr("stroke", "#999")
                    .attr("stroke-opacity", 0.2)
                    .selectAll("line")
                    .data(data.links)
                    .join("line")
                    .attr("stroke-width", d => Math.sqrt(d.value));

                let drag = simulation => {

                    function dragstarted(d) {
                        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    }

                    function dragged(d) {
                        d.fx = d3.event.x;
                        d.fy = d3.event.y;
                    }

                    function dragended(d) {
                        if (!d3.event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    }

                    return d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended);
                }

                let node = svg.append("g")
                // .attr("stroke", "#fff")
                // .attr("stroke-width", 1.5)
                    .selectAll("g")
                    .data(data.nodes)
                    .join("g")
                    .attr('transform',(d)=>{
                        return 'translate('+d.x+','+d.y+')'
                    })
                    // .attr("r", 5)
                    // .attr("fill", '#ccc')
                    .call(drag(simulation));

                node.append('circle')
                    .attr("r", 3)
                    .attr("fill", '#ccc')

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
                    // .attr('opacity',.8)
                    // .attr('stroke','#cc2e15')
                    .attr("d", d3.arc()
                        .innerRadius(5)
                        .outerRadius(6)
                        .startAngle(function(d) { return angle(d); })
                        .endAngle(function(d) { return angle(d) + angle.bandwidth() /1.2; })))

                // let arcs = svg.append('g')
                //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                //   .selectAll('path')
                //   .data([1,2])
                //   .enter()
                //   .append("path")
                //   .attr('fill','#ccc')
                //   .attr('stroke','#cc2e15')
                //   .attr("d", d3.arc()
                //     .innerRadius(20)
                //     .outerRadius(25)
                //     .startAngle(function(d) { return angle(d); })
                //     .endAngle(function(d) { return angle(d) + angle.bandwidth() /1.2; }));

                let radius = 20

                simulation.on("tick", () => {
                    // node
                    //   .attr('transform',(d)=>{
                    //     return `translate(${Math.max(radius, Math.min(width - radius, d.x))},
                    //       ${Math.max(radius, Math.min(height - radius, d.y))})`
                    //   })

                    node.attr('transform',d=>{
                        return `translate(${d.x},${d.y})`
                    })

                    link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y)
                        .attr("d", function(d) {
                            let dx = d.target.x - d.source.x,
                                dy = d.target.y - d.source.y,
                                dr = Math.sqrt(dx * dx + dy * dy);
                            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                        })

                    // node
                    //   .attr("cx", d => d.x)
                    //   .attr("cy", d => d.y);


                });

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

                let legend = g => g.append("g")
                    .selectAll("g")
                    .data(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'])
                    .join("g")
                    .attr("transform", (d, i) => `translate(${(i - (8 - 1) / 2) * 30 + 300},10)`)
                    .call(g => g.append("rect")
                        .attr("width", 18)
                        .attr("height", 8)
                        .attr("fill", color)
                    .call(g => g.append("text")
                        .attr("x", 24)
                        .attr("y", 5)
                        .attr("dy", "0.35em")
                        .attr('font-size','10px')
                        .text(d => d)))

                // svg.call(legend)

            }
        }
    }
</script>

<style scoped>
  #network{
    position: absolute;
    right: 0;
    top: 25%;;
    width: 27%;
    height: 45%;
    overflow: hidden;
    /*background-color: #ff8fcb;*/
  }

  #test04{
    position: relative;
    width: 100%;
    height: 100%;
  }

  #n_tool_title{
    position: absolute;
    left: 0;
    width: 300px;
    height: 50px;
    z-index: 20;
    /*background-color: #ccc;*/
  }

  #legend{
    position: absolute;
    left: 200px;
    width: 100%;
    height: 50px;
    /*background-color: #ccc;*/
  }
</style>
