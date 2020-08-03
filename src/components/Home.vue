<template>
  <div class="home">
    <h1 class="main-header">
      Hello. It's nice to meet you.
    </h1>

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
      <strong>Esteh, Belgrade (Republic of Serbia)</strong>
      -
      <i class="text-muted">Full Stack Web Developer</i>
      <br>
      <span class="text-muted">
        February 2014 - present
      </span>
    </div>

    <ul>
      <li>
        Developing Enterprise Sales Management solutions for an in-house product
      </li>

      <li>
        Building responsive web applications, using best UI/UX practices
      </li>

      <li>
        Closely working with clients in order to fully understand their needs
      </li>
    </ul>

    <h4 class="section-header">
      Technical skills
    </h4>

    <ul>
      <li>
        Extensive experience with Javascript, combined with other tools, such as VueJS and jQuery
      </li>

      <li>
        Using Java EE and NodeJS for most of our backend services
      </li>

      <li>
        MySQL and Redis for all DB requirements
      </li>

      <li>
        Comfortable with Linux/Unix workflow
      </li>
      
      <li>
        Strong understanding of Data Structures and Algorithms
      </li>
    </ul>

    <h4 class="section-header">
      Languages
    </h4>

    <ul>
      <li>
        English - Conversation level
      </li>

      <li>
        German - Basic level
      </li>

      <li>
        Serbian - Conversation level
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
    color: #00AB44;
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
    border-radius: 1em;
  }
</style>
