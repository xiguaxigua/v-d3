<template>
  <svg ref="svg"></svg>
</template>

<script>
import * as d3 from 'd3'
import _flatten from 'lodash/flatten'

const DEFAULT_DATA = [
  [
    { x: 1, y: 1 },
    { x: 2, y: 5 },
    { x: 3, y: 3 },
    { x: 4, y: 1 },
    { x: 5, y: 4 },
    { x: 6, y: 9 }
  ],
  [
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 5, y: 3 },
    { x: 6, y: 3 }
  ]
]

const DEFAULT_MARGIN = {
  left: 30,
  right: 30,
  top: 30,
  bottom: 30
}

const DEFAULT_COLORS = d3.schemeCategory10
const Y_SCALE = 1.2
const PADDING = 5

export default {
  name: 'Svg',

  props: {
    width: { type: Number, default: 400 },
    height: { type: Number, default: 400 },
    chartData: { type: Array, default () { return DEFAULT_DATA } },
    margin: { type: Object, default () { return DEFAULT_MARGIN } },
    colors: { type: Array, default () { return DEFAULT_COLORS } }
  },

  data () {
    this.svg = null
    this.bodyG = null
    const temp = this.chartData.map(data => d3.extent(data, d => d.x))
    const xDomain = d3.extent(_flatten(temp), d => d)
    const yMax = d3.max(this.chartData, data => d3.max(data, d => d.y))
    this.x = d3.scaleLinear().domain(xDomain)
    this.y = d3.scaleLinear().domain([0, yMax * Y_SCALE])
    return {}
  },

  computed: {
    xStart () { return this.margin.left },
    yStart () { return this.height - this.margin.bottom },
    xEnd () { return this.width - this.margin.right },
    yEnd () { return this.margin.top },
    quadrantWidth () { return this.width - this.margin.left - this.margin.right },
    quadrantHeight () { return this.height - this.margin.top - this.margin.bottom }
  },

  methods: {
    init () {
      this.render()
    },

    render () {
      this.svg = d3.select(this.$refs.svg)
        .attr('width', this.width)
        .attr('height', this.height)

      this.renderAxes()
      this.defineBodyClip()
      this.renderBody()
    },

    renderAxes () {
      const axesG = this.svg.append('g')
        .attr('class', 'axes')

      this.renderXAxis(axesG)
      this.renderYAxis(axesG)
    },

    renderXAxis (axesG) {
      const xAxis = d3.axisBottom().scale(this.x.range([0, this.quadrantWidth]))

      axesG.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(${this.xStart}, ${this.yStart})`)
        .call(xAxis)

      d3.selectAll('g.x g.tick')
        .append('line')
        .classed('grid-line', true)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -this.quadrantHeight)
    },

    renderYAxis (axesG) {
      const yAxis = d3.axisLeft().scale(this.y.range([this.quadrantHeight, 0]))

      axesG.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${this.xStart}, ${this.yEnd})`)
        .call(yAxis)

      d3.selectAll('g.y g.tick')
        .append('line')
        .classed('grid-line', true)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', this.quadrantWidth)
        .attr('y2', 0)
    },

    renderBody () {
      this.bodyG = this.svg.append('g')
        .attr('class', 'body')
        .attr('transform', `translate(${this.xStart}, ${this.yEnd})`)
        .attr('clip-path', 'url(#body-clip)')

      this.renderLines()
      this.renderDots()
    },

    renderLines () {
      const line = d3.line()
        .x(d => this.x(d.x))
        .y(d => this.y(d.y))
      this.bodyG.selectAll('path.line')
        .data(this.chartData)
        .enter()
        .append('path')
        .style('stroke', (d, i) => this.colors[i])
        .attr('class', 'line')

      this.bodyG.selectAll('path.line')
        .data(this.chartData)
        .transition()
        .attr('d', line)
    },

    renderDots () {
      this.chartData.forEach((list, i) => {
        this.bodyG.selectAll(`circle._${i}`)
          .data(list)
          .enter()
          .append('circle')
          .attr('class', `dot _${i}`)

        this.bodyG.selectAll(`circle._${i}`)
          .data(list)
          .style('stroke', (d, i) => this.colors[i])
          .transition()
          .attr('cx', d => this.x(d.x))
          .attr('cy', d => this.y(d.y))
          .attr('r', 4)
      })
    },

    defineBodyClip () {
      this.svg.append('defs')
        .append('clipPath')
        .attr('id', 'body-clip')
        .append('rect')
        .attr('x', 0 - PADDING)
        .attr('y', 0)
        .attr('width', this.quadrantWidth + 2 * PADDING)
        .attr('height', this.quadrantHeight)
    }
  },

  mounted () {
    this.$nextTick(this.init)
  }
}
</script>

<style>
.axis path, .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
}

.axis .grid-line{
    stroke: black;
    shape-rendering: crispEdges;
    stroke-opacity: .2;
}

.line{
    fill: none;    
    stroke: steelblue;
    stroke-width: 2;
}

.dot {
  fill: #fff;
  stroke: steelblue;
}
</style>
