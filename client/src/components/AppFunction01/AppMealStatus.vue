<template>
  <div id="meal_info">
    <div v-for="i in 10" class="test" :id="'cluster'+i">
    </div>
  </div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  export default {
    name: "AppMealStatus",
    data(){
      return{
        color:[
          "#4ea397",
          "#22c3aa",
          "#7bd9a5",
          "#d0648a",
          "#f58db2",
          "#f2b3c9"
        ],
      }
    },
    mounted() {
      DataManager.get_f1_mealRate_data().then(res=>{
        res.data.forEach(d=>{
          this.Draw(parseInt(d.label)+1,d.data)
        })
      })
      // this.Draw('cluster1')
      // this.Draw('cluster2')
      // this.Draw('cluster3')
      // this.Draw('cluster4')
      // this.Draw('cluster5')
      // this.Draw('cluster6')
      // this.Draw('cluster7')
      // this.Draw('cluster8')
      // this.Draw('cluster9')
      // this.Draw('cluster10')
    },
    methods:{
      Draw(index,data){
        let chart = this.$echarts.init(document.getElementById('cluster'+index));
        let option = {
          // backgroundColor: '#161627',
          tooltip: {
            trigger: 'axis',
            show:true
          },
          legend: {
            data: ['Breakfast','Lunch', 'Supper'],
            textStyle:{
              color:'#FEFFFE',
              fontSize:20
            }
          },
          radar: {
            indicator: [
              {name: 'Breakfast', max: .8},
              {name: 'Lunch', max: .8},
              {name: 'Supper', max: .8},

            ],
            shape: 'circle',
            splitNumber: 4,
            name: {
              textStyle: {
                color: '#ffffff',
                fontSize:16
              }
            },
            splitLine: {
              lineStyle: {
                color: [
                  '#ccc', '#ccc',
                  '#ccc', '#ccc',
                  '#ccc', '#ccc',
                ].reverse(),
                width:.3
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#ccc',
                width:.4
              }
            }
          },
          series:[{
            name: 'Dining rate',
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            data: [data],
            symbol: 'circle',
            symbolSize:5,
            itemStyle: {
              normal: {
                color:this.color[index%5],
                borderColor:this.color[index%5],
                opacity:.2,
                borderWidth:5,
              }
            },
            areaStyle: {
              normal: {
                color:this.color[index%5],
                opacity:.3
              }
            },
            lineStyle:{
              color:this.color[index%5],
              width:1
            },
          }],
        };

        chart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #meal_info{
    position: absolute;
    right: 0;
    top:0;
    width: 25%;
    height: 30%;
  }
  .test{
    float: left;
    width:20%;
    height: 50%;
  }
</style>
