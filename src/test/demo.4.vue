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
    }
  },

  mounted () {
    this.$nextTick(this.init)
  }
}
</script>
