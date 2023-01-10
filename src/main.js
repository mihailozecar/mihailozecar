import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/util/router.js'
import api from '@/util/api'

import { Amplify } from 'aws-amplify'
import awsExports from '@/aws-exports.js'

Amplify.configure(awsExports)

const app = createApp(App)

app.use(router)
app.use(api)

app.mount('#app')

