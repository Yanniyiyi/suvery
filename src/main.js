import Vue from 'vue'
import App from './App.vue'
import axios from '@/utils/axios'
import VueAxios from 'vue-axios'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false



// register component to use
Vue.component('v-chart', ECharts)
new Vue({
  render: h => h(App),
}).$mount('#app')