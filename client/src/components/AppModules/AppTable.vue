<template>
  <div id="table">
    <div id="table_title"></div>
    <Table border :columns="columns" :data="data" width="500" height="250" style="margin-top: 30px;" ref="selection"></Table>
  </div>
</template>

<script>
  import DataManager from "../../data/DataManager";
    export default {
        name: "AppTable",
        data () {
            return {
                columns: [
                    {
                        title: 'CARDID',
                        key: 'card_id',
                    },
                    {
                        title: 'TOTAL',
                        key: 'total',
                        sortable: true
                    },
                    {
                        title: 'CANTEEN',
                        key: 'cafeteria',
                        sortable: true
                    },
                    {
                        title: 'MARKET',
                        key: 'store',
                        sortable: true
                    },
                    {
                        title: 'COUNT',
                        key: 'count',
                        sortable: true
                    },
                    // {
                    //     title: 'CLUSTER',
                    //     key: 'cluster'
                    // }
                ],
                data: []
            }
        },
        mounted() {
            this.Init_Title();
            DataManager.get_table_data().then(res=>{
                res.data = res.data.filter(d=>d.cluster in ['1'])
                console.log(res.data);
                this.data = res.data
            })
        },
        methods:{
            Init_Title() {

                let chart = this.$echarts.init(document.getElementById('table_title'))

                let option = {
                    title: {
                        text: 'FILTERED MESSAGE',
                        textStyle: {
                            fontSize: 16
                        }
                    },
                }

                chart.setOption(option)
            },
        }
    }
</script>

<style scoped>
  #table{
    position: absolute;
    left: 12px;
    bottom: 0;
    width: 27%;
    height: 30%;
  }
  #table_title{
    position: absolute;
    width: 100%;
    height: 20px;
  }
</style>
