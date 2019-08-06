<template>
  <b-button
    class="tokenFilterButton"
    variant="transparent"
    :pressed="selected"
    @click.stop="setCurrentAccount(token.address)"
  >
    <div class="d-flex justify-content-between">
      <div class="text-truncate">
        <span>{{ token.name }} ({{ token.symbol }})</span>
      </div>
    </div>
  </b-button>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TokenSelector',
  props: {
    token: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    selected () {
      return this.activeAddress === this.token.address
    }
  },
  created () {
    if (!this.$Wallet.tokenAccounts[this.activeAddress]) {
      for (const address in this.$Wallet.tokenAccounts) {
        this.setActiveAddress(address)
        break
      }
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'setActiveAddress'
    ]),
    setCurrentAccount (address) {
      this.setActiveAddress(address)
    }
  }
}
</script>
<style scoped lang="scss">
.tokenFilterButton {
  text-align: left;
  color: $gray-600;
  width: 100%;
}
.tokenFilterButton:not(.active):hover {
  background-color: theme-color("tertiary");
  color: $gray-400;
}
.tokenFilterButton.active {
  color: theme-color("base");
  background-color: theme-color("bg");
}
.tokenFilterButton > small {
  display: block;
}
</style>
