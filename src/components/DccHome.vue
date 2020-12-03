<template>
  <div class="dcc-home">
    <h3>
      DCC_HOME
    </h3>

    <Button 
      @click="loadData"
      :disabled="loadingInProgress"
    >
      {{
        loadingInProgress? 'Loading...' : 'Refresh'
      }}
    </Button>

    <div class="d-flex">
      <ul class="flex-1">
        <li
          v-for="problem in problemList"
          :key="problem.Key"
        >
          {{ problem.Key }}
          <Button
            @click="getProblemDetails(problem)"
          >
            Details
          </Button>
        </li>
      </ul>

      <div class="flex-1 preview">
        <textarea
          rows="20"
          class="w-100"
          readonly
          :value="problemDetailsFormatted"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  name: 'DccHome',
  components: {
    Button
  },
  data() {
    return {
      loadingInProgress: false,
      problemList: [],
      problemDetails: null
    }
  },
  computed: {
    problemDetailsFormatted() {
      if (!this.problemDetails) {
        return null;
      }

      return JSON.stringify(this.problemDetails, null, 2);
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    resetData() {
      this.problemList = [];
      this.problemDetails = null;
    },
    loadData() {
      this.resetData();
      this.listAllProcessedObjects();
    },
    async listAllProcessedObjects() {
      if (this.loadingInProgress) {
        return;
      }

      const params = {};
      params['action'] = 'list';

      this.loadingInProgress = true;
      
      try {
        const result = await this.$api.$post(params, { API: 'DCC_API', path: '/api' });
        this.loadingInProgress = false;
        this.problemList = result.data;
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;
      }
    },
    async getProblemDetails(problem) {
      if (this.loadingInProgress) {
        return;
      }

      const params = {};
      params['action'] = 'get_problem';
      params['key'] = problem.Key;

      this.loadingInProgress = true;
      
      try {
        const result = await this.$api.$post(params, { API: 'DCC_API', path: '/api' });
        this.loadingInProgress = false;
        this.problemDetails = result.data;
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;
      }
    }
  }
}
</script>

<style scoped>
  .preview {
    margin: 1em;
  }
</style>
