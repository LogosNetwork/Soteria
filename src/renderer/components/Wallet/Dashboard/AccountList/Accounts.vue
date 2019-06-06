<template>
  <b-tabs>
    <template slot="tabs">
      <b-nav-item
        href="#"
        :class="{ active: activeAddress === null }"
        @click="activeAddress = null"
      >
        All
      </b-nav-item>
      <b-nav-item
        v-for="account in wallet.accounts"
        :key="account.address"
        href="#"
        :class="{ active: account.address === activeAddress }"
        @click="() => {activeAddress = account.address; setCurrentAccount(account.address); }"
      >
        {{ account.label }}
      </b-nav-item>
      <b-button
        variant="link"
        class="p-0"
        @click="addAccount"
      >
        <font-awesome-layers class="fa-lg">
          <font-awesome-icon :icon="['fal','square']" />
          <font-awesome-icon
            :icon="['fal','plus']"
            transform="shrink-6"
            :style="{ color: 'white' }"
          />
        </font-awesome-layers>
      </b-button>
    </template>
  </b-tabs>
</template>

<script>
export default {
  name: 'Accounts',
  data () {
    return {
      wallet: this.$Wallet,
      activeAddress: null
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
    }
  }
}
</script>

<style scoped lang="scss">
.nav-link {
  color: var(--gray-600);
  padding: 0px;
  padding-left: 0.5rem;
  margin-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 0.5rem;
  border: 0px;
}
.nav-item:not(.active) > .nav-link:hover {
  color: var(--gray-400);
}
.nav-item.active > .nav-link {
  color: var(--base);
  border-bottom: 1px solid var(--primary);
  background: transparent;
}
</style>
