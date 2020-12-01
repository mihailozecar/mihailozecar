import api from './api.js'

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$api', {
      get() { return api }
    });
  }
}

export const $api = { ...api }
