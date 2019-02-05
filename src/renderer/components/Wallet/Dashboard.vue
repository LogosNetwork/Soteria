<template>
  <div class="dashboard-container">
    <div class="row h-100 justify-content-center align-items-center">
      <h3>Righteous you made it to the end of the maze</h3>
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-100" variant="secondary" v-t="'previous'"  v-on:click="previous()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
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
    height: calc(100vh - 88px);
  }
</style>
