<template>
  <div class="tokenPanel">
    <b-form-group class="text-left searchWrapper p-2 mb-0 border-bottom">
      <b-form-input
        id="tokenSearch"
        v-model="tokenName"
        size="sm"
        :placeholder="$t('searchTokens')"
        trim
      />
    </b-form-group>
    <div class="filterButtonWrapper scroller px-3">
      <TokenSelectorButton
        v-for="account in tokenAccounts"
        :key="account.address"
        :token="account"
      />
    </div>
    <b-form-group
      class="text-left createWrapper p-2 mb-0 border-top"
    >
      <b-button
        v-b-modal.createToken
        variant="outline-primary"
        size="sm"
        class="align-top text-white w-100"
      >
        <font-awesome-icon
          :icon="['fal','plus']"
          class="mr-2"
        />
        <span v-t="'createToken'" />
      </b-button>
    </b-form-group>
    <b-modal
      id="createToken"
      body-class="pb-0"
      modal-class="pl-0"
      content-class="scroller"
      size="full"
      no-fade
      hide-footer
      hide-header
    >
      <CreateToken />
    </b-modal>
  </div>
</template>

<script>
import TokenSelectorButton from '@/components/Wallet/Tokens/Nav/TokenSelector.vue'
import CreateToken from '@/components/Wallet/Tokens/CreateToken.vue'

export default {
  name: 'TokenSelectorNav',
  components: {
    TokenSelectorButton,
    CreateToken
  },
  data () {
    return {
      tokenName: null
    }
  },
  computed: {
    tokenAccounts () {
      if (this.tokenName === '' || this.tokenName === null) {
        return this.$Wallet.tokenAccounts
      } else {
        const results = []
        for (const address in this.$Wallet.tokenAccounts) {
          const tkAccount = this.$Wallet.tokenAccounts[address]
          if (`${tkAccount.name} (${tkAccount.symbol})`.toLowerCase().includes(this.tokenName.toLowerCase())) {
            results.push(tkAccount)
          }
        }
        return results
      }
    }
  }
}
</script>
<style scoped lang="scss">
.tokenPanel {
  width: 225px;
  height: 100vh;
  flex: none;
  background: theme-color("secondary");
}
.searchWrapper {
  position: fixed;
  background: theme-color("secondary");
  top: 0;
  width: 225px;
  left: 82px;
  padding-left: 1rem;
  padding-right: 1rem;
}
.createWrapper {
  position: fixed;
  background: theme-color("secondary");
  bottom: 0;
  width: 225px;
  left: 82px;
  padding-left: 1rem;
  padding-right: 1rem;
}
.filterButtonWrapper {
  height: calc(100vh - 96px - 2rem);
  margin-top: calc(48px + 1rem);
  margin-bottom: calc(48px + 1rem);
}
</style>
