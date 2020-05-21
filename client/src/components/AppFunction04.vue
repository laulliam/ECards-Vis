<template>
  <div id="function04">
    <Card :style="{margin: '80px 10px 0 10px', background: '#fff', minHeight: '89vh'}">
      <AppMain></AppMain>
      <AppCluster></AppCluster>
      <AppAdjacency></AppAdjacency>
      <AppOccur></AppOccur>
    </Card>
  </div>
</template>

<script>
  import AppCluster from "./AppFunction04/AppCluster";
  import AppMain from "./AppFunction04/AppMain";
  import AppAdjacency from "./AppFunction04/AppAdjacency";
  import AppOccur from "./AppFunction04/AppOccur";
  export default {
    name: "AppFunction04",
    mounted(){
    },
    methods:{
    },
    components:{
      AppMain,
      AppCluster,
      AppAdjacency,
      AppOccur
    }
  }
</script>

<style scoped>
  #function04{
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
