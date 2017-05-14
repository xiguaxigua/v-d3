<template>
  <svg ref="svg" width="400" height="400"></svg>
</template>

<script>
import * as d3 from 'd3'

const fullAngle = 2 * Math.PI

const chartData = [
  { startAngle: 0, endAngle: 0.1 * fullAngle },
  { startAngle: 0.1 * fullAngle, endAngle: 0.2 * fullAngle },
  { startAngle: 0.2 * fullAngle, endAngle: 0.4 * fullAngle },
  { startAngle: 0.4 * fullAngle, endAngle: 0.6 * fullAngle },
  { startAngle: 0.6 * fullAngle, endAngle: 0.7 * fullAngle },
  { startAngle: 0.7 * fullAngle, endAngle: 0.9 * fullAngle },
  { startAngle: 0.9 * fullAngle, endAngle: fullAngle }
]

const colors = d3.schemeCategory10

export default {
  name: 'Svg',

  methods: {
    init () {
      const svg = d3.select(this.$refs.svg)

      const arc = d3.arc()
        .outerRadius(200)
        .innerRadius(0)

      svg.append('g')
        .attr('transform', 'translate(200, 200)')
        .selectAll('path.arc')
        .data(chartData)
        .enter()
        .append('path')
        .attr('class', 'arc')
        .attr('fill', (d, i) => colors[i])
        .attr('d', (d, i) => arc(d, i))
    }
  },

  mounted () {
    this.$nextTick(this.init)
  }
}
</script>
