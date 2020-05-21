<template>
  <div id="occur"></div>
</template>

<script>
  export default {
    name: "AppOccur",
    mounted() {
      this.Draw();
    },
    methods:{
      Draw(){
        let chart = this.$echarts.init(document.getElementById('occur'));
        let echarts = this.$echarts;

        function getVirtulData(year) {
          year = year || '2017';
          let date = +echarts.number.parseDate(year + '-01-01');
          let end = +echarts.number.parseDate((+year + 1) + '-01-01');
          let dayTime = 3600 * 24 * 1000;
          let data = [];
          for (let time = date; time < end; time += dayTime) {
            data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(Math.random() * 10000)
            ]);
          }
          return data;
        }

        let data = getVirtulData(2016);

        let option = {
          //backgroundColor: '#515a6e',
          title: {
            left:'15%',
            top:'10%',
            text: '消费日历',
            //subtext: '',
            textStyle: {
              color: '#323c48'
            }
          },
          tooltip : {
            trigger: 'item'
          },
          legend: {
            top: '10.5%',
            align:'left',
            left: '35%',
            //orient: 'vertical',
            itemWidth: 10,  // 设置宽度
            itemHeight: 10, // 设置高度
            data: ['步数', 'Top 12'],
            textStyle: {
              color: '#323c48'
            }
          },
          calendar: [{
            top: 100,
            left: 'center',
            range: ['2016-01-01', '2016-04-30'],
            splitLine: {
              show: true,
              lineStyle: {
                color: '#9692a1',
                width: 2,
                type: 'solid'
              }
            },
            yearLabel: {
              formatter: 'YEAR {start} ',
              textStyle: {
                color: '#323c48'
              }
            },
            monthLabel: {
              textStyle: {
                color: '#323c48'
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(50,60,72,0.16)',
                borderWidth: 1,
                borderColor: '#ccbbbc'
              }
            }
          }],
          series: [
            {
              name: '步数',
              type: 'scatter',
              coordinateSystem: 'calendar',
              data: data,
              symbolSize: function (val) {
                return val[1] / 500;
              },
              itemStyle: {
                color: '#ddb926'
              }
            },
            {
              name: 'Top 12',
              type: 'effectScatter',
              coordinateSystem: 'calendar',
              data: data.sort(function (a, b) {
                return b[1] - a[1];
              }).slice(0, 12),
              symbolSize: function (val) {
                return val[1] / 500;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              itemStyle: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              },
              zlevel: 1
            }
          ]
        };

        chart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #occur{
    position: absolute;
    right: 0;
    bottom:0;
    width: 20%;
    height: 50%;
  }
</style>
