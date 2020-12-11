<template>
  <div class="problem-details">
    <div class="problem-text">
      {{ 
        loadingInProgress
        ? 'Loading...'
        : problem.text
      }}
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
  .problem-text {
    padding: 1em;
    border-radius: 5px;
    border: 1px solid white;
    box-shadow: 9.91px 9.91px 15px #E4E4E4, -9.91px -9.91px 15px #FFFFFF;
    text-align: justify;
  }
</style>
