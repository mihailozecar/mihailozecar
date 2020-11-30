<template>
  <div class="dcc-layout">
    <h1>DCC</h1>
    <Button @click="signOut">
      Sign Out
    </Button>
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
