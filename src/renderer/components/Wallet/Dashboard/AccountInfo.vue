<template>
  <b-container
    fluid
    class="mt-3"
  >
    <div class="text-left">
      <Editable
        v-if="activeAddress !== null && wallet.accountsObject[activeAddress]"
        v-model="wallet.accountsObject[activeAddress].label"
      />
      <h3
        v-else
        class="d-inline-block"
      >
        All Accounts
      </h3>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Editable from '@/components/Wallet/Dashboard/AccountInfo/Editable.vue'

export default {
  name: 'AccountInfo',
  components: {
    'Editable': Editable
  },
  data () {
    return {
      wallet: this.$Wallet,
      debounce: null
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    })
  },
  methods: {
    ...mapActions('Wallet', [
      'setActiveAddress'
    ])
  }
}
</script>

<style scoped lang="scss">
</style>
