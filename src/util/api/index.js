import * as api from './api.js'

const install = app => {
  app.config.globalProperties.$api = api;
}

export default { install }

export const $api = { api }