<template>
  <div class="auth-layout">
    <div 
      class="site-name site-name-purple text-center"
      @click="goHome"
    >
      mihailozecar.com
    </div>

    <div class="sign-in-form">
      <FormGroup
        label="Username"
        v-model="username"
        :disabled="loadingInProgress"
        @enter="signIn"
      ></FormGroup>

      <FormGroup
        label="Password"
        v-model="password"
        type="password"
        :disabled="loadingInProgress"
        @enter="signIn"
      ></FormGroup>

      <div class="text-right">
        <Button
          primary
          :disabled="loadingInProgress"
          @click="signIn"
        >
          Sign In
        </Button>
      </div>
    </div>

    <div 
      class="alert text-center"
      v-if="loadingInProgress"
    >
      Please, wait...
    </div>
  </div>
</template>

<script>
import FormGroup from '@/components/FormGroup.vue'
import Button from '@/components/Button.vue'

import {
  signIn
} from '@/util/auth.js'

export default {
  name: 'AuthLayout',
  components: {
    FormGroup,
    Button
  },
  data() {
    return {
      username: null,
      password: null,
      loadingInProgress: false
    }
  },
  methods: {
    async signIn() {
      if (!this.username || !this.password) {
        alert('Username and password are required!');
        return;
      }

      if (this.loadingInProgress) {
        return;
      }

      this.loadingInProgress = true;

      try {
        await signIn(this.username, this.password);
        this.loadingInProgress = false;
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;
      }
    },
    goHome() {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style scoped>
  .sign-in-form {
    max-width: 400px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

    padding: 20px;
  }
</style>
