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
    <small
      v-t="'notOpened'"
      class="text-center text-muted"
    />
    <div
      v-if="false"
    >
      <div
        v-for="index in 500"
        :key="index"
        class="text-left"
      >
        Transaction {{ index }}
      </div>
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
