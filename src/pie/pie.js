/* eslint-disable */
import 'c3/c3.min.css'
import { getFormated } from '../utils'
function getData (args) {
  const { dimension, metrics, rows, isRing } = args
  const result = {
    type: isRing ? 'donut' : 'pie'
  }
  result.columns = rows.map(row => {
    return [row[dimension], row[metrics]]
  })
  return result
}

function getTooltip (args) {
  const { dataType } = args
  const result = {
    format: {
      value (v) {
        return getFormated(v, dataType)
      }
    }
  }
  return result
}

export const pie = (columns, rows, settings, extra) => {
  const { isRing } = extra
  const {
    dataType = 'normal',
    dimension = columns[0],
    metrics = columns[1],
  } = settings
  const data = getData({ dimension, metrics, rows, isRing })
  const tooltip = getTooltip({ dataType })
  return { data, tooltip }
}

export const ring = (columns, rows, settings, extra) => {
  const newExtra = Object.assign({ isRing: true }, extra)
  return pie(columns, rows, settings, newExtra)
}
