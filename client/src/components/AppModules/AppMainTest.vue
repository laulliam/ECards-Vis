<template>
  <div id="container">
    <div id="tootip">
      <div id="tool_top">
        <ButtonGroup size="small">
          <Button icon="md-add"></Button>
          <Button icon="md-remove"></Button>
        </ButtonGroup>
      </div>
      <div id="tool_slider">
        <Card title="Menu Options" icon="ios-options" :padding="0"  style="width: 180px" dis-hover>
          <CellGroup>
            <Cell title="Stacked Bar">
              <i-switch v-model="stackedBar" slot="extra" size="small" @on-change="show_stacked"/>
            </Cell>
            <Cell title="Extra Info">
              <i-switch v-model="extraInfo" slot="extra" size="small" @on-change="show_extra" />
            </Cell>
            <Cell title="Area Line">
              <i-switch v-model="areaLine" slot="extra" size="small" @on-change="show_area" />
            </Cell>
<!--            <Cell title="Staggering Peak Dinging" label="one student, one table" />
            <Cell title="With Switch" style="text-align: center">
              <Button type="success" style="width: 70px;">Arrange</Button>
              <Button type="warning" style="width: 70px">Default</Button>
            </Cell>-->
          </CellGroup>
        </Card>
      </div>
      <div id="tool_title"></div>
      <div id="tool_info">
        <CellGroup>
          <Cell title="Staggering Peak Dinging" label="one student, one table" />
          <Cell title="With Switch">
            <Button type="success" color="#ffffff" style="width: 100px;">Arrange</Button>
            <Button type="warning"  color="#ffffff" style="width: 100px">Default</Button>
          </Cell>
        </CellGroup>
      </div>
    </div>
    <div id="main_chart"></div>
  </div>
</template>

<script>
    import DataManager from "../../data/DataManager";
    import * as d3 from "d3";
    export default {
        name: "AppMainTest",
        data() {
            return {
                freq_path:true,
                stackedBar:true,
                extraInfo:true,
                areaLine:true,
                value: 20,
                radioControl: "default",
                marks: {},
                sites: [
                    {
                        name: "第一食堂",
                        name_: "C1",
                        coordinate: [120.4478882, 31.9557250105]
                    },
                    {
                        name: "第二食堂",
                        name_: "C2",
                        coordinate: [120.613338882, 31.925250105]
                    },
                    {
                        name: "第四食堂",
                        name_: "C4",
                        coordinate: [120.651338882, 31.817250105]
                    },
                    {
                        name: "第三食堂",
                        name_: "C3",
                        coordinate: [120.793338882, 31.882250105]
                    },
                    {
                        name: "第五食堂",
                        name_: "C5",
                        coordinate: [120.723338882, 31.967250105]
                    }
                    // {name:'好利来食品店','name_':'S2',coordinate:[120.743338882,31.9487250105]},
                    // {name:'红太阳超市','name_':'S1',coordinate:[120.5738882,31.87087250105]},
                    // {name:'财务处','name_':'FO',coordinate:[120.5738882,31.93087250105]},
                ],
            };
        },
        mounted() {
            this.Init_Title();
            // this.Info()
            this.$axios
                .all([
                    DataManager.get_f1_geoJson_data(),
                    DataManager.get_meal_default(),
                    DataManager.get_meal_quarter(),
                    DataManager.get_meal_dept_default(),
                    DataManager.get_meal_dept_quarter(),
                ])
                .then(
                    this.$axios.spread((res1, res2, res3, res4, res5) => {
                        this.Init(
                            res1.data,
                            res2.data,
                            res3.data,
                            res4.data,
                            res5.data,
                        );
                    })
                );
        },
        methods: {
            Init_Title() {
                let title_div = document.getElementById("tool_title");

                let chart = this.$echarts.init(title_div);

                let option = {
                    title: {
                        text: "DINING DISTRIBUTION",
                        textStyle: {
                            fontSize: 16
                        }
                    }
                };

                chart.setOption(option);

                title_div.style.transform = "rotate(-90deg)";
            },
            Info(){
                let chart = this.$echarts.init(document.getElementById('tool_info'))

                let option = {
                    "tooltip": {
                        "trigger": "axis"
                    },
                    grid:{
                        left:'18%',
                        bottom:0
                    },
                    "color": ["#434343", "#666666", "#999999", "#ffc39f", "#f7965c", "#fe7421"],
                    "yAxis": [{axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#666666',
                            },
                        },
                        "name": "",
                        "type": "category",
                        "axisTick": {
                            "alignWithLabel": true
                        },
                        "data": ["Before", "After" ]
                    } ,
                    ],
                    "xAxis": [{
                        axisLabel: {
                            show: true,textStyle: { color: '#666666',
                                fontSize:'12' },
                        },
                        "type": "value",
                        "name": ""
                    }],
                    "series": [{
                        "data": [5.8, 7.4],
                        "name": "一线城市",
                        "stack": "one",
                        "type": "bar",

                    }, {
                        "data": [12.4, 16.6],
                        "name": "新一线城市",
                        "stack": "one",
                        "type": "bar",

                    }, {
                        "data": [12.9, 17.0],
                        "name": "二线城市",
                        "stack": "one",
                        "type": "bar",

                    }, {
                        "data": [29.2, 25.0],
                        "name": "三线城市",
                        "stack": "one",
                        "type": "bar",

                    }, {
                        "data": [24.2, 20.8],
                        "name": "四线城市",
                        "stack": "one",
                        "type": "bar",

                    }, {
                        "data": [15.5, 13.2],
                        "name": "五线及以下城市",
                        "stack": "one",
                        "type": "bar",

                    }]
                }

                chart.setOption(option)
            },
            Init(
                geoJson,
                meal_default,
                meal_quarter,
                dept_data_default,
                dept_data_quarter,
            ) {
                let color = [
                    "#d0648a",
                    "#d07999",
                    "#f58db2",
                    "#f2b3c9",
                    "#f2c4bc",
                    "#dcf296",
                    "#b8f29c",
                    "#7bd9a5"
                ];

                let width = document.getElementById("main_chart").offsetWidth;
                let height = document.getElementById("main_chart").offsetHeight;

                let svg = d3
                    .select("#main_chart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    // .attr("viewBox", [-width / 2, -height / 2, width, height])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round");

                let map_chart = {};
                let extra_info = {}
                let donut_chart = {};
                let radial_area = {};
                let radial_stacked = {};

                let map_chart_ = ()=>{

                    map_chart.projection = d3
                        .geoMercator()
                        .fitSize([width , height ], geoJson);
                    map_chart.path = d3.geoPath().projection(map_chart.projection);

                    map_chart.g = svg.append('g');
                    map_chart.map = map_chart.g
                        .selectAll("g")
                        .data(geoJson.features)
                        .enter()
                        .append("g")
                        .append("path")
                        .attr("d", map_chart.path)
                        .attr("stroke", "#000")
                        .attr("stroke-width", 0.3)
                        .attr("opacity", 0.2)
                        // .attr('fill', '#94898e');
                    .attr("fill", "#fff");

                    map_chart.sites = map_chart.g
                        .selectAll(".site")
                        .data(this.sites)
                        .enter()
                        .append("g")
                        .attr("class", "site")
                        .attr("transform", function(d, i) {
                            let coor = map_chart.projection([d.coordinate[0], d.coordinate[1]]);
                            return "translate(" + coor[0] + ", " + coor[1] + ")";
                        });
                }
                let extra_info_ = (data)=>{
                    extra_info.scale = d3.scaleLinear()
                        .domain(d3.extent(data.nodes,d=>d.value))
                        .range([5,18])

                    extra_info.path_scale = d3.scaleLinear()
                        .domain(d3.extent(data.links,d=>d.value))
                        .range([3,10])

                    extra_info.g = svg.append("g");

                    data.links = data.links.map(d=>{
                        return {
                            type: "LineString",
                            source:d.source,
                            target:d.target,
                            value:d.value,
                            coordinates:[this.sites[this.sites.findIndex(s=>s.name_ === d.source)].coordinate,
                                this.sites[this.sites.findIndex(s=>s.name_ === d.target)].coordinate]
                        }
                    })

                    data.nodes = data.nodes.map(d=>{
                        return {
                            name:d.name,
                            value:d.value,
                            coordinate:this.sites[this.sites.findIndex(s=>s.name_ === d.name)].coordinate
                        }
                    })

                    // map_chart.sites
                    //     .append("text")
                    //     .attr("text-anchor", "middle")
                    //     .attr("dy", ".35em")
                    //     .text(d => d.name_);

                    map_chart.g.selectAll('.freq_path')
                        .data(data.links)
                        .enter()
                        .append("path")
                        .attr("d", d=>map_chart.path(d))
                        .style("fill", "none")
                        .style("stroke", "#ddd")
                        .style("stroke-width", d=>extra_info.path_scale(d.value))
                        .style("stroke-opacity", .8)

                    map_chart.g.selectAll('.freq_sites')
                        .data(data.nodes)
                        .enter()
                        .append('circle')
                        .attr('r',d=> extra_info.scale(d.value))
                        .attr("transform", function(d, i) {
                            let coor = map_chart.projection([d.coordinate[0], d.coordinate[1]]);
                            return "translate(" + coor[0] + ", " + coor[1] + ")";
                        })
                        .attr('fill','red')
                        .attr('opacity',.2);

                }
                let donut_chart_ = () => {

                    donut_chart.data = [
                        { name: "<5", value: 11201 },
                        { name: "<s5", value: 1992018 },
                        { name: "<a5", value: 991018 },
                        { name: "<d5", value: 1091208 },
                    ];

                    donut_chart.pie = d3
                        .pie()
                        .padAngle(0.05)
                        .sort(null)
                        .value(d => d.value);

                    donut_chart.arc = d3
                        .arc()
                        .innerRadius(50)
                        .outerRadius(58);

                    donut_chart.color = d3
                        .scaleOrdinal()
                        .domain(donut_chart.data.map(d => d.name))
                        .range(
                            [
                                "#d0648a",
                                "#d07999",
                                "#f58db2",
                                "#f2b3c9",
                                "#f2c4bc",
                                "#dcf296",
                                "#b8f29c",
                                "#7bd9a5"
                            ]
                        );

                    const arcs = donut_chart.pie(donut_chart.data);

                    map_chart.sites
                        .append("g")
                        .selectAll("path")
                        .data(arcs)
                        .join("path")
                        .attr('class','donut')
                        .attr("fill", d => donut_chart.color(d.data.name))
                        .attr('opacity',.4)
                        .attr("d",donut_chart.arc)
                        .append("title")
                        .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);
                };
                let radial_area_ = () => {

                    radial_area.data_default = d3
                        .nest()
                        .key(d => d.dept)
                        .entries(meal_default);
                    radial_area.data_quarter = d3
                        .nest()
                        .key(d => d.dept)
                        .entries(meal_quarter);

                    radial_area.innerRadius = 20;
                    radial_area.outerRadius = 60;

                    radial_area.x = d3
                        .scaleUtc()
                        .domain(
                            d3.extent(meal_default, d => d3.timeParse("%H:%M:%S")(d.time))
                        )
                        .range([0, 2 * Math.PI]);
                    //
                    radial_area.y = d3
                        .scaleLinear()
                        .domain(d3.extent(meal_default, d => parseInt(d.value)))
                        .range([radial_area.innerRadius, radial_area.outerRadius]);

                    radial_area.xAxis = g =>
                        g
                            .attr("font-family", "sans-serif")
                            .attr("font-size", 10)
                            .call(g =>
                                g
                                    .selectAll("g")
                                    .data(radial_area.x.ticks())
                                    .join("g")
                                    .each((d, i) => {
                                        d.id = i;
                                    })
                                    .call(g =>
                                        g
                                            .append("path")
                                            .attr("stroke", "#565656")
                                            .attr("stroke-opacity", 0.1)
                                            .attr(
                                                "d",
                                                d => `
              M${d3.pointRadial(radial_area.x(d), radial_area.innerRadius)}
              L${d3.pointRadial(radial_area.x(d), radial_area.outerRadius)}
            `
                                            )
                                    )
                                    .call(g =>
                                        g
                                            .append("path")
                                            .datum(d => [d, d3.utcHour.offset(d, 1)])
                                            .attr("fill", "none")
                                            .attr(
                                                "d",
                                                ([a, b]) => `M${d3.pointRadial(radial_area.x(a), radial_area.innerRadius)}
              A${radial_area.innerRadius},${
                                                    radial_area.innerRadius
                                                } 0,0,1 ${d3.pointRadial(
                                                    radial_area.x(b),
                                                    radial_area.innerRadius
                                                )}
            `
                                            )
                                    )
                            );
                    // .call(g => g.append("text")
                    //   .append("textPath")
                    //   .attr("startOffset", 6)
                    //   .attr("xlink:href", d => d.id.href)
                    //   .text(d3.utcFormat("%H"))))

                    radial_area.yAxis = g =>
                        g
                            .attr("text-anchor", "middle")
                            .attr("font-family", "sans-serif")
                            .attr("font-size", 10)
                            .call(g =>
                                g
                                    .selectAll("g")
                                    .data(radial_area.y.ticks(5))
                                    .join("g")
                                    .attr("fill", "none")
                                    .call(g =>
                                        g
                                            .append("circle")
                                            .attr("stroke", "#565656")
                                            .attr("stroke-opacity", 0.1)
                                            .attr("r", radial_area.y)
                                    )
                            );
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

                    radial_area.line = d3
                        .lineRadial()
                        .curve(d3.curveBasisOpen)
                        .angle(d => radial_area.x(d3.timeParse("%H:%M:%S")(d.time)));

                    radial_area.area = d3
                        .areaRadial()
                        .curve(d3.curveBasisOpen)
                        .angle(d => radial_area.x(d3.timeParse("%H:%M:%S")(d.time)));

                    // map_chart.sites.call(g=>g.append("path")
                    //     .attr("fill", "lightsteelblue")
                    //     .attr("fill-opacity", 0.7)
                    //     .attr("d", radial_area.area
                    //         .innerRadius(d => radial_area.y(d.minmin))
                    //         .outerRadius(d => radial_area.y(d.maxmax))
                    //         (data)))

                    // map_chart.sites.call(g=>g
                    //     .append("path")
                    //     .attr("fill", "steelblue")
                    //     .attr("fill-opacity", 0.5)
                    //     .attr("d", radial_area.area
                    //         .innerRadius(d => radial_area.y(parseInt(d.value)-20))
                    //         .outerRadius(d => radial_area.y(parseInt(d.value)))
                    //         (data[0].values)))

                    // console.log(radial_area.data_default.map(s => s.values));

                    // map_chart.sites.selectAll('.radial_area')
                    //     .data(radial_area.data_default.map(s => s.values))
                    //     .join("g")
                    //     .attr('class','radial_area')
                    //     .attr("fill", '#8fcc27')
                    //     .selectAll("path")
                    //     .data(d => d)
                    //     .join("path")
                    //     .attr("d", radial_area.area
                    //         .innerRadius(20)
                    //         .outerRadius(d => radial_area.y(parseInt(d.value))))

                    // //
                    map_chart.sites
                        .append("path")
                        .attr("class", "radial_area")
                        .attr("fill", "#15c225")
                        .attr("fill-opacity", 0.2)
                        .attr("d", (d, i) =>
                            radial_area.area
                                .innerRadius(20)
                                .outerRadius(d => radial_area.y(parseInt(d.value)))(
                                    radial_area.data_default.filter(s => s.key === d.name_)[0].values
                                )
                        );

                    //
                    map_chart.sites
                        .append("g")
                        .append("path")
                        .attr("class", "radial_stroke")
                        .attr("fill", "none")
                        .attr("stroke", "#15c225")
                        .attr("stroke-width", 0.8)
                        .attr("d", (d, i) =>
                            radial_area.line.radius(d => radial_area.y(parseInt(d.value)))(
                                radial_area.data_default.filter(s => s.key === d.name_)[0].values
                            )
                        );
                    //
                    // map_chart.sites.call(g=>g.append("path")
                    //     .attr("fill", "none")
                    //     .attr("stroke", "steelblue")
                    //     .attr("stroke-width", 1.5)
                    //     .attr("d", radial_area.line
                    //         .radius(d => radial_area.y(d.avg))
                    //         (data)))

                    // map_chart.sites.call(g=>g.append("g")
                    //     .call(radial_area.xAxis))

                    map_chart.sites.call(g => g.append("g").call(radial_area.yAxis));
                };
                let radial_stacked_ = () => {

                    let canteen_data_default = d3
                        .nest()
                        .key(d => d.canteen)
                        .entries(dept_data_default);
                    let canteen_data_quarter = d3
                        .nest()
                        .key(d => d.canteen)
                        .entries(dept_data_quarter);

                    radial_stacked.data_default = canteen_data_default.map(d => {
                        return {
                            key: d.key,
                            values: d3
                                .nest()
                                .key(d => d.time)
                                .entries(d.values)
                                .map((d, i) => {
                                    return {
                                        State: "S" + i,
                                        A1: parseInt(d.values[0].value),
                                        A2: parseInt(d.values[1].value),
                                        A3: parseInt(d.values[2].value),
                                        A4: parseInt(d.values[3].value),
                                        A5: parseInt(d.values[4].value),
                                        A6: parseInt(d.values[5].value),
                                        A7: parseInt(d.values[6].value),
                                        A8: parseInt(d.values[7].value),
                                        total: d3.sum(d.values, d => parseInt(d.value))
                                    };
                                })
                        };
                    });
                    radial_stacked.data_quarter = canteen_data_quarter.map(d => {
                        return {
                            key: d.key,
                            values: d3
                                .nest()
                                .key(d => d.time)
                                .entries(d.values)
                                .map((d, i) => {
                                    return {
                                        State: "S" + i,
                                        A1: parseInt(d.values[0].value),
                                        A2: parseInt(d.values[1].value),
                                        A3: parseInt(d.values[2].value),
                                        A4: parseInt(d.values[3].value),
                                        A5: parseInt(d.values[4].value),
                                        A6: parseInt(d.values[5].value),
                                        A7: parseInt(d.values[6].value),
                                        A8: parseInt(d.values[7].value),
                                        total: d3.sum(d.values, d => parseInt(d.value))
                                    };
                                })
                        };
                    });

                    radial_stacked.innerRadius = 60;
                    radial_stacked.outerRadius = 160;

                    radial_stacked.x = d3
                        .scaleBand()
                        .domain(radial_stacked.data_default[0].values.map(d => d.State))
                        .range([0, 2 * Math.PI])
                        .align(0);

                    let max = d3.max(radial_stacked.data_default, d =>
                        d3.max(d.values, s => s.total)
                    );

                    radial_stacked.y = Object.assign(
                        d =>
                            Math.sqrt(
                                d3.scaleLinear()
                                    .domain([0, max])
                                    .range([
                                        radial_stacked.innerRadius * radial_stacked.innerRadius,
                                        radial_stacked.outerRadius * radial_stacked.outerRadius
                                    ])(d)
                            ),
                        d3.scaleLinear()
                            .domain([0, max])
                            .range([
                                radial_stacked.innerRadius * radial_stacked.innerRadius,
                                radial_stacked.outerRadius * radial_stacked.outerRadius
                            ])
                    );

                    radial_stacked.z = d3
                        .scaleOrdinal()
                        .domain(["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"])
                        .range(
                            [
                                // "#d0648a",
                                // "#d07999",
                                // "#f58db2",
                                // "#f2b3c9",
                                // "#f2c4bc",
                                // "#dcf296",
                                // "#b8f29c",
                                // "#7bd9a5"
                                "#d0648a",
                                "#d07999",
                                "#f58db2",
                                "#f2b3c9",
                                "#f2c4bc",
                                "#dcf296",
                                "#b8f29c",
                                "#7bd9a5"
                            ]
                        );

                    radial_stacked.arc = d3
                        .arc()
                        .innerRadius(d => radial_stacked.y(d[0]))
                        .outerRadius(d => radial_stacked.y(d[1]))
                        .startAngle(d => radial_stacked.x(d.data.State))
                        .endAngle(
                            d => radial_stacked.x(d.data.State) + radial_stacked.x.bandwidth()
                        )
                        .padAngle(0.01)
                        .padRadius(radial_stacked.innerRadius);

                    map_chart.sites
                        .selectAll(".radial_stacked")
                        .data(d =>
                            d3.stack().keys(["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"])(
                                radial_stacked.data_default.filter(s => s.key === d.name_)[0]
                                    .values
                            )
                        )
                        .join("g")
                        .attr("class", (d,i)=>`radial_stacked A${i}`)
                        // .on('mouseover',function () {
                        //     d3.selectAll(".radial_stacked").style('opacity',.2)
                        //     d3.select(this).style('opacity',1)
                        // })
                        // .on('mouseout',function () {
                        //     d3.selectAll(".radial_stacked").style('opacity',1)
                        // })
                        .attr("fill", d => radial_stacked.z(d.key))
                        .selectAll("path")
                        .data(d => d)
                        .join("path")
                        .attr("d", radial_stacked.arc)
                        .on('mouseover',function () {
                            d3.select(this).style('opacity',.2)
                        })
                        .on('mouseout',function (d) {
                            d3.select(this).style('opacity',1)
                        })
                        .append("title")
                        .text(d => d[1] - d[0]);

                    map_chart.g.selectAll('.sites_name')
                        .data(this.sites)
                        .enter()
                        .append('text')
                        .attr("transform", function(d, i) {
                            let coor = map_chart.projection([d.coordinate[0], d.coordinate[1]]);
                            return "translate(" + coor[0] + ", " + coor[1] + ")";
                        })
                        .text(d=>d.name_)
                        .attr("text-anchor", "middle")
                        .attr("dy", ".35em")
                        .on('mouseover',()=>{
                            d3.select('body').style('cursor','pointer')
                        })
                        .on('mouseout',()=>{
                            d3.select('body').style('cursor','')
                        })
                        .on('click',(d)=>{
                            console.log(d.name_);
                            this.$store.commit('current_canteen',d.name_)
                        });

                    let legend = g =>
                        g
                            .append("g")
                            .selectAll("g")
                            .data(["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"])
                            .join("g")
                            .attr(
                                "transform",
                                (d, i) => `translate(40,${(i - (8 - 1) / 2) * 30 + 550})`
                            )
                            .call(g =>
                                g
                                    .append("rect")
                                    .attr("width", 18)
                                    .attr("height", 8)
                                    .attr("fill", radial_stacked.z)
                            )
                            .call(g =>
                                g
                                    .append("text")
                                    .attr("x", 24)
                                    .attr("y", 5)
                                    .attr("dy", "0.35em")
                                    .attr("font-size", "10px")
                                    .text(d => d)
                            );

                    svg.append("g").call(legend);
                };

                map_chart_();
                radial_area_();
                radial_stacked_();
                // donut_chart_();
                //extra_info_(graph);

                d3.select('.ivu-btn-success')
                    .on('click',()=>{
                        // console.log(111);
                        // map_chart.sites
                        //     .selectAll(".radial_stacked")
                        //     .selectAll("path")
                        //     .attr("fill", "#ccc")
                        //     .attr("opacity", 0.7);
                        this.$store.commit('arrangeDinging',true)

                        map_chart.sites.selectAll(".radial_stacked").remove();

                        map_chart.sites
                            .selectAll(".radial_stacked")
                            .data(d =>
                                d3
                                    .stack()
                                    .keys(["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"])(
                                        radial_stacked.data_quarter.filter(s => s.key === d.name_)[0]
                                            .values
                                    )
                            )
                            .join("g")
                            .attr("class", "radial_stacked")
                            .attr("fill", d => radial_stacked.z(d.key))
                            .selectAll("path")
                            .data(d => d)
                            .join("path")
                            // .attr('stroke','#787878')
                            // .attr('stroke-opacity',.1)
                            // .attr('stroke-width',.5)
                            .attr("d", radial_stacked.arc);

                        map_chart.sites.selectAll(".radial_area").remove();
                        map_chart.sites.selectAll(".radial_stroke").remove();

                        map_chart.sites
                            .append("path")
                            .attr("class", "radial_area")
                            .attr("fill", "#15c225")
                            .attr("fill-opacity", 0.2)
                            .attr("d", (d, i) =>
                                radial_area.area
                                    .innerRadius(20)
                                    .outerRadius(d => radial_area.y(parseInt(d.value)))(
                                        radial_area.data_quarter.filter(s => s.key === d.name_)[0]
                                            .values
                                    )
                            );

                        map_chart.sites
                            .append("g")
                            .append("path")
                            .attr("class", "radial_area")
                            .attr("fill", "none")
                            .attr("stroke", "#15c225")
                            .attr("stroke-width", 0.8)
                            .attr("d", (d, i) =>
                                radial_area.line.radius(d => radial_area.y(parseInt(d.value)))(
                                    radial_area.data_quarter.filter(s => s.key === d.name_)[0]
                                        .values
                                )
                            );
                    })

                d3.select('.ivu-btn-warning')
                    .on('click',()=>{
                        // console.log(111);
                        // map_chart.sites.selectAll(".radial_stacked").remove();

                        this.$store.commit('arrangeDinging',false)

                        map_chart.sites
                            .selectAll(".radial_stacked")
                            .data(d =>
                                d3
                                    .stack()
                                    .keys(["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"])(
                                        radial_stacked.data_default.filter(s => s.key === d.name_)[0]
                                            .values
                                    )
                            )
                            .join("g")
                            .attr("class", "radial_stacked")
                            .attr("fill", d => radial_stacked.z(d.key))
                            .selectAll("path")
                            .data(d => d)
                            .join("path")
                            .attr("d", radial_stacked.arc);

                        // map_chart.sites.selectAll(".radial_stacked").remove();

                        map_chart.sites.selectAll(".radial_area").remove();
                        map_chart.sites.selectAll(".radial_stroke").remove();

                        map_chart.sites
                            .append("path")
                            .attr("class", "radial_area")
                            .attr("fill", "#15c225")
                            .attr("fill-opacity", 0.2)
                            .attr("d", (d, i) =>
                                radial_area.area
                                    .innerRadius(20)
                                    .outerRadius(d => radial_area.y(parseInt(d.value)))(
                                        radial_area.data_default.filter(s => s.key === d.name_)[0]
                                            .values
                                    )
                            );

                        map_chart.sites
                            .append("g")
                            .append("path")
                            .attr("class", "radial_area")
                            .attr("fill", "none")
                            .attr("stroke", "#15c225")
                            .attr("stroke-width", 0.8)
                            .attr("d", (d, i) =>
                                radial_area.line.radius(d => radial_area.y(parseInt(d.value)))(
                                    radial_area.data_default.filter(s => s.key === d.name_)[0]
                                        .values
                                )
                            );
                    })

            },
            show_stacked(state){
                state?d3.selectAll('.radial_stacked').style('display','block').attr('opacity',0).transition().duration(500).attr('opacity',1):
                    d3.selectAll('.radial_stacked').style('display','none')
            },
            show_extra(state){

                d3.select('#main_chart svg').selectAll('.freq_path').style('display',state?'block':'none')
                d3.select('#main_chart svg').selectAll('.freq_sites').style('display',state?'block':'none')

            },
            show_area(state){
                d3.selectAll('.radial_stroke').style('display',state?'block':'none')
                d3.selectAll('.radial_area').style('display',state?'block':'none')
            }
        },
        computed: {
            current_cluster() {
                return this.$store.state.current_cluster;
            }
        },
        watch: {
            current_cluster: {
                handler(cluster) {

                    this.$axios.all([DataManager.get_f1_geoJson_data(), DataManager.get_f1_graph_data('cluster'+cluster[1])]).then(this.$axios.spread((res1, res2) => {

                        let width = document.getElementById("main_chart").offsetWidth;
                        let height = document.getElementById("main_chart").offsetHeight;

                        let projection = d3
                            .geoMercator()
                            .fitSize([width, height], res1.data);
                        let path = d3.geoPath().projection(projection);

                        let data = res2.data

                        let extra_info = {}

                        extra_info.g = d3.select('#main_chart svg').append("g");

                        extra_info.scale = d3.scaleLinear()
                            .domain(d3.extent(data.nodes, d => d.value))
                            .range([5, 18])

                        extra_info.path_scale = d3.scaleLinear()
                            .domain(d3.extent(data.links, d => d.value))
                            .range([3, 10])


                        data.links = data.links.map(d => {
                            return {
                                type: "LineString",
                                source: d.source,
                                target: d.target,
                                value: d.value,
                                coordinates: [this.sites[this.sites.findIndex(s => s.name_ === d.source)].coordinate,
                                    this.sites[this.sites.findIndex(s => s.name_ === d.target)].coordinate]
                            }
                        })

                        data.nodes = data.nodes.map(d => {
                            return {
                                name: d.name,
                                value: d.value,
                                coordinate: this.sites[this.sites.findIndex(s => s.name_ === d.name)].coordinate
                            }
                        })

                        d3.select('#main_chart svg').selectAll('.freq_path').remove()
                        d3.select('#main_chart svg').selectAll('.freq_sites').remove()

                        extra_info.g.selectAll('.freq_path')
                            .data(data.links)
                            .enter()
                            .append("path")
                            .attr('class','freq_path')
                            .attr("d", d => path(d))
                            .style("fill", "none")
                            .style("stroke", "#ddd")
                            .style("stroke-width", d => extra_info.path_scale(d.value))
                            .style("stroke-opacity", .8)

                        extra_info.g.selectAll('.freq_sites')
                            .data(data.nodes)
                            .enter()
                            .append('circle')
                            .attr('class','freq_sites')
                            .attr('r', d => extra_info.scale(d.value))
                            .attr("transform", function (d, i) {
                                let coor = projection([d.coordinate[0], d.coordinate[1]]);
                                return "translate(" + coor[0] + ", " + coor[1] + ")";
                            })
                            .attr('fill', 'red')
                            .attr('opacity', .2);

                    }))
                }
            }
        }
    };
</script>

<style scoped>
  #container {
    position: absolute;
    left: 27%;
    top: 0;
    width: 46%;
    height: 70%;
    /*background-color: #ffbc4c;*/
  }
  #main_chart {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  #tootip {
    /*position: absolute;*/
    /*z-index: 999;*/
  }

  #tootip #tool_top {
    position: absolute;
    right: 0;
    top: 10px;
    width: 200px;
    height: 20px;
  }

  #tool_title {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 200px;
    height: 200px;
    z-index: 0;
    /*background-color: red;*/
  }

  #tool_slider {
    position: absolute;
    left: 90px;
    bottom: 10px;
    width: 180px;
    height: 24%;
    z-index: 20;
    /*background-color: #ccc;*/
  }

  #tool_info {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 280px;
    height: 17%;
    z-index: 20;
    /*background-color: #ccc;*/
  }

</style>
