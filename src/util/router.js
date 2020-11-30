import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUser } from '@/util/auth.js'
import { EventBus } from '@/util/event-bus.js'

Vue.use(VueRouter)

import routes from '@/util/routes.js'
const router = new VueRouter({ routes })

const AuthStateMap = {
  'signin': 'dcc',
  'signout': 'auth'
}

EventBus.$on('auth', ({ state }) => {
  if (AuthStateMap[state]) {
    router.push({ name: AuthStateMap[state] });
  }
});

router.beforeEach((to, from, next) => {
  if (!to.meta.authRequired) {
    next();
  } else {
    getUser()
      .then(user => {
        if (user) {
          next();
        } else {
          next({ name: 'auth' });
        }
      })
      .catch(error => {
        console.error(error);
        next({ name: 'auth' });
      });
  }
})

export default router
