<template>
  <div id="network">
    <div id="n_tool_title"></div>
    <div id="legend">
          <div class="control">
            <span>Orderliness</span>
            <Tag color="#d0619b"></Tag>
            <Tag color="rgba(208,97,155,0.88)"></Tag>
            <Tag color="rgba(208,97,155,0.76)"></Tag>
            <Tag color="rgba(208,97,155,0.61)"></Tag>
            <Tag color="rgba(208,97,155,0.38)"></Tag>
          </div>
          <div class="control">
            <span>Diligence</span>
            <Tag color="#4ea397"></Tag>
            <Tag color="rgba(78,163,151,0.91)"></Tag>
            <Tag color="rgba(78,163,151,0.75)"></Tag>
            <Tag color="rgba(78,163,151,0.53)"></Tag>
            <Tag color="rgba(78,163,151,0.26)"></Tag>
          </div>
    </div>
    <div id="test04"></div>
  </div>
</template>

<script>
    import DataManager from "../../data/DataManager";
    // import cytoscape from 'cytoscape';
    import * as d3 from 'd3'
    export default {
        name: "AppNetwork",
        mounted() {

            // DataManager.get_network_data({
            //     cf_value:[10,18],
            //     cs_value:[2,13]
            // }).then(res=>{
            //     this.Init(res.data);
            // });

            DataManager.get_dept07_graph().then(res=>{
                this.Init(res.data)
            })
        },
        methods:{
            Init(data){

                let width = document.getElementById('test04').offsetWidth;
                let height = document.getElementById('test04').offsetHeight;

                let margin = {top: 25, right: 20, bottom: 30, left: 30}

                let zoom = d3.zoom()
                    .scaleExtent([0, 32])
                    .extent([[margin.left, 0], [width - margin.right, height]])
                    // .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
                    .on("zoom", zoomed);

                let svg = d3.select('#test04')
                    .append("svg")
                    // .attr('width',width)
                    // .attr('height',height)
                    .attr("viewBox", [0, 0, width, height-margin.top])
                    // .attr("viewBox", [-width / 2, -height / 2, width, height])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr('transform','translate(0,'+margin.top+')')
                    .call(zoom)


                function zoomed() {
                    // graph_g.attr("transform", "translate(" + 0 + ")scale(" + d3.event.transform.k + ")");
                    graph_g.attr("transform", d3.event.transform);
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
                    .force("link", d3.forceLink(data.links).id(d => d.id).distance(0).strength(1))
                    .force("charge", d3.forceManyBody())
                    .force("collide", d3.forceCollide(20).strength(0.2).iterations(5))
                    .force("center", d3.forceCenter(width / 2, height / 2))
                    .force("x", d3.forceX())
                    .force("y", d3.forceY());

                let graph_g = svg.append('g')

                let path_scale = d3.scaleLinear()
                    .domain(d3.extent(data.links,d=>d.value))
                    .range([1,18])

                let link = graph_g.append("g")
                    .attr("stroke", "#999")
                    .attr("stroke-opacity", 0.6)
                    .selectAll("line")
                    .data(data.links)
                    .join("line")
                    .attr("stroke-width", d => path_scale(d.value))
                    .on('mouseover',function (d) {
                        d3.select('body').style('cursor','pointer')

                        d3.select(this).style("stroke", "#cb6d89")
                    })
                    .on('mouseout',function (d) {
                        d3.select('body').style('cursor','')
                        d3.select(this).style("stroke", "#999")
                    })
               ;

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

                let score_scale = d3.scaleLinear()
                    .domain([0,1])
                    .range([.7,0])

                let node = graph_g.append("g")
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
                    .attr("r", 4)
                    .attr("fill", '#ff3f63')
                    .attr('opacity',d=>score_scale(parseFloat(d.score)))
                    .append('title')
                    .text(d=>{
                        return `CardNo:${parseInt(d.id)} - O:${parseFloat(d.ae).toFixed(3)} D:${d.d} Rank:${d.score}`
                    })

                let angle = d3.scaleBand()
                    .domain([1,2])
                    .range([0, 2 * Math.PI])
                // .align(0)

                let o_scale = d3.scaleOrdinal()
                    .domain(d3.extent(data.nodes,d=>parseFloat(d.ae)))
                    .range([1,.2])

                let d_scale = d3.scaleLinear()
                    .domain(['0', '1', '2', '3', '4'])
                    .range([
                        "rgba(78,163,151,1)",
                        "rgba(78,163,151,0.91)",
                        "rgba(78,163,151,0.75)",
                        "rgba(78,163,151,0.53)",
                        "rgba(78,163,151,0.26)"].reverse())

                node.append('path')
                    .attr('class','d_path')
                    .attr('fill',d=>d.d !== null?d_scale(d.d):'#999')
                    .attr("d", d3.arc()
                        .innerRadius(5)
                        .outerRadius(7)
                        .startAngle(0)
                        .endAngle(Math.PI))


                node.append('path')
                    .attr('fill',d=>d.ae?'#d0648a':'#999')
                    .attr('class','o_path')
                    .attr('opacity',d=>o_scale(parseFloat(d.ae)))
                    .attr("d", d3.arc()
                        .innerRadius(5)
                        .outerRadius(7)
                        .startAngle(Math.PI)
                        .endAngle(Math.PI*2))

                node
                    .on('mouseover',function(d){
                        d3.select('body').style('cursor','pointer')
                        // d3.select(this).select('circle').transition().duration(200).attr('opacity',1)
                        d3.select(this).selectAll('.o_path').attr("d", d3.arc()
                            .innerRadius(5)
                            .outerRadius(10)
                            .startAngle(Math.PI)
                            .endAngle(Math.PI*2))

                        d3.select(this).selectAll('.d_path').attr("d", d3.arc()
                            .innerRadius(5)
                            .outerRadius(10)
                            .startAngle(0)
                            .endAngle(Math.PI))


                        link.style('stroke',(o)=>{
                            return (o.source.id === d.id || o.target.id === d.id) ? '#9d436a':'#999'
                        })
                    })
                    .on('mouseout',function(){
                        d3.select('body').style('cursor','')
                        // d3.select(this).select('circle').transition().duration(200).attr('opacity',0)
                        d3.select(this).selectAll('.o_path').attr("d", d3.arc()
                            .innerRadius(5)
                            .outerRadius(7)
                            .startAngle(Math.PI)
                            .endAngle(Math.PI*2))

                        d3.select(this).selectAll('.d_path').attr("d", d3.arc()
                            .innerRadius(5)
                            .outerRadius(7)
                            .startAngle(0)
                            .endAngle(Math.PI))


                        link.style('stroke','#999')
                    })
                    .on('click',(d)=>{
                        let adj_nodes = [parseInt(d.id)]
                        data.links.forEach(o=>{
                            if(o.source.id === d.id || o.target.id === d.id){
                                adj_nodes.push(o.source.id | o.target.id)
                            }
                        })
                        this.$store.commit('adj_nodes',adj_nodes)
                    })

                // node.call(g=>g.append('g').selectAll('.path')
                //     .data([1,2])
                //     .enter()
                //     .append("path")
                //     .attr('class','path')
                //     .attr('fill',(d,i)=>[
                //         d_scale(d.d),
                //         o_scale(parseFloat(d.o))
                //     ][i])
                //     // .attr('opacity',.8)
                //     // .attr('stroke','#cc2e15')
                //     .attr("d", d3.arc()
                //         .innerRadius(5)
                //         .outerRadius(6)
                //         .startAngle(function(d) { return angle(d); })
                //         .endAngle(function(d) { return angle(d) + angle.bandwidth() /1.2; })))

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

                // let legend = g => g.append("g")
                //     .selectAll("g")
                //     .data(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'])
                //     .join("g")
                //     .attr("transform", (d, i) => `translate(${(i - (8 - 1) / 2) * 30 + 300},10)`)
                //     .call(g => g.append("rect")
                //         .attr("width", 18)
                //         .attr("height", 8)
                //         .attr("fill", color)
                //     .call(g => g.append("text")
                //         .attr("x", 24)
                //         .attr("y", 5)
                //         .attr("dy", "0.35em")
                //         .attr('font-size','10px')
                //         .text(d => d)))

                // svg.call(legend)

            }
        },
        computed:{
            all_value(){
                return this.$store.state.all_value;
            },
        },
        watch:{
            all_value:{
                handler(all_value){
                    DataManager.get_network_data(all_value).then(res=>{
                        d3.select('#test04').select('svg').remove();
                        this.Init(res.data)
                    })
                }
            }
        }

    }
</script>

<style scoped>
  #network{
    position: absolute;
    right: 0;
    top: 17%;;
    width: 27%;
    height: 53%;
    overflow: hidden;
    /*background-color: #ff8fcb;*/
  }

  #test04{
    position: relative;
    width: 100%;
    height: 100%;
  }

  .control{
    position: relative;
    margin:0 auto;
    float: left;
    /*padding-left: 6%;*/
    /*margin-top: 1%;*/
    /*background-color: darkred;*/
    width: 50%;
  }

  .control span{
    margin: 5px;
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
    width: 100%;
    /*background-color: #ccc;*/
  }
</style>
