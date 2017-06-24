<template>
  <div class="vd-histogram" ref="chart" style="chartStyle"></div>
</template>

<script>
import { histogram } from './bar.js'
import mixins from '../mixins'
export default {
  name: 'VdHistogram',

  mixins: [mixins],

  created () {
    this.chartHandler = histogram
  }
}
</script>
