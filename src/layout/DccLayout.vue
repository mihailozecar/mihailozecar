<template>
  <div class="dcc-layout">
    <div class="dcc-header d-flex justify-content-between align-items-center p-2">
      <h3>
        Daily Coding Challenge
      </h3>

      <div>
        {{ user.username }}

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

export default {
  name: 'DccLayout',
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

<style scoped></style>
