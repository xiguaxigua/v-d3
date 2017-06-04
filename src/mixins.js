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
    }
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
      const options = this.chartHandler(columns, rows, this.settings, extra)
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
