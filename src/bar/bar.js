/* eslint-disable */
import 'c3/c3.min.css'
import { getFormated } from '../utils'
function getData (args) {
  const { metrics, rows, stack, axisSite, isHistogram } = args
  const columns = metrics.map(item => [item])

  rows.forEach(row => {
    metrics.forEach((item, index) => {
      columns[index].push(row[item])
    })
  })

  const result = {
    columns,
    type: 'bar',
  }

  if (stack) result.groups = Object.keys(stack).map(key => stack[key])
  const axisSiteLabel = isHistogram ? 'right' : 'top'
  if (axisSite && axisSite[axisSiteLabel]) {
    result.axes = {}
    axisSite[axisSiteLabel].forEach(item => result.axes[item] = 'y2')
  }

  return result
}

function getAxis (args) {
  const {
    dimension,
    rows,
    axisSite,
    meaAxisType,
    meaAxisName,
    dimAxisName,
    axisVisible,
    isHistogram
  } = args
  const axisSiteLabel = isHistogram ? 'right' : 'top'
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
      show: axisVisible && axisSite && axisSite[axisSiteLabel]
    },
    rotated: !isHistogram
  }
  if (meaAxisType) {
    meaAxisType.forEach((item, index) => {
      const label = index === 0 ? 'y' : 'y2'
      result[label].tick = {
        format: function (v) {
          return getFormated(v, item)
        }
      }
    })
  }
  console.log(meaAxisName)
  if (meaAxisName) {
    meaAxisName.forEach((item, index) => {
      const label = index === 0 ? 'y' : 'y2'
      result[label].label = {
        text: item,
        position: 'inner-top'
      }
    })
  }

  if (dimAxisName) {
    result.x.label = {
      text: dimAxisName,
      position: 'inner-top'
    }
  }
  return result
}

export const bar = (columns, rows, settings, extra) => {
   const {
    axisSite = { top: [] },
    dimension = [columns[0]],
    stack = {},
    axisVisible = true
  } = settings
  const { tooltipVisible, legendVisible } = extra
  let metrics = columns.slice()
  if (settings.metrics) {
    metrics = settings.metrics
  } else {
    metrics.splice(columns.indexOf(dimension[0]), 1)
  }
  const meaAxisType = settings.xAxisType || ['normal', 'normal']
  const meaAxisName = settings.xAxisName || []
  const dimAxisName = settings.yAxisName || ''
  const isHistogram = false

  const data = getData({ metrics, rows, stack, axisSite, isHistogram })
  const axis = getAxis({ dimension, rows, axisSite, meaAxisType, meaAxisName, dimAxisName, axisVisible, isHistogram })
  return { data, axis }
}

export const histogram = (columns, rows, settings, extra) => {
   const {
    axisSite = { top: [] },
    dimension = [columns[0]],
    stack = {},
    axisVisible = true
  } = settings
  const { tooltipVisible, legendVisible } = extra
  let metrics = columns.slice()
  if (settings.metrics) {
    metrics = settings.metrics
  } else {
    metrics.splice(columns.indexOf(dimension[0]), 1)
  }
  const meaAxisType = settings.yAxisType || ['normal', 'normal']
  const meaAxisName = settings.yAxisName || []
  const dimAxisName = settings.xAxisName || ''
  const isHistogram = true

  const data = getData({ metrics, rows, stack, axisSite, isHistogram })
  const axis = getAxis({ dimension, rows, axisSite, meaAxisType, meaAxisName, dimAxisName, axisVisible, isHistogram })
  return { data, axis }
}

