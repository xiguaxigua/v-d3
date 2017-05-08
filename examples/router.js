import Vue from 'vue'
import Router from 'vue-router'
import Test from './pages/test'
import Demo from './pages/demo'
import Demo1 from '../src/test/demo.1'
import Demo2 from '../src/test/demo.2'
import Demo3 from '../src/test/demo.3'

Vue.use(Router)
/* eslint-disable comma-dangle */
export default new Router({
  routes: [
    { path: '/test', name: '测试', component: Test },
    { path: '/demo', name: 'Demo', component: Demo },
    { path: '/demo-1', name: 'demo-1', component: Demo1 },
    { path: '/demo-2', name: 'demo-2', component: Demo2 },
    { path: '/demo-3', name: 'demo-3', component: Demo3 },
  ]
})
