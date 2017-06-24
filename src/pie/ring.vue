<template>
  <div class="vd-ring" ref="chart" style="chartStyle"></div>
</template>

<script>
import { ring } from './pie.js'
import mixins from '../mixins'
export default {
  name: 'VdRing',

  mixins: [mixins],

  created () {
    this.chartHandler = ring
  }
}
</script>
