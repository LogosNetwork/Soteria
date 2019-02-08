<template>
  <div class="dashboard-container">
    <b-container class="h-100" fluid>
      <b-row class="h-100">
        <b-col cols="3" class="pt-3">
          Account Selector
        </b-col>
        <b-col class="dashboard pt-3">
          Dashboard
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  methods: {
    previous () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
  .dashboard-container {
    overflow:hidden;
    height: calc(100vh);
    background-color: var(--secondary)
  }
  .dashboard {
    background-color: var(--bg)
  }
</style>
