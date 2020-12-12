<template>
  <div class="dcc-home px-2">
    <template v-if="isDccHome">
      <h3 
        v-if="loadingInProgress"
      >
        Loading...
      </h3>
      <div
        class="d-flex align-items-center"
        v-else
      >
        <FormGroup
          label="Search"
          v-model="search"
        ></FormGroup>

        <Button
          v-for="category in categoryFilter"
          :key="category.id"
          class="ml-2"
          :primary="category.value"
          @click="onClickCategoryFilter(category)"
        >
          {{ category.id }}
        </Button>
      </div>
      
      <div class="d-flex flex-wrap">
        <div
          v-for="problem in problemListFilteredSorted"
          :key="problem.Key"
          class="problem"
          @click="selectProblem(problem)"
        >
          <div>
            <span class="font-weight-bold">
              Problem #{{ problem.num }}
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
    </template>

    <template v-else>
      <Button
        class="m-1-em"
        @click="backToDccHome"
      >
        Back
      </Button>

      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import FormGroup from '@/components/FormGroup.vue'

export default {
  name: 'DccHome',
  components: {
    Button,
    FormGroup
  },
  data() {
    return {
      loadingInProgress: false,
      problemList: [],
      search: null,
      categoryFilter: [
        {
          id: 'easy',
          value: false
        },
        {
          id: 'medium',
          value: false
        },
        {
          id: 'hard',
          value: false
        }
      ]
    }
  },
  computed: {
    problemListFiltered() {
      const filtered = this.problemList.filter(problem => {
        let searchMatch = true;
        let categoryMatch = true;

        if (this.search && (problem.num + '').indexOf(this.search) == -1) {
          searchMatch = false;
        }

        if (this.selectedCategoryFilters.length > 0 && this.selectedCategoryFilters.indexOf(problem.category) == -1) {
          categoryMatch = false;
        }

        return searchMatch && categoryMatch;
      });
      return filtered;
    },
    problemListFilteredSorted() {
      return [...this.problemListFiltered].sort((a,b) => parseInt(a.num) > parseInt(b.num)? -1 : 1);
    },
    selectedCategoryFilters() {
      const filters = this.categoryFilter.filter(category => category.value);
      return filters.map(filter => filter.id);
    },
    problemsCount() {
      const count = {};

      for (const problem of this.problemListFilteredSorted) {
        if (!count[problem.category]) {
          count[problem.category] = 0;
        }

        count[problem.category]++;
      }

      return count;
    },
    isDccHome() {
      return this.$route.name == 'dcc-home';
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    resetData() {
      this.problemList = [];
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
        
        this.problemList = processedProblems;

      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;
      }
    },
    selectProblem(problem) {
      this.$router.push({ name: 'problem-details', params: { problemKey: problem.Key } });
    },
    backToDccHome() {
      this.$router.push({ name: 'dcc-home' });
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
    },
    onClickCategoryFilter(category) {
      category.value = !category.value;
    }
  }
}
</script>

<style scoped>
  .preview {
    margin: 1em;
  }

  .problem {
    background: white;
    padding: 1.5em;
    margin: 1em;
    cursor: pointer;
    border-radius: 1em;
    box-shadow: 3px 2px 10px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
  }

  .problem:hover {
    box-shadow: 3px 2px 10px 0px rgba(0, 0, 0, 0.36);
  }

  .category {
    padding: 3px 6px;
    border-radius: 5px;
    background: white;
    box-shadow: 3px 2px 10px 0px rgba(0, 0, 0, 0.1);
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

  .m-1-em {
    margin: 1em;
  }
</style>
