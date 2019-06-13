<template>
  <b-container
    fluid
    class="mt-3"
  >
    <div class="text-left">
      <small
        class="text-left text-uppercase text-muted"
      >
        <span v-t="'recentTransactions'" />
      </small>
    </div>
    <div
      v-for="index in 500"
      :key="index"
      class="text-left"
    >
      Transaction {{ index }}
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'AccountHistory'
}
</script>

<style scoped lang="scss">
</style>
