<template>
  <div id="system">
    <Card id="card" :style="{margin: '50px 5px 0 5px', background: '#fff', minHeight: '92.5vh'}">
      <div id="container">
        <AppPie></AppPie>
        <AppParallel></AppParallel>
        <AppExtraMSG></AppExtraMSG>

        <AppMainTest></AppMainTest>
        <AppTimeLine></AppTimeLine>

        <AppControl></AppControl>
        <AppNetwork></AppNetwork>
        <AppAdjacentInfo></AppAdjacentInfo>
      </div>
    </Card>
  </div>
</template>
<script>
    import AppPie from "./AppModules/AppPie";
    import AppMainTest from "./AppModules/AppMainTest";
    import AppParallel from "./AppModules/AppParallel";
    import AppExtraMSG from "./AppModules/AppExtraMSG";
    import AppTimeLine from "./AppModules/AppTimeLine";
    import AppControl from "./AppModules/AppControl";
    import AppNetwork from "./AppModules/AppNetwork";
    import AppAdjacentInfo from "./AppModules/AppAdjacentInfo";
    export default {
        name: "AppFunction01",
        mounted(){
        },
        methods:{
        },
        components:{
            AppPie,
            AppMainTest,
            AppParallel,
            AppExtraMSG,
            AppTimeLine,
            AppControl,
            AppNetwork,
            AppAdjacentInfo
        }
    }
</script>

<style scoped>
  #system{
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
