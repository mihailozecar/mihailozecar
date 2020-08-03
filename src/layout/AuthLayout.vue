<template>
  <div class="auth-layout container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style scoped>
  .auth-layout {
    height: 100vh;
  }

  .text-center {
    text-align: center;
  }
</style>
