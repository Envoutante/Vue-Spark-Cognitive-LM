import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'

require('@/ui/index')

Vue.config.productionTip = false

new Vue({
  $, // 添加该行即可
  render: (h) => h(App),
}).$mount('#app')
