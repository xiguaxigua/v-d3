<template>
  <svg class="vd-line" ref="svg"></svg>
</template>

<script>
/* eslint-disable */
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
const symbolTypes = d3.scaleOrdinal().range(['circle', 'cross'])
console.log(symbolTypes(2))

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

      this.renderArea()
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
      this.renderSymbols()
    },

    renderSymbols () {
      this.chartData.forEach((list, i) => {
        this.bodyG.selectAll('path._' + i)
          .data(list)
          .enter()
          .append('path')
          .attr('class', 'symbol _' + i)

        this.bodyG.selectAll('path._' + i)
          .data(list)
          .classed(symbolTypes(i), true)
          .transition()
          .attr('transform', d => {
            return `translate(${this.x(d.x)}, ${this.y(d.y)})`
          })
          .attr('d', d3.symbol().type(d3.symbolCircle))
      })
    },
    renderArea () {
      this.area = d3.area()
        .x(d => this.x(d.x))
        .y0(this.quadrantHeight - this.y(0))
        .y1(d => this.y(d.y))
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

<style lang="less">
.vd-line {
  body {
      font-family: "helvetica";
  }

  button {
      margin: 0 7px 0 0;
      background-color: #f5f5f5;
      border: 1px solid #dedede;
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;

      font-size: 12px;
      line-height: 130%;
      text-decoration: none;
      font-weight: bold;
      color: #565656;
      cursor: pointer;
  }

  .box {
      width: 200px;
      height: 200px;
      margin: 40px;
      float: left;
      text-align: center;
      border: #969696 solid thin;
      padding: 5px;
  }

  .red {
      background-color: #e9967a;
      color: #f0f8ff;
  }

  .blue {
      background-color: #add8e6;
      color: #f0f8ff;
  }

  .cell {
      min-width: 40px;
      min-height: 20px;
      margin: 5px;
      float: left;
      text-align: center;
      border: #969696 solid thin;
      padding: 5px;
  }

  .fixed-cell {
      min-width: 40px;
      min-height: 20px;
      margin: 5px;
      position: fixed;
      text-align: center;
      border: #969696 solid thin;
      padding: 5px;
  }

  .h-bar {
      min-height: 15px;
      min-width: 10px;
      background-color: steelblue;
      margin-bottom: 2px;
      font-size: 11px;
      color: #f0f8ff;
      text-align: right;
      padding-right: 2px;
  }

  .v-bar {
      min-height: 1px;
      min-width: 30px;
      background-color: #4682b4;
      margin-right: 2px;
      font-size: 10px;
      color: #f0f8ff;
      text-align: center;
      width: 10px;
      display: inline-block;
  }

  .baseline {
      height: 1px;
      background-color: black;
  }

  .clear {
      clear: both;
  }

  .selected {
      background-color: #f08080;
  }

  .control-group {
      padding-top: 10px;
      margin: 10px;
  }

  .table {
      width: 70%;
  }

  .table td, th {
      padding: 5px;
  }

  .table-header {
      background-color: #00AFEF;
      font-weight: bold;
  }

  .table-row-odd {
      background-color: #f0f8ff;
  }

  .table-row-odd {
      background-color: #d3d3d3;
  }

  .code {
      display: inline-block;
      font-style: italic;
      background-color: #d3d3d3;
      border: #969696 solid thin;
      padding: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
  }

  .countdown{
      width: 150px;
      height: 150px;
      font-size: 5em;
      font-weight: bold;
  }

  .axis path, .axis line {
      fill: none;
      stroke: #000;
      shape-rendering: crispEdges;
  }

  .axis text {
      font: 10px sans-serif;
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

  .area {
      stroke: none;
      fill: steelblue;
      fill-opacity: .2;
  }

  .pie text{
      fill: white;
      font-weight: bold;
  }

  .circle {
      stroke: none;
      fill: red;
      fill-opacity: .7;
  }

  .cross {
      stroke: none;
      fill: blue;
      fill-opacity: .7;
  }

  .diamond {
      stroke: none;
      fill: green;
      fill-opacity: .7;
  }

  .square{
      stroke: none;
      fill: yellow;
      fill-opacity: .7;
  }

  .triangle-down{
      stroke: none;
      fill: blueviolet;
      fill-opacity: .7;
  }

  .triangle-up{
      stroke: none;
      fill: darkred;
      fill-opacity: .7;
  }

  .bubble{
      fill-opacity: .3;
  }

  .bar{
      stroke: none;
      fill: steelblue;
  }

}
</style>
