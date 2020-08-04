<template>
  <div class="base-layout container-fluid">
    <div class="content">
      <Home></Home>
    </div>

    <div class="sidebar p-2">
      <div class="text-center mz-image-container hide-mobile">
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
    overflow: auto;
    background: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 1.5em;
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
    border-bottom: 1px solid rgba(0,0,0,0.23);
    margin-bottom: .5em;
    padding-bottom: .5em;
  }

  .mz-image {
    border-radius: 75px;
  }

  .twitter-link:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .base-layout {
      display: block;
    }
  }
</style>
