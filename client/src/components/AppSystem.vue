<template>
  <div id="system">
    <Card id="card" :style="{margin: '50px 5px 0 5px', background: '#fff', minHeight: '92.5vh'}">
      <div id="container">
<!--        <AppPie></AppPie>-->
        <AppMainTest></AppMainTest>
<!--        <AppMain></AppMain>-->
<!--        <AppParallel></AppParallel>-->
<!--        <AppThemeRiver></AppThemeRiver>-->
<!--        <AppTest02></AppTest02>-->
<!--        <AppTest03></AppTest03>-->
<!--        <AppTest04></AppTest04>-->
        <AppTest05></AppTest05>
      </div>
    </Card>
  </div>
</template>
<script>
  import AppPie from "./AppModules/AppPie";
  // import AppMain from "./AppModules/AppMain";
  import AppMainTest from "./AppModules/AppMainTest";
  import AppParallel from "./AppModules/AppParallel";
  import AppThemeRiver from "./AppModules/AppThemeRiver";
  import AppTest02 from "./AppModules/AppTest02";
  // import AppTest03 from "./AppModules/AppTest03";
  import AppTest04 from "./AppModules/AppTest04";
  import AppTest05 from "./AppModules/AppTest05";
  export default {
    name: "AppFunction01",
    mounted(){
    },
    methods:{
    },
    components:{
      AppPie,
      // AppMain,
      AppMainTest,
      AppParallel,
      AppThemeRiver,
      AppTest02,
      // AppTest03,
      AppTest04,
      AppTest05
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
