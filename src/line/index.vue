<template>
  <div class="vd-line" ref="chart" style="chartStyle"></div>
</template>

<script>
import c3 from 'c3'
import 'c3/c3.min.css'
export default {
  name: 'VdLine',

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
      this.chart = c3.generate({
        bindto: this.$refs.chart,
        data: {
          x: 'x',
          columns: [
            ['x', 'www.site1.com', 'www.site2.com', 'www.site3.com', 'www.site4.com'],
            ['download', 30, 200, 100, 400],
            ['loading', 90, 100, 140, 200]
          ],
          // groups: [
          //   ['download', 'loading']
          // ],
          type: 'bar'
        },
        axis: {
          x: {
            type: 'category' // this needed to load string x value
          }
        }
      })
    }
  },

  mounted () {
    this.$nextTick(this.init)
  }
}
</script>
