import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

/* http instance, default GET method */
const axiosInstance = axios.create({})

Vue.prototype.$http = axiosInstance

new Vue({
  render: h => h(App)
}).$mount('#app')
