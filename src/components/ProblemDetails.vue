<template>
  <div class="problem-details">
    <div class="problem-text">
      <div class="d-flex justify-content-between">
        <div class="font-weight-bold">
          Problem #{{ problem.problem }}
        </div>

        <div 
          class="category"
          :class="categoryClass"
          v-if="problem.category"
        >
          {{ problem.category.toLowerCase() }}
        </div>
      </div>

      <hr>
      
      <template v-if="loadingInProgress">
        Loading...
      </template>

      <template v-else>
        <span
          v-if="problem.html"
          v-html="problem.html"
          class="html"
        ></span>

        <span
          v-else
          class="text"
        >
          {{ problem.text }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProblemDetails',
  props: {
    problemKey: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    categoryClass() {
      if (!this.problem.category) {
        return '';
      }

      return `category-${(this.problem.category).toLowerCase()}`;
    }
  },
  data() {
    return {
      loadingInProgress: false,
      problem: {}
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    resetData() {
      this.problem = {};
    },
    loadData() {
      this.resetData();
      this.getProblem();
    },
    async getProblem() {
      if (this.loadingInProgress) {
        return;
      }

      const params = {};
      params['action'] = 'get_problem';
      params['key'] = this.problemKey;

      this.loadingInProgress = true;
      
      try {
        const result = await this.$api.$post(params, { API: 'DCC_API', path: '/api' });
        this.loadingInProgress = false;
        this.problem = result.data;
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;
      }
    }
  }
}
</script>

<style scoped>
  .problem-details {
    padding-bottom: 2em;
  }

  .problem-text {
    padding: 1em;
    border-radius: 5px;
    background: var(--default-background);
    box-shadow: var(--default-box-shadow);
    text-align: justify;
  }

  @media screen and (min-width: 768px) {
    .problem-text {
      max-width: 500px;
    }
  }
</style>
