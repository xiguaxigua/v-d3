<template>
  <svg ref="svg" width="400" height="400"></svg>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'Svg',

  methods: {
    init () {
      const svg = d3.select(this.$refs.svg)

      const scale = d3.scaleLinear().domain([0, 100]).range([0, 300])

      const axis = d3.axisTop()
        .scale(scale)
        .ticks(5)
        .tickSize(5)
        .tickPadding(10)
        .tickFormat(v => `${v}%`)

      svg.append('g').call(axis)
    }
  },

  mounted () {
    this.$nextTick(this.init)
  }
}
</script>
