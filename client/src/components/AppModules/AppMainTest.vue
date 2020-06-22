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
      <div id="tool_title"></div>
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
                value: 20,
                marks: {

                },
                sites:[
                    {name:'第一食堂','name_':'C1',coordinate:[120.4478882,31.9557250105]},
                    {name:'第二食堂','name_':'C2',coordinate:[120.613338882,31.925250105]},
                    {name:'第四食堂','name_':'C4',coordinate:[120.651338882,31.817250105]},
                    {name:'第三食堂','name_':'C3',coordinate:[120.793338882,31.877250105]},
                    {name:'第五食堂','name_':'C5',coordinate:[120.723338882,31.977250105]},
                    // {name:'好利来食品店','name_':'S2',coordinate:[120.743338882,31.9487250105]},
                    // {name:'红太阳超市','name_':'S1',coordinate:[120.5738882,31.87087250105]},
                    // {name:'财务处','name_':'FO',coordinate:[120.5738882,31.93087250105]},
                ]
            }
        },
        mounted() {

            this.Init_Title();
            this.$axios.all([DataManager.get_f1_geoJson_data(),DataManager.get_meal_data(),DataManager.get_meal_dept_data(),DataManager.get_meal_dept_pro()]).then(this.$axios.spread((res1,res2,res3,res4)=>{
                this.Init(res1.data,res2.data,res3.data,res4.data)
            }))

        },
        methods:{
            Init_Title(){
                let title_div = document.getElementById('tool_title')

                let chart = this.$echarts.init(title_div)

                let option = {
                    title:{
                        text:'THERE IS A TEXT',
                        textStyle:{
                            fontSize:16
                        }
                    },
                }

                chart.setOption(option)

                title_div.style.transform = 'rotate(-90deg)';

            },
            Init(geoJson,data_,dept_data,dept_data_pro) {

                let data = d3.nest().key(d=>d.dept).entries(data_)

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
                    .fitSize([width-50, height-50],geoJson);

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
                    .attr('stroke', '#000')
                    .attr('stroke-width', .3)
                    .attr('opacity', 0.2)
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

                let radial_area = ()=> {

                    let radial_area = {}

                    radial_area.innerRadius = 20
                    radial_area.outerRadius = 70

                    radial_area.x = d3.scaleUtc()
                        .domain(d3.extent(data_, d => d3.timeParse('%H:%M:%S')(d.time)))
                        .range([0, 2 * Math.PI])
                    //
                    radial_area.y = d3.scaleLinear()
                        .domain(d3.extent(data_, d => parseInt(d.max)))
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
                                .attr("stroke", "#565656")
                                .attr("stroke-opacity", 0.1)
                                .attr("d", d => `
              M${d3.pointRadial(radial_area.x(d), radial_area.innerRadius)}
              L${d3.pointRadial(radial_area.x(d), radial_area.outerRadius)}
            `))
                            .call(g => g.append("path")
                                .datum(d => [d, d3.utcHour.offset(d, 1)])
                                .attr("fill", "none")
                                .attr("d", ([a, b]) => `
              M${d3.pointRadial(radial_area.x(a), radial_area.innerRadius)}
              A${radial_area.innerRadius},${radial_area.innerRadius} 0,0,1 ${d3.pointRadial(radial_area.x(b), radial_area.innerRadius)}
            `)))
                    // .call(g => g.append("text")
                    //   .append("textPath")
                    //   .attr("startOffset", 6)
                    //   .attr("xlink:href", d => d.id.href)
                    //   .text(d3.utcFormat("%H"))))

                    radial_area.yAxis = g => g
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", 10)
                        .call(g => g.selectAll("g")
                            .data(radial_area.y.ticks(5))
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
                        .curve(d3.curveBasisOpen)
                        .angle(d => radial_area.x(d3.timeParse('%H:%M:%S')(d.time)))

                    radial_area.area = d3.areaRadial()
                        .curve(d3.curveBasisOpen)
                        .angle(d => radial_area.x(d3.timeParse('%H:%M:%S')(d.time)))


                    // sites.call(g=>g.append("path")
                    //     .attr("fill", "lightsteelblue")
                    //     .attr("fill-opacity", 0.7)
                    //     .attr("d", radial_area.area
                    //         .innerRadius(d => radial_area.y(d.minmin))
                    //         .outerRadius(d => radial_area.y(d.maxmax))
                    //         (data)))

                    // sites.call(g=>g
                    //     .append("path")
                    //     .attr("fill", "steelblue")
                    //     .attr("fill-opacity", 0.5)
                    //     .attr("d", radial_area.area
                    //         .innerRadius(d => radial_area.y(parseInt(d.value)-20))
                    //         .outerRadius(d => radial_area.y(parseInt(d.value)))
                    //         (data[0].values)))


                    sites.append("path")
                        .attr("fill", "#15c225")
                        .attr("fill-opacity", 0.2)
                        .attr("d", (d, i) => radial_area.area
                            .innerRadius(20)
                            .outerRadius(d => radial_area.y(parseInt(d.avg)))
                            (data.filter(s => s.key === d.name_)[0].values))

                    // //
                    // sites.append("path")
                    //     .attr("fill", "steelblue")
                    //     .attr("fill-opacity", 0.3)
                    //     .attr("d", (d,i)=>radial_area.area
                    //         .innerRadius(d => radial_area.y(parseInt(d.value)-60))
                    //         .outerRadius(d => radial_area.y(parseInt(d.value)+60))
                    //         (data[i].values))

                    //
                    sites.append('g')
                        .append("path")
                        .attr("fill", "none")
                        .attr("stroke", "#15c225")
                        .attr("stroke-width", .8)
                        .attr("d", (d, i) => radial_area.line.radius(d => radial_area.y(parseInt(d.avg)))
                        (data.filter(s => s.key === d.name_)[0].values))

                    sites.append('text')
                        .attr('text-anchor',"middle")
                         .attr('dy','.35em')
                        .text(d=>d.name_)


                    //
                    // sites.call(g=>g.append("path")
                    //     .attr("fill", "none")
                    //     .attr("stroke", "steelblue")
                    //     .attr("stroke-width", 1.5)
                    //     .attr("d", radial_area.line
                    //         .radius(d => radial_area.y(d.avg))
                    //         (data)))

                    // sites.call(g=>g.append("g")
                    //     .call(radial_area.xAxis))

                    sites.call(g => g.append("g")
                        .call(radial_area.yAxis))

                }
                let radial_stacked =()=> {

                    let radial_stacked = {}

                    let canteen_data = d3.nest().key(d=>d.canteen).entries(dept_data)
                    let canteen_data_pro = d3.nest().key(d=>d.canteen).entries(dept_data_pro)

                    radial_stacked.data = canteen_data.map(d=>{
                        return {
                            'key':d.key,
                            'values':d3.nest().key(d=>d.time).entries(d.values).map((d, i) => {
                                return {
                                    'State': 'S' + i,
                                    'A1': parseInt(d.values[0].value),
                                    'A2': parseInt(d.values[1].value),
                                    'A3': parseInt(d.values[2].value),
                                    'A4': parseInt(d.values[3].value),
                                    'A5': parseInt(d.values[4].value),
                                    'A6': parseInt(d.values[5].value),
                                    'A7': parseInt(d.values[6].value),
                                    'A8': parseInt(d.values[7].value),
                                    total: d3.sum(d.values, d => parseInt(d.value))
                                }
                            })
                        }
                    })

                    radial_stacked.data_pro = canteen_data_pro.map(d=>{
                        return {
                            'key':d.key,
                            'values':d3.nest().key(d=>d.time).entries(d.values).map((d, i) => {
                                return {
                                    'State': 'S' + i,
                                    'A1': parseInt(d.values[0].value),
                                    'A2': parseInt(d.values[1].value),
                                    'A3': parseInt(d.values[2].value),
                                    'A4': parseInt(d.values[3].value),
                                    'A5': parseInt(d.values[4].value),
                                    'A6': parseInt(d.values[5].value),
                                    'A7': parseInt(d.values[6].value),
                                    'A8': parseInt(d.values[7].value),
                                    total: d3.sum(d.values, d => parseInt(d.value))
                                }
                            })
                        }
                    })

                    radial_stacked.innerRadius = 70
                    radial_stacked.outerRadius = 150

                    radial_stacked.x = d3.scaleBand()
                        .domain(radial_stacked.data[0].values.map(d => d.State))
                        .range([0, 2 * Math.PI])
                        .align(0)

                    let max = d3.max(radial_stacked.data,d=>d3.max(d.values,s=>s.total))

                    radial_stacked.y = Object.assign(d => Math.sqrt(d3.scaleLinear()
                        .domain([0, max])
                        .range([radial_stacked.innerRadius * radial_stacked.innerRadius, radial_stacked.outerRadius * radial_stacked.outerRadius])(d)), d3.scaleLinear()
                        .domain([0, max])
                        .range([radial_stacked.innerRadius * radial_stacked.innerRadius, radial_stacked.outerRadius * radial_stacked.outerRadius]));

                    radial_stacked.z = d3.scaleOrdinal()
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


                    radial_stacked.arc = d3.arc()
                        .innerRadius(d => radial_stacked.y(d[0]))
                        .outerRadius(d => radial_stacked.y(d[1]))
                        .startAngle(d => radial_stacked.x(d.data.State))
                        .endAngle(d => radial_stacked.x(d.data.State) + radial_stacked.x.bandwidth())
                        .padAngle(0.01)
                        .padRadius(radial_stacked.innerRadius)

                    // sites.call(g => g.selectAll(".radial_stacked")
                    //     .data(d3.stack().keys(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'])(radial_stacked.data[0].values))
                    //     .join("g")
                    //     .attr("fill", d => radial_stacked.z(d.key))
                    //     .selectAll("path")
                    //     .data(d => d)
                    //     .join("path")
                    //     .attr("d", radial_stacked.arc))

                    sites.selectAll(".radial_stacked1")
                        .data(d=>d3.stack().keys(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'])(radial_stacked.data.filter(s => s.key === d.name_)[0].values))
                        .join('g')
                        .attr('class','radial_stacked1')
                        .attr("fill", d => radial_stacked.z(d.key))
                        .selectAll("path")
                        .data(d => d)
                        .join("path")
                        .attr("d", radial_stacked.arc);



                    let legend = g => g.append("g")
                        .selectAll("g")
                        .data(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'])
                        .join("g")
                        .attr("transform", (d, i) => `translate(40,${(i - (8 - 1) / 2) * 30 + 500})`)
                        .call(g => g.append("rect")
                            .attr("width", 18)
                            .attr("height", 8)
                            .attr("fill", radial_stacked.z)
                            .on('click',d=>{
                                sites.selectAll('.radial_stacked1')
                                    .selectAll('path')
                                    .attr("fill", '#ccc')
                                    .attr("opacity", 0.7);

                                sites.selectAll(".radial_stacked")
                                    .data(d=>d3.stack().keys(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'])(radial_stacked.data_pro.filter(s => s.key === d.name_)[0].values))
                                    .join('g')
                                    .attr('class','radial_stacked')
                                    .attr("fill", d => radial_stacked.z(d.key))
                                    .selectAll("path")
                                    .data(d => d)
                                    .join("path")
                                    // .attr('stroke','#787878')
                                    // .attr('stroke-opacity',.1)
                                    // .attr('stroke-width',.5)
                                    .attr("d", radial_stacked.arc);
                            }))
                        .call(g => g.append("text")
                            .attr("x", 24)
                            .attr("y", 5)
                            .attr("dy", "0.35em")
                            .attr('font-size','10px')
                            .text(d => d))

                    svg.append('g').call(legend)

                }




                radial_area()
                radial_stacked()


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
    /*position: absolute;*/
    /*z-index: 999;*/
  }

  #tootip #tool_top{
    position: absolute;
    right: 0;
    top:10px;
    width: 200px;
    height: 20px;
  }

  #tool_title {
    position: absolute;
    left: 0;
    bottom: 60px;
    width: 200px;
    height: 200px;
    z-index: 20;
    /*background-color: red;*/
  }

  #tool_slider{
    position: absolute;
    right: 0;
    bottom: 60px;
    width: 300px;
    height: 170px;
    z-index: 20;
  }
</style>
