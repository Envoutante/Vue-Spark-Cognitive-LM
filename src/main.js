import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'

require('@/ui/index')

Vue.config.productionTip = false

// 使用axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = '/api'

// 使用dayjs
import dayjs from 'dayjs'
dayjs().format()

new Vue({
  $, // 添加该行即可
  render: (h) => h(App),
}).$mount('#app')
