<template>
  <div class="dcc-layout">
    <div class="dcc-header d-flex justify-content-between align-items-center p-2">
      <h1>
        Daily Coding Challenge
      </h1>
      <Button 
        @click="signOut"
      >
        Sign Out
      </Button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import { signOut } from '@/util/auth.js'

export default {
  name: 'DccLayout',
  components: {
    Button
  },
  data() {
    return {}
  },
  methods: {
    signOut() {
      signOut();
    }
  }
}
</script>

<style scoped></style>
