<template>
  <div id="portray">
    <div id="portray_title"></div>
    <div id="portray_main"></div>
    <div id="portray_title2"></div>
    <div id="msg_table">
      <Col span="4" style="background: rgb(242,241,244);margin: 2px;">
        <Row>INDEX</Row>
        <Row>CARDID</Row>
        <Row>ORDERLINESS</Row>
        <Row>DILIGENCE</Row>
        <Row>SIMILARITY</Row>
      </Col>
      <Col style="margin: 2px;" span="2" v-model="sim_data" v-for="(i,j) in sim_data" :key="i.card_id">
        <Row style="background: #efefef;" v-if="j!==0">0{{j}}</Row>
        <Row style="background: #efefef;" v-else="j==0">------</Row>
<!--        <Row style="background: #d6d6d6;">{{j}}</Row>-->
        <Row style="background: #f9f9f9">{{i.card_id}}</Row>
        <Row style="background: #efefef;">{{i.O}}</Row>
        <Row style="background: #f9f9f9;">{{i.D}}</Row>
        <Row style="background: #efefef;" v-if="j!==0">{{i.S}}</Row>
        <Row style="background: #efefef;" v-else="j==0">------</Row>
      </Col>

<!--      <Row>-->
<!--        <Col span="12">col-12</Col>-->
<!--        <Col span="12">col-12</Col>-->
<!--      </Row>-->
<!--      <Row>-->
<!--        <Col span="12">col-12</Col>-->
<!--        <Col span="12">col-12</Col>-->
<!--      </Row>-->
    </div>
  </div>
</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: "AppPortray",
        data(){
          return{
              sim_data:[]
          }
        },
        mounted() {
            this.Init_Title()
            this.draw_portray()
        },
        methods:{
            Init_Title() {

                let chart = this.$echarts.init(document.getElementById('portray_title'))
                let chart2 = this.$echarts.init(document.getElementById('portray_title2'))

                let option = {
                    title: {
                        text: 'SIMILARITY NODES',
                        textStyle: {
                            fontSize: 16
                        }
                    }
                }

                let option2 = {
                    title: {
                        text: 'GROUP PROFILE',
                        textStyle: {
                            fontSize: 16
                        }
                    }
                }

                chart.setOption(option)
                chart2.setOption(option2)
            },
            draw_portray(){
                let portray_chart = {};
                portray_chart.width =  document.getElementById('portray_main').offsetWidth;
                portray_chart.height = document.getElementById('portray_main').offsetHeight;

                portray_chart.svg = d3.select('#portray_main').append('svg')
                    .attr('width',portray_chart.width)
                    .attr('height',portray_chart.height);

                let d_scale = d3.scaleLinear()
                    .domain(['0', '1', '2', '3', '4'])
                    .range([
                        "rgba(78,163,151,1)",
                        "rgba(78,163,151,0.91)",
                        "rgba(78,163,151,0.75)",
                        "rgba(78,163,151,0.53)",
                        "rgba(78,163,151,0.26)"].reverse())

                portray_chart.g = portray_chart.svg.selectAll('g')
                    .data([{name:'0',o:0.55,d:'0',message:['High','Low']},{name:'1',o:0.2,d:'3',message: ['Low','High']},
                        {name:'3',o:0.3,d:'1',message:['Low','Low']},{name:'2',o:0.5,d:'2',message:['Middle','Middle']},
                        {name:'4',o:0.75,d:'4',message:['High','High']}])
                    .enter()
                    .append('g')
                    .attr('class',d=>'group'+d.name)
                    .attr('transform',(d,i)=>`translate(${i * (portray_chart.width / 5) + 50},${portray_chart.height/1.5})`)

                portray_chart.g
                    .append('path')
                    .attr('fill','#ddd')
                    .attr('transform','scale(.04) translate(-400,-550)')
                    .attr('d','M544 534.4c57.6-41.6 96-108.8 96-182.4 0-124.8-99.2-224-224-224s-224 99.2-224 224c0 76.8 38.4 144 96 182.4C156.8 585.6 64 713.6 64 864v32h64v-32c0-160 128-288 288-288s288 128 288 288c0 9.6 0 22.4-3.2 32h64v-32C768 713.6 675.2 585.6 544 534.4zM416 512c-89.6 0-160-70.4-160-160s70.4-160 160-160 160 70.4 160 160-70.4 160-160 160z')


                portray_chart.g.append('rect')
                    .attr('width',100)
                    .attr('height',40)
                    .attr('x',-50)
                    .attr('y',55)
                    .attr('fill','#ddd')
                    .attr('rx',5)
                    .attr('opacity',.4)
                //
                // portray_chart.g.append('path')
                //     .attr('fill','#ddd')
                //     .attr('opacity',.4)
                //     .attr("d", d3.arc()
                //         .innerRadius(0)
                //         .outerRadius(45)
                //         .startAngle(Math.PI*0.5)
                //         .endAngle(1.5*Math.PI))
                //     .attr('transform','rotate(180) translate(0,70)')

                // portray_chart.g.append('rect')
                //     .attr('width',100)
                //     .attr('height',20)
                //     .attr('x',-50)
                //     .attr('y',-70)
                //     .attr('fill','#ddd')
                //     .attr('rx',5)
                //     .attr('opacity',.4)

                portray_chart.g.append('circle')
                    .attr('r',20)
                    .attr('fill','#FFFFFF')
                    .attr('opacity',0)

                portray_chart.g.selectAll('.layout')
                    .data([35,38,42])
                    .enter()
                    .append('circle')
                    .attr('class','layout')
                    .attr('r',d=>d)
                    .attr('fill','none')
                    .attr('stroke','#ddd')
                    .attr('stroke-opacity',(d,i)=>.7-i*0.2)

                // portray_chart.g.append('circle')
                //     .attr('r',2)
                //     .attr('fill','#636363')
                //     .attr('transform','translate(-10)')
                //
                // portray_chart.g.append('circle')
                //     .attr('r',2)
                //     .attr('fill','#636363')
                //     .attr('transform','translate(10)')
                //
                // portray_chart.g.append('path')
                //     .attr('fill','#636363')
                //     .attr("d", d3.arc()
                //         .innerRadius(9)
                //         .outerRadius(11)
                //         .startAngle(Math.PI*0.75)
                //         .endAngle(Math.PI*1.25))


                // .attr('transform','rotate(180) translate(0,- 20)')

                // portray_chart.g.append('path')
                //     .attr('fill','#636363')
                //     .attr("d", d3.arc()
                //         .innerRadius(9)
                //         .outerRadius(11)
                //         .startAngle(Math.PI*0.75)
                //         .endAngle(Math.PI*1.25))

                portray_chart.g.append('path')
                    .attr('class',d=>`group${d.name}_o_path`)
                    .attr('fill','#9d436a')
                    .attr('opacity',d=>d.o)
                    .attr("d", d3.arc()
                        .innerRadius(28)
                        .outerRadius(35)
                        .startAngle(Math.PI*1.05)
                        .endAngle(2*Math.PI))

                portray_chart.g.append('path')
                    .attr('class',d=>`group${d.name}_d_path`)
                    .attr('fill',d=>d_scale(d.d))
                    .attr("d", d3.arc()
                        .innerRadius(28)
                        .outerRadius(35)
                        .startAngle(0)
                        .endAngle(Math.PI*0.95))

                portray_chart.g.append('text')
                    .attr('y',70)
                    .attr('x',-46)
                    .attr('fill','#636363')
                    .text(d=>d.message[0]+' Orderliness');

                portray_chart.g.append('text')
                    .attr('y',85)
                    .attr('x',-46)
                    .attr('fill','#636363')
                    .text(d=>d.message[1]+' Diligence');


                portray_chart.temp_g = ''

                portray_chart.g.on('mouseover',function(d){
                    d3.select('body').style('cursor','pointer')
                })
                    .on('mouseout',function(){
                        d3.select('body').style('cursor','')
                    }).on('click',(d)=>{
                    // this.$store.commit('group',d.name)
                    if(d.name === portray_chart.temp_id){
                        // d3.selectAll('.out_circle').remove()
                        portray_chart.temp_id = ''
                        d3.selectAll('.group').attr('fill','#ddd')
                    }
                    else{
                        portray_chart.temp_id = d.name
                        d3.selectAll('.group').attr('fill','#ddd')
                        d3.selectAll('.group'+d.name).attr('fill','#dd5924')
                    }
                })

            }
        },
        computed:{
            sim_nodes(){
                return this.$store.state.sim_nodes;
            }
        },
        watch:{
            sim_nodes:{
                handler(data){
                    this.sim_data = data;
                }
            }
        }
    }
</script>

<style scoped>
  #portray{
    position: absolute;
    right: 0;
    bottom:0;
    width: 27%;
    height: 30%;
    /*background-color: #ff8f44;*/
  }

  #portray_title{
    position: absolute;
    width: 100%;
    height: 40px;
    z-index: 20;
    /*background-color: royalblue;*/
  }

  #portray_title2{
    position: absolute;
    width: 100%;
    height: 40px;
    z-index: 20;
    top:42%;
    /*background-color: royalblue;*/
  }

  #portray_main{
    position: absolute;
    width: 100%;
    height: 100%;
    /*z-index: 20;*/
  }

  #group-tag{
    position: relative;
    z-index: 30;
    top:15%;
    left:5%;
    margin: auto 0;
  }

  .g-tag{
    /*position: absolute;*/
    float: left;
    margin-right: 11%;
  }

  #msg_table{
    left: 5px;
    position: absolute;
    top:9%;
    width:100%;
    height: 30%;
    /*background-color: #f77d8c;*/
  }

</style>
