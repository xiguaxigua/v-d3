import Vue from 'vue'
import Router from 'vue-router'
import Test from './pages/test'
// import Demo from './pages/demo'
// import Demo1 from '../src/test/demo.1'
// import Demo2 from '../src/test/demo.2'
import Demo4 from '../src/test/demo.4'
import Demo5 from '../src/test/demo.5'
import Demo6 from '../src/test/demo.6'
import Demo7 from '../src/test/demo.7'
import Demo8 from '../src/test/demo.8'

Vue.use(Router)
/* eslint-disable comma-dangle */
export default new Router({
  routes: [
    { path: '/test', name: '测试', component: Test },
    { path: '/demo-4', name: 'Demo4', component: Demo4 },
    { path: '/demo-5', name: 'Demo5', component: Demo5 },
    { path: '/demo-6', name: 'Demo6', component: Demo6 },
    { path: '/demo-7', name: 'Demo7', component: Demo7 },
    { path: '/demo-8', name: 'Demo8', component: Demo8 },
    // { path: '/demo-1', name: 'demo-1', component: Demo1 },
    // { path: '/demo-2', name: 'demo-2', component: Demo2 },
    // { path: '/demo-3', name: 'demo-3', component: Demo3 },
  ]
})
