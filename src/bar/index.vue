<template>
  <div class="vd-bar" ref="chart" style="chartStyle"></div>
</template>

<script>
import { bar } from './bar.js'
import mixins from '../mixins'
export default {
  name: 'VdBar',

  mixins: [mixins],

  created () {
    this.chartHandler = bar
  }
}
</script>
