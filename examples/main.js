import App from './App'
import Vue from 'vue'
import router from './router'
import 'normalize.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
})
