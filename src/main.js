import Vue from 'vue'
import App from './App.vue'
import router from '@/util/router.js'

import Amplify from 'aws-amplify'
import awsExports from '@/aws-exports.js'

Amplify.configure(awsExports)

import $api from '@/util/api'
Vue.use($api)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
