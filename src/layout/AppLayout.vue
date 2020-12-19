<template>
  <div class="app-layout">
    <div class="app-header d-flex justify-content-between align-items-center p-2">
      <h3 class="page-header">
        {{ $route.meta.header }}
      </h3>

      <div>
        <span
          class="router-link"
          v-if="$route.name != homepage"
          @click="$router.push({ name: homepage })"
        >
          Home
        </span>

        <span
          v-else
          class="router-link"
          @click="$router.push({ name: 'account' })"
        >
          {{ user.username }}
        </span>

        <Button 
          @click="signOut"
          class="ml-2"
        >
          Sign Out
        </Button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

import {
  signOut,
  getUser
} from '@/util/auth.js'

import { homepage } from '@/util/routes.js'

export default {
  name: 'AppLayout',
  components: {
    Button
  },
  mounted() {
    this.getUser();
  },
  data() {
    return {
      user: {}
    }
  },
  computed: {
    homepage() {
      return homepage;
    }
  },
  methods: {
    signOut() {
      signOut();
    },
    async getUser() {
      const user = await getUser();
      this.user = user;
    }
  }
}
</script>

<style scoped>
  .app-header {
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
