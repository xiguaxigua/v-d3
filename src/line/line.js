import 'c3/c3.min.css'
import { getFormated } from '../utils'

function getData (args) {
  const { metrics, rows, area, stack, axisSite } = args
  const columns = metrics.map(item => [item])

  rows.forEach(row => {
    metrics.forEach((item, index) => {
      columns[index].push(row[item])
    })
  })
  const result = {
    columns,
    type: 'spline'
  }

  if (area) {
    result.types = {}
    metrics.forEach(item => { result.types[item] = 'area-spline' })
  }

  if (stack) {
    result.groups = Object.keys(stack).map(key => stack[key])
  }

  if (axisSite && axisSite.right) {
    result.axes = {}
    axisSite.right.forEach(item => {
      result.axes[item] = 'y2'
    })
  }

  return result
}

function getAxis (args) {
  const {
    dimension,
    rows,
    axisSite,
    yAxisType,
    yAxisName,
    xAxisName,
    axisVisible
  } = args
  const result = {
    x: {
      show: axisVisible,
      type: 'category',
      categories: rows.map(row => row[dimension])
    },
    y: {
      show: axisVisible
    },
    y2: {
      show: axisVisible && axisSite && axisSite.right
    }
  }
  if (yAxisType) {
    yAxisType.forEach((item, index) => {
      const label = index === 0 ? 'y' : 'y2'
      result[label].tick = {
        format: function (v) {
          return getFormated(v, item)
        }
      }
    })
  }
  if (yAxisName) {
    yAxisName.forEach((item, index) => {
      const label = index === 0 ? 'y' : 'y2'
      result[label].label = {
        text: item,
        position: 'inner-top'
      }
    })
  }

  if (xAxisName) {
    result.x.label = {
      text: xAxisName,
      position: 'inner-top'
    }
  }
  return result
}

export const line = (columns, rows, settings, extra) => {
  const {
    axisSite = { right: [] },
    yAxisType = ['normal', 'normal'],
    yAxisName = [],
    dimension = [columns[0]],
    xAxisName = [],
    axisVisible = true,
    area,
    stack
  } = settings
  let metrics = columns.slice()

  if (settings.metrics) {
    metrics = settings.metrics
  } else {
    metrics.splice(columns.indexOf(dimension[0]), 1)
  }

  const data = getData({ dimension, metrics, rows, area, stack, axisSite })
  const axis = getAxis({
    dimension,
    rows,
    axisSite,
    yAxisType,
    yAxisName,
    xAxisName,
    axisVisible
  })
  return { data, axis }
}
