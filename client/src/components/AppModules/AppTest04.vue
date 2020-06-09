<template>
  <div id="test04"></div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  import cytoscape from 'cytoscape';
  import * as d3 from 'd3'
  export default {
    name: "AppMain",
    mounted() {
      // this.Init()
      DataManager.get_f4_network_data().then(res=>{
        this.Init(res.data);});
      // DataManager.get_f4_network_data().then(res=>{
      //   this.Draw(res.data);
      //   /*        let data ={
      //             nodes:res.data.nodes.map(d=>{
      //               return {
      //                 data:d
      //               }
      //             }),
      //             edges:res.data.links.map(d=>{
      //               return {
      //                 data:{
      //                   source:d.source,
      //                   target:d.target,
      //                   value:d.value
      //                 }
      //               }
      //             })
      //           };
      //           this.Draw(data);*/
      // })
    },
    methods:{
      Init(data){

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
          .call(zoom)


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
          .force("charge", d3.forceManyBody())
          .force("collide", d3.forceCollide(10).strength(0.2).iterations(5))
          .force("center", d3.forceCenter(width / 2, height / 2));

        let link = svg.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
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
          .attr("r", 5)
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
          // .attr('fill','#ccc')
          // .attr('stroke','#cc2e15')
          .attr("d", d3.arc()
            .innerRadius(10)
            .outerRadius(12)
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
            .attr("y2", d => d.target.y);

          // node
          //   .attr("cx", d => d.x)
          //   .attr("cy", d => d.y);


        });

      }


      /*Draw(graph){

        let scale = d3.scaleLinear()
          .domain(d3.extent(graph.nodes,d=>parseInt(d.rank)))
          .range([10,3])

        let chart =this.$echarts.init(document.getElementById('test04'));

        let categories = [];

        graph.nodes.forEach(function (node) {
          node.itemStyle = null;
          node.symbolSize = scale(parseInt(node.rank));
          node.category = 'clique_'+node.clique;
          if(categories.includes('clique_'+node.clique)){}
          else
            categories.push({name:'clique_'+node.clique});
          node.label = {
            normal: {
              show: true
            }
          };
        });

        graph.links.forEach(d=>{
          d.lineStyle = {
            width: d.value
          }
        });
        let option = {
          color: [
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
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          // legend: [{
          //   // selectedMode: 'single',
          //   // show:false,
          //   icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
          //   itemWidth: 10,  // 设置宽度
          //   itemHeight: 10, // 设置高度
          //   data: categories.map(function (a) {
          //     return a.name;
          //   })
          // }],
          // animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
            {
              name: '',
              type: 'graph',
              layout: 'force',
              data: graph.nodes,
              links: graph.links,
              categories: categories,
              roam: true,
              focusNodeAdjacency: true,
              // force: {
              //   repulsion: 100,
              //   // edgeLength: [50, 10]
              // },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              },
              emphasis: {
                lineStyle: {
                  width: 10
                }
              },
              zoom:.3
            }
          ]
        };

        chart.setOption(option);

        chart.on('click',(prams)=>{
          let links = graph.links.filter(d=>d.source === prams.data.id || d.target === prams.data.id)
          let nodes = [];

          links.forEach(d=>{
            if(nodes.findIndex(x=>x.id === d.source) !== -1 ){}
            else{
              nodes.push(graph.nodes[graph.nodes.findIndex(s=>s.id === d.source)])
            }
            if(nodes.findIndex(x=>x.id === d.target) !== -1 ){}
            else{
              nodes.push(graph.nodes[graph.nodes.findIndex(s=>s.id === d.target)])
            }
          });

          this.$store.commit('f4_adjac',{
            nodes:nodes,
            links:links
          })
        })
      }*/
      /*      Draw(data){
              let cy = cytoscape({

                container: document.getElementById('cy') ,// container to render in

                elements: data,

                style: [ {
                  "selector": "core",
                  "style": {
                    "selection-box-color": "#AAD8FF",
                    "selection-box-border-color": "#8BB0D0",
                    "selection-box-opacity": "0.5"
                  }
                }, {
                  "selector": "node",
                  "style": {
                    "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
                    "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
                    "content": "data(name)",
                    "font-size": "12px",
                    "text-valign": "center",
                    "text-halign": "center",
                    "background-color": "#555",
                    "text-outline-color": "#555",
                    "text-outline-width": "2px",
                    "color": "#fff",
                    "overlay-padding": "6px",
                    "z-index": "10"
                  }
                },
                  {
                    "selector": "node[clique = '2']",
                    "style": {
                      "background-color": "#5aaa2b",
                    }
                  }
                ],

                layout: {
                  name: 'cose',
                  idealEdgeLength: 100,
                  nodeOverlap: 20,
                  refresh: 20,
                  fit: true,
                  padding: 30,
                  randomize: false,
                  componentSpacing: 100,
                  nodeRepulsion: 400000,
                  edgeElasticity: 100,
                  nestingFactor: 5,
                  gravity: 80,
                  numIter: 1000,
                  initialTemp: 200,
                  coolingFactor: 0.95,
                  minTemp: 1.0
                },


              });
            }*/
    }
  }
</script>

<style scoped>
  #test04{
    position: absolute;
    right: 0;
    top:0;
    width: 27%;
    height: 45%;
    overflow: hidden;
    /*background-color: #ff8fcb;*/
  }
</style>
