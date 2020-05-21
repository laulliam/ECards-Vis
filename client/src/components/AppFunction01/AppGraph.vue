<template>
  <div id="graph">
    <div v-for="i in 10" class="test" :id="'graph'+i">
    </div>
  </div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  export default {
    name: "AppGraph",
    data(){
      return {
        color:{
          '第一食堂':"#893448",
          '第二食堂':"#d95850",
          '第三食堂':"#eb8146",
          '第四食堂':"#ffb248",
          '教师食堂':"#f2d643",
          '财务处':"#ebdba4",
          '好利来食品店':"#893448",
          '红太阳超市':"#d95850"
        }
      }
    },
    mounted() {
      DataManager.get_f1_graph_data().then(res=>{
        // console.log(res.data)
        this.Draw(5,res.data[4].data)
        res.data.forEach((d,i) =>{
          this.Draw(i+1,d.data)
        });
      })
    },
    methods:{
      Draw(index,graph){
        let chart = this.$echarts.init(document.getElementById('graph'+index));

        let categories = [
          {name:'第一食堂'},
          {name:'第二食堂'},
          {name:'第三食堂'},
          {name:'第四食堂'},
          {name:'教师食堂'},
          {name:'财务处'},
          {name:'好利来食品店'},
          {name:'红太阳超市'}
        ]
        graph.nodes.forEach(function (node) {
          node.itemStyle = null;
          node.symbolSize = 30*node.value;
          node.category = node.name
        });

        graph.links.forEach(function (link) {
          link.lineStyle = {
            normal: {
              curveness: 0.3,
              width:link.value * 30
            }
          }

        });
        let option = {
          tooltip: {
            confine: true
          },
          "color": [
            "#2ec7c9",
            "#b6a2de",
            "#5ab1ef",
            "#ffb980",
            "#d87a80",
            "#8d98b3",
            "#e5cf0d",
            "#97b552",
            "#95706d"
          ],
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
            {
              name: '',
              type: 'graph',
              layout: 'circular',
              data: graph.nodes,
              links: graph.links,
              categories: categories,
              roam: false,
              focusNodeAdjacency: true,
              label: {
                normal: {
                  position: 'right',
                  formatter: ''
                }
              },
              edgeLabel:{
                formatter:''
              },
              lineStyle: {
                normal: {
                  curveness: 0.3
                }
              },
              zoom:.7
            }
          ]
        };

        chart.setOption(option);

      }
    }
  }
</script>

<style scoped>
  #graph{
    position: absolute;
    right: 0;
    top:30%;
    width: 25%;
    height: 40%;
  }
  .test{
    float: left;
    width:20%;
    height: 50%;
  }

</style>
