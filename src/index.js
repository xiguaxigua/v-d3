import VdBar from './bar/index'
import VdLine from './line/index'
import VdHistogram from './bar/histogram'
import VdRing from './pie/ring'
import VdPie from './pie/index'

const components = [
  VdBar,
  VdHistogram,
  VdLine,
  VdPie,
  VdRing
]

function install (Vue, _) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  VdBar,
  VdHistogram,
  VdRing,
  VdLine,
  VdPie,
  install
}
