import Vue from 'vue'
import Router from 'vue-router'

import AppSystem from "../components/AppSystem";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppSystem',
      component: AppSystem
    }
  ]
})
