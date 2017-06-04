import Vue from 'vue'
import Router from 'vue-router'
import Test from './pages/test'
import LinePage from './pages/line'

Vue.use(Router)
/* eslint-disable comma-dangle */
export default new Router({
  routes: [
    { path: '/test', name: '测试', component: Test },
    { path: '/line', name: '折线图', component: LinePage },
  ]
})
