<template>
  <BaseLayout></BaseLayout>
</template>

<script>
import BaseLayout from '@/layout/BaseLayout.vue'

export default {
  name: 'app',
  components: {
    BaseLayout
  }
}
</script>

<style>
  /* global styles */
  html,
  body,
  #app {
    color: black;
    background: #fafafa;
    height: 100%;
    position: relative;
    padding: 0px;
    margin: 0px;

    font-family: 
      Roboto,
      'Open Sans', 
      'Helvetica Neue', 
      sans-serif;
  }

  hr {
    color: rgba(0, 0, 0, 0.23);
  }

  :root {
    --green-accent-color: #008936;
    --light-green-accent-color: #b3e6c7;
  }

  .accent {
    color: var(--green-accent-color);
  }

  .mobile-only {
    display: none;
  }

  .hide-mobile {
    display: inherit;
  }

  .mz-image {
    border-radius: 75px;
    width: 150px;
    height: 150px;
  }

  @media screen and (max-width: 768px) {
    .mobile-only {
      display: block;
    }

    .hide-mobile {
      display: none;
    }
  }

  @media screen and (min-width: 769px) {
    .mz-image-container {
      border-bottom: 1px solid rgba(0,0,0,0.23);
      margin-bottom: .5em;
      padding-bottom: .5em;
    }
  }

  /* bootstrap-like failover */
  .d-flex {
    display: flex;
  }

  .justify-content-between {
    justify-content: space-between;
  }

  .align-items-center {
    align-items: center;
  }

  .p-2 {
    padding: .5rem;
  }

  .ml-1 {
    margin-left: .25rem;
  }

  .text-center {
    text-align: center;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 3px;
    padding: .5rem;
  }

  .text-right {
    text-align: right;
  }
  /* bootstrap-like failover END */
</style>
