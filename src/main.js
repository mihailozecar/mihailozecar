import Vue from 'vue'
import App from './App.vue'
import router from '@/util/router.js'

import Amplify from 'aws-amplify'
import awsExports from '@/aws-exports.js'

import '@aws-amplify/ui-vue'
Amplify.configure(awsExports)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
