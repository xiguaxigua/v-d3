<template>
  <div class="vd-line" ref="chart" style="chartStyle"></div>
</template>

<script>
import { line } from './line.js'
import mixins from '../mixins'
export default {
  name: 'VdLine',

  mixins: [mixins],

  created () {
    this.chartHandler = line
  }
}
</script>
