import c3 from 'c3'
import { colors } from './chart-base'

export default {
  props: {
    data: {
      type: Object
    },
    settings: {
      type: Object
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: '400px'
    },
    beforeConfig: { type: Function },
    afterConfig: { type: Function },
    events: { type: Object },
    grid: { type: Object },
    colors: {
      type: Array,
      default () { return colors }
    },
    tooltipVisible: { type: Boolean, default: true },
    legendVisible: { type: Boolean, default: true },
    legendPosition: { type: String, default: 'bottom' }// bototm, right, inset
  },

  computed: {
    chartStyle () {
      return {
        width: this.width,
        height: this.height
      }
    }
  },

  methods: {
    init () {
      const { columns, rows } = this.data
      if (!Array.isArray(columns) || !Array.isArray(rows)) {
        console.warn('data prop must have columns and row!')
        return
      }
      const extra = {}
      if (this.beforeConfig) this.beforeConfig({ columns, rows })
      let options = this.chartHandler(columns, rows, this.settings, extra)
      if (this.events) {
        Object.keys(this.events).forEach(key => {
          const [eventName, isDataEvent] = key.split('-')
          if (isDataEvent) {
            options.data[eventName] = this.events[key]
          } else {
            options[eventName] = this.events[key]
          }
        })
      }
      if (this.grid) options.padding = this.grid
      if (this.colors) options.color = { pattern: this.colors }
      if (this.afterConfig) options = this.afterConfig(options)
      options.legend = {
        show: this.legendVisible,
        position: this.legendPosition
      }
      options.tooltip = {
        show: this.tooltipVisible
      }
      console.log(options)
      const c3Options = Object.assign({
        bindto: this.$refs.chart
      }, options)
      this.chart = c3.generate(c3Options)
    }
  },

  mounted () {
    this.$nextTick(this.init)
  }
}
