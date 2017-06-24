## v-d3

### 引入V-d3

#### 按需引入
-----

v-d3的每种图表组件，都单独打包到lib文件夹下
```
|- lib/
    |- line.js  -------------- 折线图
    |- bar.js  --------------- 条形图
    |- histogram.js  --------- 柱状图
    |- pie.js  --------------- 饼图
    |- ring.js  -------------- 环图
```
使用时，可以直接将单个图表引入到项目中
```js
import Vue from 'vue'
import VdLine from 'v-d3/lib/line'
import App from './App.vue'

Vue.component(VdLine.name, VdLine)

new Vue({
  el: '#app',
  render: h => h(App)
})
```
