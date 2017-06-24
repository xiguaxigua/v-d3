import Vue from 'vue'
import Router from 'vue-router'
import LinePage from './pages/line'
import PiePage from './pages/pie'
import RingPage from './pages/ring'
import BarPage from './pages/bar'
import HistogramPage from './pages/histogram'

Vue.use(Router)
/* eslint-disable comma-dangle */
export default new Router({
  routes: [
    { path: '/line', name: '折线图', component: LinePage },
    { path: '/pie', name: '饼图', component: PiePage },
    { path: '/ring', name: '环图', component: RingPage },
    { path: '/bar', name: '条形图', component: BarPage },
    { path: '/histogram', name: '柱状图', component: HistogramPage },
  ]
})
