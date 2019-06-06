<template>
  <b-form-group
    v-if="wallet && wallet.accounts.length > 0"
    class="text-left fitPanel scroller pt-3 pb-3 mb-0"
    :label="$t('logosAccounts')"
    :label-sr-only="true"
  >
    <div
      tabindex="-1"
      role="group"
    >
      <div
        id="accountSelectorRadios"
        role="radiogroup"
        tabindex="-1"
        class="btn-group-toggle"
      >
        <label
          v-for="account in wallet.accounts"
          :key="account.address"
          class="btn btn-transparent accountSelector"
          :class="{ active: account.address === wallet.currentAccountAddress }"
        >
          <input
            :id="`accountSelectorRadios_${account.address}`"
            type="radio"
            name="accountSelector"
            autocomplete="off"
            :value="account.address"
            @click="setCurrentAccount(account.address)"
          >
          <div>{{ account.label }}</div>
          <small>{{ accountBalance(account.balance) }} <span v-t="'logos'" /></small>
        </label>
      </div>
    </div>
    <b-button
      class="text-center w-100"
      variant="link"
      @click="addAccount"
    >
      <span v-t="'addNewAccount'" />
    </b-button>
  </b-form-group>
</template>

<script>
import Logos from '@logosnetwork/logos-rpc-client'

export default {
  name: 'AccountSelector',
  data () {
    return {
      wallet: this.$Wallet
    }
  },
  methods: {
    setCurrentAccount (address) {
      this.wallet.currentAccountAddress = address
    },
    addAccount: async function () {
      let newAccount = await this.wallet.createAccount(null, false)
      delete this.wallet._accounts[newAccount.address]
      this.$set(this.wallet._accounts, newAccount.address, newAccount)
      for (let token in this.wallet._tokenAccounts) {
        let tkAccount = this.wallet._tokenAccounts[token]
        delete this.wallet._tokenAccounts[token]
        this.$set(this.wallet._tokenAccounts, tkAccount.address, tkAccount)
      }
    },
    accountBalance (reason) {
      return Logos.convert.fromReason(reason, 'LOGOS')
    }
  }
}
</script>

<style scoped lang="scss">
  #accountSelectorRadios {
    width: calc(100vw * 0.25);
  }
  .accountSelector {
    text-align: left;
    color: $gray-600;
    margin-left: 1rem;
    margin-right: 1rem;
    width: calc(100% - 2rem);
  }
  .accountSelector:not(.active):hover {
    cursor: pointer;
    background-color: theme-color("tertiary");
    color: $gray-400;
  }
  .accountSelector.active {
    color: theme-color("base");
    background-color: theme-color("bg");
  }
  .accountSelector > small {
    display: block;
  }
  .fitPanel {
    overflow-x: hidden;
    margin-bottom: none;
    height: calc(100vh - 4.5rem - 200px);
  }
</style>
