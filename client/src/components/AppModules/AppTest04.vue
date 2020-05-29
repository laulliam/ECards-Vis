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
      DataManager.get_f4_network_data().then(res=>{
        this.Draw(res.data);
        /*        let data ={
                  nodes:res.data.nodes.map(d=>{
                    return {
                      data:d
                    }
                  }),
                  edges:res.data.links.map(d=>{
                    return {
                      data:{
                        source:d.source,
                        target:d.target,
                        value:d.value
                      }
                    }
                  })
                };
                this.Draw(data);*/
      })
    },
    methods:{
      Draw(graph){

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
      }
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
  /*background-color: #ff8fcb;*/
}
</style>
