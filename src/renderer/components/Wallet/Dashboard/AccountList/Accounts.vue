<template>
  <div>
    <div class="accountList">
      <ul
        role="tablist"
        class="nav nav-tabs scroller"
      >
        <b-nav-item
          href="#"
          class="mb-0"
          :class="{ active: activeAddress === null }"
          @click="setCurrentAccount(null)"
        >
          All
        </b-nav-item>
        <b-nav-item
          v-for="account in $Wallet.accounts"
          :key="account.address"
          href="#"
          class="mb-0"
          :class="{ active: account.address === activeAddress }"
          @click="setCurrentAccount(account.address)"
          @dblclick="editLabel(account.address)"
        >
          <input
            v-if="editing[account.address]"
            :ref="`editable${account.address}`"
            v-model="$Wallet.accountsObject[account.address].label"
            v-autowidth="{maxWidth: '250px', minWidth: '20px', comfortZone: 0}"
            type="text"
            :placeholder="$t('accountName')"
            class="p-0 m-0 border-0 bg-transparent text-inherit"
            @keydown.enter.prevent
            @keyup.enter="saveLabel(account.address)"
          >
          <span
            v-else
          >
            {{ account.label }}
          </span>
        </b-nav-item>
      </ul>
    </div>
    <b-button
      v-b-tooltip.hover
      variant="link"
      class="p-0 align-top"
      :title="$t('addNewAccount')"
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

export default {
  name: 'Accounts',
  data () {
    return {
      editing: {}
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
    ]),
    setCurrentAccount (address) {
      this.setActiveAddress(address)
      for (let addr in this.editing) {
        if (addr !== address) this.saveLabel(addr)
      }
      if (address !== null) this.$Wallet.currentAccountAddress = address
    },
    editLabel (address) {
      Vue.set(this.editing, address, true)
      Vue.nextTick(() => {
        this.$refs[`editable${address}`][0].focus()
      })
    },
    saveLabel (address) {
      Vue.set(this.editing, address, false)
    },
    addAccount: async function () {
      let newAccount = await this.$Wallet.createAccount(null, false)
      delete this.$Wallet._accounts[newAccount.address]
      this.$set(this.$Wallet._accounts, newAccount.address, newAccount)
      for (let token in this.$Wallet._tokenAccounts) {
        let tkAccount = this.$Wallet._tokenAccounts[token]
        delete this.$Wallet._tokenAccounts[token]
        this.$set(this.$Wallet._tokenAccounts, tkAccount.address, tkAccount)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.accountList {
  width: calc(100% - 28px);
  display: inline-block;
}
.text-inherit {
  color: inherit
}
.nav-link {
  color: $gray-600;
  padding: 0px;
  padding-left: 0.5rem;
  margin-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 0.5rem;
  border: 0px;
}
.nav-item:not(.active) > .nav-link:hover {
  color: $gray-400;
}
.nav-item.active > .nav-link {
  color: theme-color("base");
  border-bottom: 1px solid theme-color("primary");
  background: transparent;
}
.nav-item:first-child > .nav-link {
  margin-left: 0px;
}
</style>
