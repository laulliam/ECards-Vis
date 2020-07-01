<template>
  <div id="app">
    <APPLayout></APPLayout>
  </div>
</template>

<script>

    import APPLayout from "./components/APPLayout";

    export default {
        name: 'App',
        components: {
            APPLayout
        }
    }
</script>

<style>
  html,body{
    font-family: "Helvetica Neue";
    overflow: hidden;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
    user-select:none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow: hidden;
  }

  .ivu-card,
  .ivu-card-body {
    padding: 0;
    font-size:12px;
  }

  .ivu-tag-text{
    font-size:9px;
  }

  .ivu-radio-checked .ivu-radio-inner {
    border-color: #f77d8c;
  }

  .ivu-radio-checked:hover .ivu-radio-inner{
    border-color: #f77d8c;
  }

  .ivu-radio-inner:after {
    background-color: #f77d8c;
  }

  .ivu-slider-bar {
    height: 4px;
    background: #f77d8c;
    border-radius: 3px;
    position: absolute;
  }
  .ivu-slider-wrap {
    /*align-items: center;*/
    width: 70%;
    left: 15%;
    bottom:10%;
  }

  .ivu-slider-button {
    width: 12px;
    height: 12px;
    border: 2px solid #f77d8c;
    border-radius: 50%;
    background-color: #fff;
    transition: all .2s linear;
    outline: 0;
  }

  .ivu-slider-button-dragging, .ivu-slider-button:focus, .ivu-slider-button:hover {
    border-color: #f77d8c;
    transform: scale(1.5);
  }

  .axis line {
    stroke: #000;
  }

  .axis path {
    fill: none;
    stroke: #000;
  }

  .axis + .axis g text {
    display: none;
  }

</style>
