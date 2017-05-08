<template>
  <!--<svg ref="svg" width="400" height="400"></svg>-->
  <div ref="box" class="box"></div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'Svg',

  methods: {
    init () {
      const box = d3.select(this.$refs.box)

      box.append('div')
        .style('width', '100px')
        .style('height', '100px')
        .style('background-color', '#000')
        .transition()
        .duration(1000)
        .style('width', '200px')
    }
  },

  mounted () {
    this.$nextTick(this.init)
  }
}
</script>
