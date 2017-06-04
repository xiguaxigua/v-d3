<template>
  <div>
    <vd-line :data="chartData" :settings="chartSettings"></vd-line>
  </div>
</template>

<script>
import VdLine from '../../src/line'

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
  area: true,
  stack: {
    stack1: ['余额', '数值']
  },
  axisSite: {
    right: ['比率']
  }
}
export default {
  name: 'Test',

  data () {
    this.chartData = CHART_DATA
    this.chartSettings = CHART_SETTINGS
    return {}
  },

  components: { VdLine }
}
</script>
