<template>
  <div id="test02"></div>
</template>

<script>
  import DataManager from "../../data/DataManager";
  import * as d3 from 'd3'
  export default {
    name: "AppTest02",
    mounted() {
      DataManager.get_f1_iris_data().then(res=>{
        this.Init(res.data)
      })
    },
    methods:{
      Init(data){

        let margin = {top: 30, right: 30, bottom: 30, left: 40};

        let width = document.getElementById('test02').offsetWidth;
        let height = document.getElementById('test02').offsetHeight;

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        let svg = d3.select('#test02')
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        let histogramChart = ()=>{

          let test_data = [];

          for (let i = 1;i<=7;i++)
            for(let j = 0 ;j<24;j++)
              test_data.push({day:i,hour:j,value:Math.random()*50})

          let x = d3.scaleBand()
            .range([ 0, width ])
            .domain(new Array(7).fill(0).map((d,i)=>i+1))
            .padding(0.05)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.

          let y = d3.scaleLinear()
            .domain([0, 23])          // Note that here the Y scale is set manually
            .range([height, 0])

          let histogram = d3.histogram()
            .domain(y.domain())
            .thresholds(y.ticks(20))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
            .value(d => d)

          let sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d.day;})
            .rollup(function(d) {   // For each key..
              let input = d.map(function(g) { return g.value;})    // Keep the letiable called Sepal_Length
              let bins = histogram(input)   // And compute the binning on it.
              return(bins)
            })
            .entries(test_data)

          // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
          let maxNum = 0
          for (let i in sumstat ){
            let allBins = sumstat[i].value
            let lengths = allBins.map(function(a){return a.length;})
            let longuest = d3.max(lengths)
            if (longuest > maxNum) { maxNum = longuest }
          }

          // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
          let xNum = d3.scaleLinear()
            .range([0, x.bandwidth()])
            .domain([-maxNum,maxNum])

          // Add the shape to this svg!
          svg
            .selectAll("myViolin")
            .data(sumstat)
            .enter()        // So now we are working group per group
            .append("g")
            .attr("transform", function(d){ return("translate(" + x(d.key) +" ,0)") } ) // Translation on the right to be at the group position
            .append("path")
            .datum(function(d){ return(d.value)})     // So now we are working bin per bin
            .style("stroke", "none")
            .style("fill","#f2c4bc")
            .attr("d", d3.area()
              .x0(function(d){ return(xNum(-d.length)) } )
              .x1(function(d){ return(xNum(d.length)) } )
              .y(function(d){ return(y(d.x0)) } )
              .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
            )

          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

          // svg.append("g").call( d3.axisLeft(y) );

        }

        histogramChart();

        let calendar = ()=> {
          let gridSize = width / 33;
          let gridHeight = height / 30;

          let data = [];

          for (let i = 1; i <= 30; i++)
            for (let j = 0; j < 24; j++)
              data.push({day: i, hour: j, value: Math.random() * 100})

          let myColor = d3.scaleLinear()
            .range(["white", "#69b3a2"])
            .domain([1, 100])

          // Build X scales and axis:
          let x = d3.scaleBand()
            .range([0, width])
            .domain(new Array(30).fill(0).map((d, i) => i + 1))
            .padding(0.01);

          let y = d3.scaleBand()
            .range([height, 0])
            .domain(new Array(24).fill(0).map((d, i) => i))
            .padding(0.01);

          let calender_g = svg.append("g");

          let calendar_rects = calender_g.selectAll(".hour")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) {
              return x(d.day)
            })
            .attr("y", function (d) {
              return y(d.hour)
            })
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) {
              return myColor(d.value)
            })
        }


        // calendar()

        let newChart = ()=>{
          // set the dimensions and margins of the graph
          let margin = {top: 60, right: 30, bottom: 20, left:110},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;


          //read data
          d3.csv("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", function(data) {

            // Get the different categories and count them
            let categories = data.columns
            let n = categories.length

            // Add X axis
            let x = d3.scaleLinear()
              .domain([-10, 140])
              .range([ 0, width ]);
            svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

            // Create a Y scale for densities
            let y = d3.scaleLinear()
              .domain([0, 0.4])
              .range([ height, 0]);

            // Create the Y axis for names
            let yName = d3.scaleBand()
              .domain(categories)
              .range([0, height])
              .paddingInner(1)
            svg.append("g")
              .call(d3.axisLeft(yName));

            // Compute kernel density estimation for each column:
            let kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
            let allDensity = []
            for (i = 0; i < n; i++) {
              key = categories[i]
              density = kde( data.map(function(d){  return d[key]; }) )
              allDensity.push({key: key, density: density})
            }

            // Add areas
            svg.selectAll("areas")
              .data(allDensity)
              .enter()
              .append("path")
              .attr("transform", function(d){return("translate(0," + (yName(d.key)-height) +")" )})
              .datum(function(d){return(d.density)})
              .attr("fill", "#69b3a2")
              .attr("stroke", "#000")
              .attr("stroke-width", 1)
              .attr("d",  d3.line()
                .curve(d3.curveBasis)
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return y(d[1]); })
              )

          })

// This is what I need to compute kernel density estimation
          function kernelDensityEstimator(kernel, X) {
            return function(V) {
              return X.map(function(x) {
                return [x, d3.mean(V, function(v) { return kernel(x - v); })];
              });
            };
          }
          function kernelEpanechnikov(k) {
            return function(v) {
              return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
            };
          }
        }

        // newChart()


      }
    }
  }
</script>

<style scoped>
  #test02{
    position: absolute;
    left: 27%;
    bottom: 0;
    width: 46%;
    height: 30%;
    /*background-color: #ffd82f;*/
  }
</style>
