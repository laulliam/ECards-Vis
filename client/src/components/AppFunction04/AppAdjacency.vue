<template>
  <div id="adjacency"></div>
</template>

<script>
  export default {
    name: "AppAdjacency",
    mounted() {
      // this.Draw();
    },
    methods:{
      Draw(data){

        let chart =this.$echarts.init(document.getElementById('adjacency'));

        let categories = [];

        data.nodes.forEach(d=>{
          if(categories.findIndex(s => s.clique === d.clique)){}
          else
            categories.push({name:d.clique})
        });

        data.links.forEach(d=>{
          d.lineStyle = {
            width: d.value
          }
        });

        let option = {
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: 'Les Miserables',
              type: 'graph',
              layout: 'circular',
              circular: {
                rotateLabel: true
              },
              data: data.nodes,
              links: data.links,
              categories: categories,
              roam: true,
              label: {
                position: 'right',
                formatter: '{b}'
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              }
            }
          ]
        };

        chart.setOption(option);
      }
    },
    computed:{
      f4_adjac(){
        return this.$store.state.f4_adjac;
      }
    },
    watch:{
      f4_adjac:{
        handler(data){
          this.Draw(data);
          // console.log(data);
        }
      }
    }
  }
</script>

<style scoped>
  #adjacency{
    position: absolute;
    right: 0;
    top:0;
    width: 20%;
    height: 50%;
  }
</style>
