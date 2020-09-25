<template>
  <div class="home">
    <div class="site-name">
      mihailozecar.com
    </div>

    <h1 class="main-header">
      Hello. It's nice to meet you.
    </h1>

    <div class="text-center mz-image-container mobile-only">
      <img 
        src="mz-resized.jpg"
        class="mz-image"
        alt="Mihailo Zecar image"
      >
    </div>

    <hr>

    <h4 class="section-header">
      Summary
    </h4>

    <p>
      Experienced Full Stack Web Developer with a demonstrated history of 
      working in the computer software industry. Very passionate about crafting 
      the best Web experience for customers, with attention to most peculiar 
      details. Strong communication skills paired with a team oriented workflow. 
      Always ready to learn more.
    </p>

    <h4 class="section-header">
      Experience
    </h4>

    <div>
      <strong>Esteh, Belgrade</strong>
      -
      <i class="text-muted">Full Stack Web Developer</i>
      <br>
      <span class="text-muted">
        February 2014 - present
      </span>
    </div>

    <ul class="unordered-list">
      <li>
        Developing Enterprise Sales Management solutions for an in-house product
      </li>

      <li>
        Building resilient and scalable web applications, using best UI/UX practices
      </li>

      <li>
        Closely working with clients in order to fully understand their needs
      </li>
    </ul>

    <h4 class="section-header">
      Technical skills
    </h4>

    <ul class="unordered-list">
      <li>
        Extensive experience with Javascript, combined with other tools, such as VueJS and AWS Amplify
      </li>

      <li>
        Using Java EE and AWS for most of the backend APIs, including serverless technologies (AWS Lambda)
      </li>

      <li>
        Knowledge of relational and non-relational databases (MySQL, DynamoDB, Redis)
      </li>

      <li>
        Strong understanding of Data Structures and Algorithms
      </li>
    </ul>

    <h4 class="section-header">
      Certifications
    </h4>

    <ul class="unordered-list">
      <li>
        AWS Certified Cloud Practitioner (2020)
      </li>
    </ul>

    <h4 class="section-header">
      Languages
    </h4>

    <ul class="unordered-list">
      <li>
        English - Conversational level
      </li>

      <li>
        German - Basic level
      </li>

      <li>
        Serbian - Conversational level
      </li>
    </ul>

    <h4 class="section-header">
      Education
    </h4>

    <div>
      <strong>Faculty of Technical Sciences (Singidunum University), Belgrade (Serbia)</strong> - <i class="text-muted">Software and Data Engineer BC</i>
      <br>
      <span class="text-muted">
        October 2016 - October 2020 (expected)
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>
  .section-header {
    color: var(--green-accent-color);
    margin-bottom: 0px;
  }

  .text-muted {
    color: #666;
  }

  .home {
    padding: 2em;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    background: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: .5em;
    margin-top: 1em;
    margin-bottom: 2em;
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

  .unordered-list {
    margin-top: .5em;
    margin-bottom: .5em;
  }
</style>
