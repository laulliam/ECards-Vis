<template>
  <div id="network">
    <div id="n_tool_title"></div>
    <div id="legend">
      <div class="control">
        <Icon type="ios-loading" color="#d0619b" /><span>Orderliness</span>
        <Tag color="#d0619b" size="default"></Tag>
        <Tag color="rgba(208,97,155,0.88)"></Tag>
        <Tag color="rgba(208,97,155,0.76)"></Tag>
        <Tag color="rgba(208,97,155,0.61)"></Tag>
        <Tag color="rgba(208,97,155,0.38)"></Tag>
      </div>
      <div class="control">
        <Icon type="ios-loading" color="#4ea397"/><span>Diligence</span>
        <Tag color="#4ea397"></Tag>
        <Tag color="rgba(78,163,151,0.91)"></Tag>
        <Tag color="rgba(78,163,151,0.75)"></Tag>
        <Tag color="rgba(78,163,151,0.53)"></Tag>
        <Tag color="rgba(78,163,151,0.26)"></Tag>
      </div>
    </div>
    <div id="network-main"></div>
  </div>
</template>

<script>
    import DataManager from "../../data/DataManager";
    // import cytoscape from 'cytoscape';
    import * as d3 from 'd3'
    export default {
        name: "AppNetwork",
        data(){
            return {
                g:'',
                value:[]
            }
        },
        mounted() {
            // DataManager.get_network_data({
            //     cf_value:[10,18],
            //     cs_value:[2,13]
            // }).then(res=>{
            //     this.Init(res.data);
            // });

            DataManager.get_dept07_graph([5,115]).then(res=>{
                this.Init(res.data)
                // console.log(res.data);
                // d3.selectAll('.ivu-cell-extra').data(['A1',res.data.nodes.length,res.data.links.length]).html(d=>d)
            })
        },
        methods:{
            Init(data){

                d3.selectAll('#control_panel .ivu-cell-extra').data(['A1',data.nodes.length,data.links.length]).html(d=>d)

                let width = document.getElementById('network-main').offsetWidth;
                let height = document.getElementById('network-main').offsetHeight;

                let margin = {top: 25, right: 20, bottom: 30, left: 30}

                let zoom = d3.zoom()
                    .scaleExtent([0, 32])
                    .extent([[margin.left, 0], [width - margin.right, height]])
                    // .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
                    .on("zoom", zoomed);



                let svg = d3.select('#network-main')
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

                let graph_g = svg.append('g')//.call(zoom).call(zoom.transform, d3.zoomIdentity.scale(5,5))

                let path_scale = d3.scaleLinear()
                    .domain([1,115])
                    .range([1,10])

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
                    });

                link.append('title')
                    .text(d=>d.value)

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
                    .attr('id',d=>'node_'+d.id)
                    .attr('transform',(d)=>{
                        return 'translate('+d.x+','+d.y+')'
                    })
                    // .attr("r", 5)
                    // .attr("fill", '#ccc')
                    .call(drag(simulation));

                let angle = d3.scaleBand()
                    .domain([1,2])
                    .range([0, 2 * Math.PI])
                // .align(0)

                let o_scale = d3.scaleLinear()
                    .domain(d3.extent(data.nodes,d=>parseFloat(d.ae)))
                    .range([1,0])

                // node.append('circle')
                //     .attr("r", 5)
                //     // .attr("fill", '#ff3f63')
                //     .attr("fill", '#fff')
                //     .append('title')
                //     .text(d=>{
                //         // return `CardNo:${parseInt(d.id)} - O:${parseFloat(o_scale(parseFloat(d.ae))).toFixed(2)} D:${d.d} AP:${d.score}`
                //         return `CardNo:${parseInt(d.id)} - O:${parseFloat(o_scale(parseFloat(d.ae))).toFixed(2)} D:${d.d} AP:${d.score}`
                //     })

                node.append('circle')
                    .attr("r", 4)
                    .attr('class',d=>'group group'+parseInt(d.class))
                    // .attr("fill", d=>d.class === '3.0'?'#dd5000':'#ddd')
                    .attr("fill", '#ddd')
                    // .attr('opacity',d=>score_scale(parseFloat(d.score)))
                    .attr('opacity',1)
                    .append('title')
                    .text(d=>{
                        return `CardNo:${parseInt(d.id)} - O:${parseFloat(d.ae).toFixed(2)} D:${d.d}`
                    })

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

                        d3.select(`.group${parseInt(d.class)}_o_path`)
                            .transition()
                            .duration(200)
                            .attr("d", d3.arc()
                                .innerRadius(28)
                                .outerRadius(38)
                                .startAngle(Math.PI*1.05)
                                .endAngle(2*Math.PI))

                        d3.select(`.group${parseInt(d.class)}_d_path`)
                            .transition()
                            .duration(200)
                            .attr("d", d3.arc()
                                .innerRadius(28)
                                .outerRadius(38)
                                .startAngle(0)
                                .endAngle(Math.PI*0.95))
                    })
                    .on('mouseout',function(d){
                        d3.select('body').style('cursor','')
                        // d3.select(this).select('circle').transition().duration(200).attr('opacity',0)
                        d3.select(this).selectAll('.o_path')
                            .transition()
                            .duration(200)
                            .attr("d", d3.arc()
                            .innerRadius(5)
                            .outerRadius(7)
                            .startAngle(Math.PI)
                            .endAngle(Math.PI*2))

                        d3.select(this).selectAll('.d_path')
                            .transition()
                            .duration(200)
                            .attr("d", d3.arc()
                            .innerRadius(5)
                            .outerRadius(7)
                            .startAngle(0)
                            .endAngle(Math.PI))


                        link.style('stroke','#999')

                        d3.select(`.group${parseInt(d.class)}_o_path`)
                            .transition()
                            .duration(200)
                            .attr("d", d3.arc()
                                .innerRadius(28)
                                .outerRadius(35)
                                .startAngle(Math.PI*1.05)
                                .endAngle(2*Math.PI))

                        d3.select(`.group${parseInt(d.class)}_d_path`)
                            .transition()
                            .duration(200)
                            .attr("d", d3.arc()
                                .innerRadius(28)
                                .outerRadius(35)
                                .startAngle(0)
                                .endAngle(Math.PI*0.95))
                    })
                    .on('click',(d)=>{

                        let sim_nodes = []

                        d3.selectAll('.out_circle').remove()
                        if(d.id === temp_id){
                            // d3.selectAll('.out_circle').remove()
                            temp_id = ''
                        }
                        else{
                            d3.selectAll('.out_circle').remove()
                            temp_id = d.id;
                            let adj_nodes = []
                            link.each(o=>{
                                if(o.source.id === d.id ){
                                    adj_nodes.push(o.target.id )
                                }
                                if(o.target.id === d.id){
                                    adj_nodes.push( o.source.id)
                                }
                            })

                            // adj_nodes.forEach((s)=>{
                            //     console.log(s);
                            //     d3.select('#node_'+s)
                            //         .append('circle')
                            //         .attr('class','out_circle')
                            //         .attr('r',10)
                            //         .attr('fill','none')
                            //         .attr('stroke','#c51706')
                            //         .attr('stroke-opacity',.6)
                            // })
                            this.$store.commit('adj_nodes',adj_nodes)

                            let circle = d3.select('#node_'+d.id)
                                .append('circle')
                                .attr('class','out_circle')
                                .attr('r',10)
                                .attr('fill','none')
                                .attr('stroke','#432df2')
                                .attr('stroke-opacity',0.7)
                                .attr('stroke-width',4)

                            data.nodes.forEach((node)=>{
                                if(d.id !== node.id)
                                    if(node.d === d.d /*&& Math.abs(score_scale(parseFloat(node.score))-score_scale(parseFloat(d.score))) <= 0.12*/){
                                        // console.log(node);
                                        // let temp = Math.abs(o_scale(parseFloat(node.ae))-o_scale(parseFloat(d.ae)));
                                        // // console.log(temp);
                                        // let circle = d3.select('#node_'+node.id)
                                        //     .append('circle')
                                        //     .attr('class','out_circle')
                                        //     .attr('r',10)
                                        //     .attr('fill','none')
                                        //     .attr('stroke','#c51706')
                                        //     .attr('stroke-opacity',0.8-temp*10)
                                        //     .attr('stroke-width',4)

                                        // console.log(node.ae,'       ',d.ae);

                                        // console.log(node.ae > d.ae?(d.ae/node.ae):(node.ae/d.ae));

                                        sim_nodes.push({
                                            'card_id':node.id,
                                            'O':parseFloat(node.ae).toFixed(3),
                                            'D':node.d,
                                            'S':(node.ae > d.ae?(d.ae/node.ae):(node.ae/d.ae)).toFixed(3)
                                        })

                                        // let run = ()=>{
                                        //     circle.transition()
                                        //         .duration(500)
                                        //         .attr('r',10)
                                        //         .attr('opacity',.5)
                                        //         .transition()
                                        //         .duration(500)
                                        //         .delay(200)
                                        //         .attr('r',7)
                                        //         .attr('opacity',0.8-temp*10)
                                        //         .on('end',run)
                                        // }
                                        // run();
                                    }
                                // if(Math.abs(parseFloat(node.score)-parseFloat(d.score)) <= 0.05){
                                //
                                //     d3.select('#node_'+node.id)
                                //         .append('circle')
                                //         .attr('class','out_circle')
                                //         .attr('r',10)
                                //         .attr('fill','none')
                                //         .attr('stroke','#c51706')
                                //         .attr('stroke-opacity',.6)
                                // }
                            })

                            // console.log(sim_nodes);
                            sim_nodes = sim_nodes.sort((a,b)=>b.S - a.S).slice(0,8)
                            sim_nodes.forEach(s=>{
                                let temp = Math.abs(s.O-o_scale(parseFloat(d.ae)));

                                console.log(s.S);
                                d3.select('#node_'+s.card_id)
                                    .append('circle')
                                    .attr('class','out_circle')
                                    .attr('r',10)
                                    .attr('fill','none')
                                    .attr('stroke','#c51706')
                                    .attr('stroke-opacity',s.S-.3)
                                    .attr('stroke-width',4)
                            })

                            sim_nodes.unshift({
                                'card_id':d.id,
                                'O':parseFloat(d.ae).toFixed(3),
                                'D':d.d
                            })
                            this.$store.commit('sim_nodes',sim_nodes)

                        }
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

                let temp_id = ''

                graph_g.attr('transform','translate(70,80) scale(.67)')

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

                // console.log( d3.select('#df-slider').select('input'));
                // d3.select('#df-slider').select('input').on('mouseover',function () {
                //     console.log(this);
                // });


            }
        },
        computed:{
            cf_value(){
                return this.$store.state.cf_value;
            },
            df_value(){
                return this.$store.state.df_value;
            },
            group(){
                return this.$store.state.group;
            },
        },
        watch:{
            cf_value:{
                handler(cf_value){
                    DataManager.get_dept07_graph(cf_value).then(res=>{
                        d3.select('#network-main').select('svg').remove();
                        this.Init(res.data)
                    })
                }
            },
            df_value:{
                handler(df_value){
                    this.value = df_value
                    // console.log(df_value);
                    DataManager.get_dept07_graph_ap(df_value).then(res=>{
                        d3.select('#network-main').select('svg').remove();
                        this.Init(res.data)
                    })
                }
            },
            // group:{
            //     handler(g,o){
            //         // console.log(g);
            //         if(g === this.g){
            //             d3.selectAll('.group').attr('fill','#ddd')
            //             this.g = ''
            //         }
            //         else{
            //             this.g = g
            //             d3.selectAll('.group'+g).attr('fill','#dd5924')
            //             d3.selectAll('.group'+o).attr('fill','#ddd')
            //         }
            //     }
            // }
        }

    }
</script>

<style scoped>
  #network{
    position: absolute;
    right: 0;
    top: 15.5%;;
    width: 27%;
    height: 54.5%;
    overflow: hidden;
    /*background-color: #ff8fcb;*/
  }

  #network-main{
    position: relative;
    width: 100%;
    height: 100%;
  }

  .control{
    position: relative;
    margin:0 auto;
    float: left;
    padding-left: 2.8%;
    /*margin-top: 1%;*/
    /*background-color: darkred;*/
    width: 45%;
    z-index: 99;
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

  #check_div{
    position: absolute;
    top: 5%;
    /*width: 20%;*/
    left: 2%;
    height: 10%;
    z-index: 100;
    background: transparent;
  }

  #legend{
    position: absolute;
    width: 100%;
    /*background-color: #ccc;*/
  }

</style>
