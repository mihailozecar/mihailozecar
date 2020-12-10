<template>
  <div class="dcc-home p-2">
    <h3>
      Problems
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
      <div class="flex-1 mt-1 problem-list">
        <div
          v-for="problem in problemList"
          :key="problem.Key"
          class="list-item"
          :class="problem.active? 'active' : ''"
          @click="selectProblem(problem)"
        >
          <div>
            <span class="font-weight-bold">
              Problem {{ problem.num }}
            </span>

            <span 
              :class="`category category-${problem.category}`"
            >
              {{ problem.category }}
            </span>
          </div>
          <div>
            <small>
              {{ problem.date }}
            </small>
          </div>
        </div>
      </div>

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

        let processedProblems = [];

        for (const problem of result.data) {
          const processedProblem = {
            ...problem,
            ...this.preprocessProblem(problem)
          };

          processedProblems.push(processedProblem);
        }
        
        processedProblems = processedProblems.sort((a,b) => a.num > b.num? -1 : 1);
        this.problemList = processedProblems;

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
    },
    selectProblem(problem) {
      for (const problem of this.problemList) {
        problem.active = false;
      }

      problem.active = true;
      this.getProblemDetails(problem);
    },
    preprocessProblem(problem) {
      const key = problem.Key;
      const info = key.split('/')[1].split('-');
      const dateRaw = info[0];
      const date = `${dateRaw.substring(6, 8)}.${dateRaw.substring(4, 6)}.${dateRaw.substring(0, 4)}.`;
      const num = info[1];
      const category = info[2].substring(0, info[2].indexOf('.')).toLowerCase();

      return {
        date,
        dateRaw,
        num,
        category
      };
    }
  }
}
</script>

<style scoped>
  .preview {
    margin: 1em;
  }

  .list-item {
    background: white;
    padding: 1em;
    border-radius: 5px;
    box-shadow: 3px 2px 10px 0px rgba(0, 0, 0, 0.1);
    margin-top: 1em;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
  }

  .list-item:hover {
    box-shadow: 3px 2px 10px 0px rgba(0, 0, 0, 0.36);
  }

  .list-item.active {
    box-shadow: 3px 2px 10px 0px var(--light-purple-accent-color);

  }

  .category {
    padding: 3px 6px;
    border-radius: 5px;
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
</style>
