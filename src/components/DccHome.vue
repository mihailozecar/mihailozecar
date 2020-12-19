<template>
  <div class="dcc-home px-2">
    <template v-if="isDccHome">
      <h3 
        v-if="loadingInProgress"
      >
        Loading...
      </h3>
      <div
        class="d-flex align-items-center flex-wrap"
        v-else
      >
        <FormGroup
          label="Search"
          v-model="search"
          @input="currentPage = 0"
        ></FormGroup>

        <div>
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

        <div class="ml-2">
          Problems: {{ problemListFilteredSorted.length }}
        </div>

        <div 
          class="ml-2 gaps mobile-margin-top"
          v-if="gaps.length > 0"
        >
          Gaps: {{ gaps.join(', ') }}
        </div>

        <div class="flex-1"></div>

        <div class="d-flex flex-wrap mobile-margin-top">
          <Button
            class="ml-2"
            @click="currentPage = 0"
          >
            &lt;&lt;
          </Button>

          <Button
            class="ml-2"
            @click="currentPage--"
            :disabled="currentPage == 0"
          >
            &lt;
          </Button>

          <Button 
            class="ml-2"
            v-for="i in displayedPages"
            :key="`page_${i}`"
            :primary="currentPage == i"
            @click="currentPage = i"
          >
            {{ i + 1 }}
          </Button>

          <Button
            class="ml-2"
            @click="currentPage++"
            :disabled="currentPage == pages.length - 1"
          >
            &gt;
          </Button>

          <Button
            class="ml-2"
            @click="currentPage = pages.length - 1"
          >
            &gt;&gt;
          </Button>
        </div>
      </div>
      
      <div class="d-flex flex-wrap">
        <div
          v-for="problem in pages[currentPage]"
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
        primary
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
      pageSize: 50,
      currentPage: 0,
      pageSectionLimit: 5,
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
    pages() {
      const pages = [[]];
      let counter = 0;

      for (let i=0; i<this.problemListFilteredSorted.length; i++) {
        const problem = this.problemListFilteredSorted[i];

        if (counter >= this.pageSize) {
          counter = 0;
          pages.push([]);
        }

        pages[pages.length - 1].push(problem);
        counter++;
      }

      return pages;
    },
    displayedPages() {
      const pageSection = this.getPageSection(this.currentPage);
      const displayedPages = [];

      for (let i=0; i<this.pageSectionLimit; i++) {
        const pageIndex = i + (this.pageSectionLimit * pageSection);
        
        if (pageIndex < this.pages.length) {
          displayedPages.push(pageIndex);
        }
      }

      return displayedPages;
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
    gaps() {
      const result = [];
      let previousNum = 0;

      if (this.search || this.selectedCategoryFilters.length > 0) {
        return result;
      }

      for (let i=this.problemListFilteredSorted.length - 1;  i >= 0; i--) {
        const problem = this.problemListFilteredSorted[i];
        const currentNum = parseInt(problem.num);

        if (currentNum - previousNum != 1) {
          result.push(`${currentNum} - ${previousNum}`);
        }

        previousNum = currentNum;
      }

      return result.reverse();
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
      this.currentPage = 0;
    },
    getPageSection(page) {
      return Math.floor(page / this.pageSectionLimit);
    }
  }
}
</script>

<style scoped>
  .problem {
    background: var(--default-background);
    padding: 1.5em;
    margin: 1em;
    cursor: pointer;
    border-radius: 1em;
    box-shadow: var(--default-box-shadow);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
  }

  .problem:hover {
    box-shadow: var(--default-box-shadow-hover);
  }

  .category {
    padding: 3px 6px;
    border-radius: 5px;
    background: white;
    box-shadow: var(--default-box-shadow);
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

  .gaps {
    color: #f55060;
  }

  @media screen and (max-width: 768px) {
    .problem {
      padding: 1em .5em;
      margin: .5em;
    }

    .mobile-margin-top {
      margin-top: .5rem;
    }
  }

  @media (prefers-color-scheme: dark) {
    .category {
      color: black !important;
    }
  }
</style>
