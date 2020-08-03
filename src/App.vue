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
    background-color: #2d005f;
  }

  a,
  a:hover {
    color: blue;
  }

  .no-link,
  .no-link:hover {
    color: inherit;
    text-decoration: inherit;
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

  .accent {
    color: #00AB44;
  }

  .accent-bg {
    color: white;
    background-color: #2d005f;
  }

  .accent-bg-btn,
  .accent-bg-btn:hover {
    color: white;
    background-color: #2d005f;
    border-color: #2d005f;
  }

  .accent-bg-btn:hover,
  .accent-bg-btn:focus {
    background-color: rgba(45, 0, 95, .9);
  }
</style>
