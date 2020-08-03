<template>
  <div class="base-layout container-fluid">
    <div class="header p-2 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="logo accent-bg p-2">
          <a href="/" class="no-link">
            MZ
          </a>
        </div>
        
        <div class="ml-1">
          mihailozecar.com
        </div>
      </div>
    </div>

    <div class="sidebar p-2 accent">
      <div class="text-center">
        <img 
          src="@/assets/mz-resized.jpg"
          class="mz-image"
          alt="Mihailo Zecar image"
          width="150px"
          height="150px"
        >
      </div>

      <hr>

      <div>
        <strong>Name:</strong>
      </div>

      <div>
        Mihailo Zečar
      </div>

      <hr>

      <div>
        <strong>Location:</strong>
      </div>

      <div>
        Belgrade, Serbia
      </div>
      
      <hr>

      <div>
        <strong>Occupation:</strong>
      </div>

      <div>
        Full Stack Web Developer <br> (focus on frontend)
      </div>

      <hr>

      <div>
        <strong>Contact:</strong>
      </div>

      <div 
        class="twitter-link"
      >
        <a 
          href="https://twitter.com/mihailozecar"
          class="no-link"
          target="_blank"
        >
          <i class="fab fa-twitter"></i>
          @mihailozecar
        </a>
      </div>
    </div>

    <div class="content">
      <Home></Home>
    </div>

    <div class="footer px-2 d-flex align-items-center">
      All rights reserved. {{ new Date().getFullYear() }}
    </div>
  </div>
</template>

<script>
import Home from '@/components/Home.vue'

export default {
  name: 'BaseLayout',
  components: {
    Home
  }
}
</script>

<style>
  /* global styles */
  html,
  body,
  #app {
    color: black;
    background: #f9f9f9;
    height: 100%;
    position: relative;

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
    color: #2d005f;;
  }

  .accent-bg {
    color: white;
    background-color: #2d005f;;
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

<style scoped>
  .base-layout {
    height: 100%;
    padding-left: 0px;
    padding-right: 0px;
    display: grid;
    grid-template-columns: 1fr 250px;
    grid-template-rows: 60px 1fr 40px;
    grid-template-areas:
      'header header'
      'content sidebar'
      'content sidebar'
      'footer footer';
  }

  .header {
    grid-area: header;
    border-bottom: 2px solid #2d005f;
  }

  .sidebar {
    grid-area: sidebar;
    border-left: 2px solid #2d005f;
  }

  .content {
    grid-area: content;
    padding-left: 15px;
    padding-right: 15px;
    background-color: white;
  }

  .footer {
    grid-area: footer;
    border-top: 2px solid #2d005f;
  }

  .logo {
    border-radius: 3px;
  }

  .mz-image {
    border-radius: 75px;
    width: 150px;
    height: 150px;
  }

  .twitter-link:hover {
    background-color: rgba(45, 0, 95, .1);
    cursor: pointer;
    border-radius: 3px;
  }

  @media screen and (max-width: 992px) {
    .base-layout {
      grid-template-columns: 1fr 200px;
    }

    .mz-image {
      border-radius: 50px;
      width: 100px;
      height: 100px;
    }
  }

  @media screen and (max-width: 768px) {
    .base-layout {
      grid-template-columns: 1fr;
      grid-template-rows: 40px 1fr 40px;
      grid-template-areas:
        'header'
        'content'
        'footer';
    }

    .sidebar {
      display: none;
    }
  }
</style>
