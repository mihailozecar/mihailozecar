<template>
  <div class="dcc-home">
    <h3>
      DCC_HOME
    </h3>
  </div>
</template>

<script>
export default {
  name: 'DccHome',
  mounted() {
    this.apiTest();
  },
  methods: {
    async apiTest() {
      const result = await this.$api.$post({}, { API: 'DCC_API' });
      console.log(result);
    }
  }
}
</script>
