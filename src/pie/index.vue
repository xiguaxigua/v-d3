<template>
  <div class="vd-pie" ref="chart" style="chartStyle"></div>
</template>

<script>
import { pie } from './pie.js'
import mixins from '../mixins'
export default {
  name: 'VdPie',

  mixins: [mixins],

  created () {
    this.chartHandler = pie
  }
}
</script>
