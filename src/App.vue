<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app'
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
    --purple-accent-color: #651fff;
    --light-purple-accent-color: #b388ff;
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

  .d-flex {
    display: flex;
  }

  .flex-wrap {
    flex-wrap: wrap;
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

  .flex-1 {
    flex: auto;
  }

  .justify-content-between {
    justify-content: space-between;
  }

  .align-items-center {
    align-items: center;
  }

  .align-items-baseline {
    align-items: baseline;
  }

  .p-2 {
    padding: .5rem;
  }

  .py-2 {
    padding-top: .5rem;
    padding-bottom: .5rem;
  }

  .px-2 {
    padding-left: .5rem;
    padding-right: .5rem;
  }

  .mt-1 {
    margin-top: .25rem;
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

  .text-right {
    text-align: right;
  }

  .w-100 {
    width: 100%;
  }
  /* bootstrap-like failover END */

  .site-name {
    color: var(--light-green-accent-color);
    font-size: 2em;
    overflow-wrap: anywhere;
    font-weight: bold;
    text-shadow: 
      1px .5px var(--green-accent-color),
      1px 1px var(--green-accent-color),
      1px 1.5px var(--green-accent-color),
      2px 2px var(--green-accent-color),
      2px 2.5px var(--green-accent-color),
      2px 3px var(--green-accent-color);
  }

  .site-name-purple {
    color: var(--light-purple-accent-color);
    font-size: 2em;
    overflow-wrap: anywhere;
    font-weight: bold;
    text-shadow: 
      1px .5px var(--purple-accent-color),
      1px 1px var(--purple-accent-color),
      1px 1.5px var(--purple-accent-color),
      2px 2px var(--purple-accent-color),
      2px 2.5px var(--purple-accent-color),
      2px 3px var(--purple-accent-color);
  }

  .font-weight-bold {
    font-weight: bold;
  }
</style>
