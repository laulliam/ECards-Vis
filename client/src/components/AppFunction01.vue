<template>
  <div id="function01">
    <Card id="card" :style="{margin: '80px 10px 0 10px', background: '#fff', minHeight: '86vh'}">
      <div id="container">
        <AppCluster></AppCluster>
        <AppScatter></AppScatter>
        <AppMain></AppMain>
        <AppTimeLine></AppTimeLine>
        <AppParallel></AppParallel>
        <AppMealStatus></AppMealStatus>
        <AppGraph></AppGraph>
      </div>
    </Card>
  </div>
</template>
<script>
  import AppCluster from "./AppFunction01/AppCluster";
  import AppScatter from "./AppFunction01/AppScatter";
  import AppMain from "./AppFunction01/AppMain";
  import AppTimeLine from "./AppFunction01/AppTimeLine";
  import AppParallel from "./AppFunction01/AppParallel";
  import AppMealStatus from "./AppFunction01/AppMealStatus";
  import AppGraph from "./AppFunction01/AppGraph";
  export default {
    name: "AppFunction01",
    mounted(){
    },
    methods:{
    },
    components:{
      AppCluster,
      AppScatter,
      AppMain,
      AppTimeLine,
      AppParallel,
      AppMealStatus,
      AppGraph
    }
  }
</script>

<style scoped>
  #function01{
    position: relative;
    width: 100%;
    height: 100%;
  }

  #container{
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
