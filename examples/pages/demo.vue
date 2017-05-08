<template>
  <div>
    <vd-test :data="chartData" :settings="chartSettings"></vd-test>
  </div>
</template>

<script>
import VdTest from '../../src/test'

const CHART_DATA = {
  columns: ['日期', '余额', '比率'],
  rows: [
    { '日期': '1-1', '余额': 123, '比率': 0.1 },
    { '日期': '1-2', '余额': 1223, '比率': 0.2 },
    { '日期': '1-3', '余额': 2123, '比率': 0.3 },
    { '日期': '1-4', '余额': 4123, '比率': 0.4 },
    { '日期': '1-5', '余额': 3123, '比率': 0.5 },
    { '日期': '1-6', '余额': 7123, '比率': 0.6 }
  ]
}
const CHART_SETTINGS = {}
export default {
  name: 'Test',

  data () {
    this.chartData = CHART_DATA
    this.chartSettings = CHART_SETTINGS
    return {}
  },

  components: { VdTest }
}
</script>
