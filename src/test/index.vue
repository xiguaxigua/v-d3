<template>
  <div class="vd-components-line">
    <svg ref="svg" width="600" height="400"></svg>
    <div ref="box"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'VdLine',

  props: {
    data: Object,
    settings: Object
  },

  computed: {
    innerData () {
      // return [1, 2, 3, 4, 5, 6]
      return [
        [
          { width: 10, color: 23 },
          { width: 11, color: 13 },
          { width: 13, color: 33 },
          { width: 14, color: 53 },
          { width: 15, color: 23 },
          { width: 16, color: 53 },
          { width: 17, color: 73 }
        ],
        [
          { width: 10, color: 123 },
          { width: 11, color: 113 },
          { width: 13, color: 133 },
          { width: 14, color: 153 },
          { width: 15, color: 123 },
          { width: 16, color: 153 },
          { width: 17, color: 173 }
        ]
      ]
    }
  },

  methods: {
    init () {
      const box = d3.select(this.$refs.box)
      console.log(d3)
      const colorScale = d3.scaleLinear()
        .domain([0, 100])
        .range(['#000', '#fff'])

      box.selectAll('div.h-bar')
        .data(this.innerData)
        .enter()
        .append('div')
        .attr('class', 'h-bar')
        .append('span')

      box.selectAll('div.h-bar')
        .data(this.innerData)
        .style('width', d => `${d.width * 30}px`)
        .style('background-color', d => colorScale(d.color))
        .select('span')
        .text(d => d.width)

      box.selectAll('div.h-bar')
        .data(this.innerData)
        .exit()
        .remove()
    }
  },

  mounted () {
    this.$nextTick(() => {
      setInterval(() => {
        this.innerData.shift()
        this.innerData.push({
          width: Math.round(Math.random() * 10),
          color: Math.round(Math.random() * 100)
        })
        this.init()
      }, 1000)
    })
  }
}
</script>

<style lang="less">
.vd-components-line {
  .h-bar {
    border: 1px solid red;
  }
}
</style>
