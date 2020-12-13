<template>
  <div class="base-layout container-fluid">
    <div class="content">
      <router-view></router-view>
    </div>

    <div class="sidebar p-2">
      <div class="text-center mz-image-container hide-mobile">
        <img 
          src="mz-resized.jpg"
          class="mz-image"
          alt="Mihailo Zecar image"
          width="150px"
          height="150px"
        >
      </div>

      <div>
        <strong>
          Contact
        </strong>
      </div>

      <hr>

      <div>
        <strong class="accent">
          Name
        </strong>
      </div>

      <div class="contact-margin">
        Mihailo Zečar
      </div>

      <div>
        <strong class="accent">
          Location
        </strong>
      </div>

      <div class="contact-margin">
        Belgrade, Republic of Serbia
      </div>

      <div>
        <strong class="accent">
          Social
        </strong>
      </div>

      <div class="social-link">
        <i class="fab fa-linkedin"></i>
        <a 
          href="https://www.linkedin.com/in/mihailo-zecar"
          target="_blank"
          rel="noopener"
        >
          Mihailo Zecar
        </a>
      </div>

      <div class="social-link">
        <i class="fab fa-twitter"></i>
        <a 
          href="https://twitter.com/mihailozecar"
          target="_blank"
          rel="noopener"
        >
          @mihailozecar
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLayout'
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
    background: var(--default-background);
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

  .social-link {
    margin-top: .5em;
    margin-bottom: 1em;
  }

  .social-link:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .base-layout {
      display: block;
    }

    .sidebar {
      padding-bottom: 5em;
    }
  }

  @media (prefers-color-scheme: dark) {
    .social-link a {
      color: #bbe1fa;
    }
  }
</style>
