<template>
  <div class="dcc-home">
    <h3>
      DCC_HOME
    </h3>

    <Button 
      @click="apiTest"
      :disabled="loadingInProgress"
    >
      {{
        loadingInProgress? 'Loading...' : 'Test API'
      }}
    </Button>

    <div>
      {{ result }}
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
      result: null,
      loadingInProgress: false
    }
  },
  methods: {
    async apiTest() {
      if (this.loadingInProgress) {
        return;
      }

      const params = {};

      this.loadingInProgress = true;
      
      try {
        const result = await this.$api.$post(params, { API: 'DCC_API', path: '/dcc' });
        this.loadingInProgress = false;
        this.result = result;
      } catch (error) {
        this.result = error;
        this.loadingInProgress = false;
      }
    }
  }
}
</script>
