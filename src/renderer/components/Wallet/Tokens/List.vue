<template>
  <b-container
    fluid
    class="tokenAccountContainer"
  >
    <b-row>
      <b-col
        class="tokenAccountList"
      >
        <Accounts
          :addtoken="addtoken"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Accounts from '@/components/Wallet/Tokens/List/Accounts.vue'

export default {
  name: 'TokenAccountList',
  components: {
    Accounts
  },
  props: {
    addtoken: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
.tokenAccountList {
  max-width: 100%;
}
.tokenAccountContainer {
  height: 25px;
}
</style>
