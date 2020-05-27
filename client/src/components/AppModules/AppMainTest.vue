<template>
  <div id="container">
    <div id="tootip">
      <div id="tool_top">
        <ButtonGroup size="small">
          <Button icon="md-add"></Button>
          <Button icon="md-remove"></Button>
          <Button icon="md-refresh"></Button>
        </ButtonGroup>
      </div>
      <div id="tool_left"></div>
    </div>
    <div id="main_chart">
    </div>

  </div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  import * as d3 from 'd3'
  export default {
    name: "AppMainTest",
    data(){
      return {
        sites:[
          {name:'第一食堂','name_':'C1',coordinate:[120.4938882,31.9257250105]},
          {name:'第二食堂','name_':'C2',coordinate:[120.643338882,31.8987250105]},
          {name:'第四食堂','name_':'C4',coordinate:[120.583338882,31.817250105]},
          {name:'第三食堂','name_':'C3',coordinate:[120.743338882,31.877250105]},
          {name:'第五食堂','name_':'C5',coordinate:[120.623338882,31.977250105]},
          // {name:'好利来食品店','name_':'S2',coordinate:[120.743338882,31.9487250105]},
          // {name:'红太阳超市','name_':'S1',coordinate:[120.5738882,31.87087250105]},
          // {name:'财务处','name_':'FO',coordinate:[120.5738882,31.93087250105]},
        ]
      }
    },
    mounted() {

      this.$axios.all([DataManager.get_f1_geoJson_data(),DataManager.get_test_data()]).then(this.$axios.spread((res1,res2)=>{
        this.Init(res1.data,res2.data)
      }))

    },
    methods:{
      Init(geoJson,data) {

        data.forEach(d=>{
          d.date = d3.timeParse('%Y-%m-%d')(d.date)
        })

        let color = [
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
        ];


        let width = document.getElementById('main_chart').offsetWidth;
        let height = document.getElementById('main_chart').offsetHeight;

        let svg = d3.select('#main_chart').append("svg")
          .attr('width',width)
          .attr('height',height)
          // .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round");

        let map_chart = {}

        map_chart.projection = d3.geoMercator()
          .fitSize([width, height],geoJson);

        map_chart.path = d3.geoPath().projection(map_chart.projection);

        map_chart.g = svg.append('g');
        //
        map_chart.map = map_chart.g
          .selectAll('g')
          .data(geoJson.features)
          .enter()
          .append('g')
          .append('path')
          .attr('d', map_chart.path)
          .attr('stroke', '#fff')
          .attr('stroke-width', .5)
          .attr('opacity', 0.5)
          .attr('fill', '#94898e');

        let sites = map_chart.g.selectAll('.site')
          .data(this.sites)
          .enter()
          .append('g')
          .attr('class','site')
          .attr("transform", function(d, i){
            let coor = map_chart.projection([d.coordinate[0], d.coordinate[1]]);
            return "translate("+coor[0]+", "+coor[1]+")";
          });

        let radial_area = {}

        radial_area.innerRadius = 20
        radial_area.outerRadius = 70

        radial_area.x = d3.scaleUtc()
          .domain([Date.UTC(2000, 0, 1), Date.UTC(2001, 0, 1) - 1])
          .range([0, 2 * Math.PI])
        //
        radial_area.y = d3.scaleLinear()
          .domain([d3.min(data, d => d.minmin), d3.max(data, d => d.maxmax)])
          .range([radial_area.innerRadius, radial_area.outerRadius])

        radial_area.xAxis = g => g
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .call(g => g.selectAll("g")
            .data(radial_area.x.ticks())
            .join("g")
            .each((d, i) => {
              d.id = i
            })
            .call(g => g.append("path")
              .attr("stroke", "#000")
              .attr("stroke-opacity", 0.2)
              .attr("d", d => `
              M${d3.pointRadial(radial_area.x(d), radial_area.innerRadius)}
              L${d3.pointRadial(radial_area.x(d), radial_area.outerRadius)}
            `))
            .call(g => g.append("path")
              .attr("id", d => d.id.id)
              .datum(d => [d, d3.utcMonth.offset(d, 1)])
              .attr("fill", "none")
              .attr("d", ([a, b]) => `
              M${d3.pointRadial(radial_area.x(a), radial_area.innerRadius)}
              A${radial_area.innerRadius},${radial_area.innerRadius} 0,0,1 ${d3.pointRadial(radial_area.x(b), radial_area.innerRadius)}
            `)))
        // .call(g => g.append("text")
        //   .append("textPath")
        //   .attr("startOffset", 6)
        //   .attr("xlink:href", d => d.id.href)
        //   .text(d3.utcFormat("%B"))))

        radial_area.yAxis = g => g
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .call(g => g.selectAll("g")
            .data(radial_area['y'].ticks().reverse())
            .join("g")
            .attr("fill", "none")
            .call(g => g.append("circle")
              .attr("stroke", "#565656")
              .attr("stroke-opacity", 0.1)
              .attr("r", radial_area.y)))
        // .call(g => g.append("text")
        //   .attr("y", d => -y(d))
        //   .attr("dy", "0.35em")
        //   .attr("stroke", "#fff")
        //   .attr("stroke-width", 5)
        //   .text((x, i) => `${x.toFixed(0)}${i ? "" : "°F"}`)
        //   .clone(true)
        //   .attr("y", d => y(d))
        //   .selectAll(function () {
        //     return [this, this.previousSibling];
        //   })
        //   .clone(true)
        //   .attr("fill", "currentColor")
        //   .attr("stroke", "none")))

        radial_area.line = d3.lineRadial()
          .curve(d3.curveLinearClosed)
          .angle(d => radial_area.x(d.date))

        radial_area.area = d3.areaRadial()
          .curve(d3.curveLinearClosed)
          .angle(d => radial_area.x(d.date))

        sites.call(g=>g.append("path")
          .attr("fill", "#d0619b")
          .attr("fill-opacity", 0.4)
          .attr("d", radial_area.area
            .innerRadius(d => radial_area.y(d.minmin))
            .outerRadius(d => radial_area.y(d.maxmax))
            (data)))

        sites.call(g=>g.append("path")
          .attr("fill", "#ff8fcb")
          .attr("fill-opacity", 0.5)
          .attr("d", radial_area.area
            .innerRadius(d => radial_area.y(d.min))
            .outerRadius(d => radial_area.y(d.max))
            (data)))

        sites.call(g=>g.append("path")
          .attr("fill", "none")
          .attr("stroke", "#ff6dd2")
          .attr("stroke-width", 1.5)
          .attr("d", radial_area.line
            .radius(d => radial_area.y(d.avg))
            (data)))

        sites.call(g=>g.append("g")
          .call(radial_area.xAxis))

        sites.call(g=>g.append("g")
          .call(radial_area.yAxis))

        // let radial_stacked = {}
        //
        // radial_stacked.innerRadius = 30
        // radial_stacked.outerRadius = 100
        //
        // radial_stacked.x = d3.scaleBand()
        //   .domain(data_b.map(d => d.State))
        //   .range([0, 2 * Math.PI])
        //   .align(0)
        //
        // radial_stacked.y = Object.assign(d => Math.sqrt(d3.scaleLinear()
        //   .domain([0, d3.max(data_b, d => d.total)])
        //   .range([radial_stacked.innerRadius * radial_stacked.innerRadius, radial_stacked.outerRadius * radial_stacked.outerRadius])(d)), d3.scaleLinear()
        //   .domain([0, d3.max(data_b, d => d.total)])
        //   .range([radial_stacked.innerRadius * radial_stacked.innerRadius, radial_stacked.outerRadius * radial_stacked.outerRadius]))
        //
        // radial_stacked.arc = d3.arc()
        //   .innerRadius(d => radial_stacked.y(d[0]))
        //   .outerRadius(d => radial_stacked.y(d[1]))
        //   .startAngle(d => radial_stacked.x(d.data.State))
        //   .endAngle(d => radial_stacked.x(d.data.State) + radial_stacked.x.bandwidth())
        //   .padAngle(0.01)
        //   .padRadius(radial_stacked.innerRadius)
        //   .padRadius(radial_stacked.innerRadius)
        //
        // radial_stacked.xAxis = g => g
        //   .attr("text-anchor", "middle")
        //   .call(g => g.selectAll("g")
        //     .data(data_b)
        //     .join("g")
        //     .attr("transform", d => `
        //   rotate(${((radial_stacked.x(d.State) + radial_stacked.x.bandwidth() / 2) * 180 / Math.PI - 90)})
        //   translate(${radial_stacked.innerRadius},0)`)
        //     .call(g => g.append("line")
        //       .attr("x2", -5)
        //       .attr("stroke", "#000"))
        //     .call(g => g.append("text")
        //       .attr("transform", d => (radial_stacked.x(d.State) + radial_stacked.x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
        //         ? "rotate(90)translate(0,16)"
        //         : "rotate(-90)translate(0,-9)")
        //       .text(d => d.State)))
        //
        // radial_stacked.yAxis = g => g
        //   .attr("text-anchor", "middle")
        //   .call(g => g.append("text")
        //     .attr("y", d => -radial_stacked.y(radial_stacked.y.ticks(5).pop()))
        //     .attr("dy", "-1em")
        //     .text("Population"))
        //   .call(g => g.selectAll("g")
        //     .data(radial_stacked.y.ticks(5).slice(1))
        //     .join("g")
        //     .attr("fill", "none")
        //     .call(g => g.append("circle")
        //       .attr("stroke", "#000")
        //       .attr("stroke-opacity", 0.5)
        //       .attr("r", radial_stacked.y)))
        //     // .call(g => g.append("text")
        //     //   .attr("y", d => -((radial_stacked.y)(d)))
        //     //   .attr("dy", "0.35em")
        //     //   .attr("stroke", "#fff")
        //     //   .attr("stroke-width", 5)
        //     //   .text(y.tickFormat(5, "s"))
        //     //   .clone(true)
        //     //   .attr("fill", "#000")
        //     //   .attr("stroke", "none")))
        //
        // let test_g = svg.append("g")
        //   .attr('transform','translate('+80+','+height/1.2+')')
        //   .selectAll("g")
        //   .data(d3.stack().keys([
        //     "Under 5 Years","5 to 13 Years","14 to 17 Years",
        //     "18 to 24 Years","25 to 44 Years","45 to 64 Years",
        //     "65 Years and Over"])(data_b))
        //   .enter().append("g")
        //   .attr("fill", (d,i) => color[i])
        //   .selectAll("path")
        //   .data(d => d)
        //   .enter().append("path")
        //   .attr("d", radial_stacked.arc);
        //
        // test_g.append("g")
        //   .call(radial_stacked.xAxis);
        //
        // test_g.append("g")
        //   .call(radial_stacked.yAxis);
      }
    }
  }
</script>

<style scoped>
  #container{
    position: absolute;
    left: 27%;
    top:0;
    width: 46%;
    height: 70%;
    /*background-color: #ffbc4c;*/
  }
  #main_chart{
    width: 100%;
    height: 100%;
    z-index:1;
  }

  #tootip{
    position: relative;
    z-index: 999;
  }

  #tool_top{
    position: absolute;
    right: 0;
    top:10px;
    width: 20%;
    height: 20px;
  }
</style>
