<template>
  <div id="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <h2 style=" text-align: center;" class="layout-title">Visualization&nbsp;&nbsp;&nbsp;And&nbsp;&nbsp;Analysis&nbsp;&nbsp;Of&nbsp;&nbsp;Campus&nbsp;&nbsp;Cards</h2>
      </Header>
      <Content>
        <AppSystem></AppSystem>
      </Content>
<!--      <Footer class="layout-footer-center">2020-2021 &copy; DATA-VIS</Footer>-->
    </Layout>
  </div>
</template>

<script>
  import AppSystem from "./AppSystem";
  import router from '../router/index'
  export default {
    name: "APPLayout",
    methods:{
    },
    components: {
      AppSystem
    },
    router
  }
</script>

<style scoped>

  @import "../common/fonts/font.css";

  a{
    color:#666
  }

  .ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    background-color: #515a6e;
  }

  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .layout-title{
    font-family: Monoton;
    height: 40px;
    line-height: 40px;
    color: #FFFFFF;
    font-size: 24px;
    font-weight: 100;
  }

  .ivu-layout-header {
    background: #515a6e;
    padding: 0 50px;
    height: 45px;
    line-height: 45px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }

  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span{
    width: 0;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 32px;
  }
  .ivu-breadcrumb{
    text-align: left;
  }

  .ivu-layout-footer{
    padding: 0;
    text-align: center;
  }

</style>
