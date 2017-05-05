<template>
  <div class="vd-components-line">
    <svg width="960" height="500"></svg>
  </div>
</template>

<script>
import * as d3 from './deps'
export default {
  name: 'VdLine',

  props: {
    data: Object,
    settings: Object
  },

  computed: {
    innerData () {
      return [
        { date: 1, close: 100 },
        { date: 3, close: 300 },
        { date: 4, close: 400 },
        { date: 7, close: 800 },
        { date: 17, close: 1800 },
        { date: 27, close: 2800 },
        { date: 37, close: 3800 },
        { date: 47, close: 4800 },
        { date: 77, close: 5800 }
      ]
    }
  },

  methods: {
    init () {
      const svg = d3.select('svg')
      const margin = { top: 20, right: 20, bottom: 30, left: 50 }
      const width = +svg.attr('width') - margin.left - margin.right
      const height = +svg.attr('height') - margin.top - margin.bottom
      const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

      const x = d3.scaleLinear().rangeRound([0, width])
      const y = d3.scaleLinear().rangeRound([height, 0])

      const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close))

      x.domain(d3.extent(this.innerData, d => d.date))
      y.domain(d3.extent(this.innerData, d => d.close))

      g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('fill', '#000')
        .call(d3.axisBottom(x))
        .select('.domain')

      g.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')

      g.append('path')
        .datum(this.innerData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line)
    }
  },

  mounted () { this.$nextTick(this.init()) }
}
</script>

<style lang="less">
.vd-components-line {
  
}
</style>
