<template>
  <div>
    <vd-bar :data="chartData" :settings="chartSettings"></vd-bar>
  </div>
</template>

<script>
import VdBar from '../../src/bar'

const CHART_DATA = {
  columns: ['日期', '余额', '数值', '比率'],
  rows: [
    { '日期': '1-1', '余额': 123, '数值': 223, '比率': 0.1 },
    { '日期': '1-2', '余额': 1223, '数值': 2223, '比率': 0.2 },
    { '日期': '1-3', '余额': 2123, '数值': 2123, '比率': 0.3 },
    { '日期': '1-4', '余额': 4123, '数值': 2123, '比率': 0.4 },
    { '日期': '1-5', '余额': 3123, '数值': 2123, '比率': 0.5 },
    { '日期': '1-6', '余额': 7123, '数值': 2123, '比率': 0.6 }
  ]
}
const CHART_SETTINGS = {
  stack: {
    stack1: ['余额', '数值']
  },
  axisSite: {
    top: ['比率']
  },
  xAxisType: ['KMB', 'percent'],
  xAxisName: ['数值', '比率'],
  yAxisName: '日期'
  // axisVisible: false
}
export default {
  name: 'Test',

  data () {
    this.chartData = CHART_DATA
    this.chartSettings = CHART_SETTINGS
    return {}
  },

  components: { VdBar }
}
</script>
