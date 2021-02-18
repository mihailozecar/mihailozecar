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
  :root {
    --green-accent-color: #008936;
    --light-green-accent-color: #b3e6c7;
    --purple-accent-color: #651fff;
    --light-purple-accent-color: #b388ff;
    --light-purple-accent-color-dim-shade: rgba(179, 136, 255, .3);
    --default-box-shadow: 3px 2px 10px 0px rgba(0, 0, 0, 0.1);
    --default-box-shadow-hover: 3px 2px 10px 0px rgba(0, 0, 0, 0.36);
    --default-background: #fafafa;
    --default-background-light: var(--default-background);
    --default-color: #333;
    --btn-press-transform: translate(1.5px, 2.2px);
    --btn-press-box-shadow: 3px 2px 10px 0px rgba(0, 0, 0, 0.24);
    --loading-animation: loading 3s infinite;
    --error-color: #f3384a;
    --success-color: var(--green-accent-color);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --default-background: #222831;
      --default-background-light: #30475E;
      --default-box-shadow: 3px 2px 10px 0px rgba(0, 0, 0, 0.36);
      --default-box-shadow-hover: 3px 2px 10px 0px rgba(188, 111, 241, 0.5);
      --default-color: white;
      --purple-accent-color: #892cdc;
      --light-purple-accent-color: #bc6ff1;
      --success-color: var(--light-green-accent-color);
    }
  }

  html,
  body,
  #app {
    color: var(--default-color);
    background: var(--default-background);
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

  .btn-press:active {
    transform: var(--btn-press-transform);
    box-shadow: var(--btn-press-box-shadow);
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

  .mt-2 {
    margin-top: .5rem;
  }

  .ml-1 {
    margin-left: .25rem;
  }

  .ml-2 {
    margin-left: .5rem;
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

  .router-link {
    cursor: pointer;
    text-decoration: underline;
  }

  .loading-message {
    color: #ff5722;
  }

  .success-message {
    color: var(--success-color);
  }

  .error-message {
    color: var(--error-color);
  }

  @keyframes loading {
    0% {
      border-color: var(--light-purple-accent-color);
      color: var(--light-purple-accent-color);
    }
    33% {
      border-color: #0bb69f;
      color: #0bb69f;
    }
    66% {
      border-color: #e91e63;
      color:#e91e63;
    }
    100% {
      border-color: #5b7dff;
      color: #5b7dff;
    }
  }

  .category {
    padding: 3px 6px;
    border-radius: 5px;
    background: white;
    box-shadow: var(--default-box-shadow);
  }

  .category.category-easy {
    background: var(--light-green-accent-color);
  }

  .category.category-medium {
    background: #ffe082;
  }

  .category.category-hard {
    background: #f55060;
    color: white;
  }

  @media (prefers-color-scheme: dark) {
    .category {
      color: black !important;
    }

    .loading-message {
      color: #ffe082;
    }
  }
</style>
