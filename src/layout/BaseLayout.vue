<template>
  <div class="base-layout container-fluid">
    <div class="sidebar p-2">
      <div class="text-center mz-image-container">
        <img 
          src="@/assets/mz-resized.jpg"
          class="mz-image"
          alt="Mihailo Zecar image"
          width="150px"
          height="150px"
        >
      </div>

      <div>
        <strong class="accent">Name</strong>
      </div>

      <div class="contact-margin">
        Mihailo Zečar
      </div>

      <div>
        <strong class="accent">Location</strong>
      </div>

      <div class="contact-margin">
        Belgrade, Republic of Serbia
      </div>
      
      <div>
        <strong class="accent">Occupation</strong>
      </div>

      <div class="contact-margin">
        Full Stack Web Developer
      </div>

      <div>
        <strong class="accent">Contact</strong>
      </div>

      <div class="twitter-link contact-margin">
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

<style scoped>
  .base-layout {
    position: relative;
    height: 100%;
    padding: 0px;
    display: grid;
    grid-template-columns: 1fr 250px;
    grid-template-rows: 1fr;
    grid-template-areas:
      'content sidebar'
      'content sidebar';
  }

  .sidebar {
    grid-area: sidebar;
    /* border-left: 1px solid #2d005f; */
    overflow: auto;
    background: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .content {
    grid-area: content;
    overflow: auto;
    padding: 1em;
  }

  .contact-margin {
    margin-bottom: 1em;
  }

  .logo {
    border-radius: 3px;
  }

  .mz-image-container {
    border-bottom: 1px solid #2d005f;
    margin-bottom: .5em;
    padding-bottom: .5em;
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
    .mz-image {
      width: 100px;
      height: 100px;
    }
  }

  @media screen and (max-width: 768px) {
    .base-layout {
      grid-template-columns: 1fr 200px;
      grid-template-rows: 40px 1fr;
    }
  }
</style>
