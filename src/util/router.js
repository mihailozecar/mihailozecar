import { createRouter, createWebHistory } from 'vue-router'
import { getUser } from '@/util/auth.js'
import EventBus from '@/util/event-bus.js'

import { routes } from '@/util/routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes
})

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

export {
  router
}
