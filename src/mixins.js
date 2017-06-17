import c3 from 'c3'

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
    events: { type: Object }
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
      if (this.afterConfig) options = this.afterConfig(options)
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
