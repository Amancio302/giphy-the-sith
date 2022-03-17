import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './plugins/semantic'
import router from './router'
import store from './store'

import '@/assets/styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
