import { createApp } from 'vue';
import App from './App.vue'
import router from '@/util/router.js'

import Amplify from 'aws-amplify'
import awsExports from '@/aws-exports.js'

Amplify.configure(awsExports)

createApp(App)
  .use(router)
  .mount('#app')
