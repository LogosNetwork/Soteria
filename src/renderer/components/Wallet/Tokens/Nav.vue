<template>
  <div class="tokenPanel scroller visible">
    <b-form-group
      class="text-left searchWrapper pt-4 pb-3 mb-0"
    >
      <b-form-input
        id="tokenSearch"
        v-model="tokenName"
        :placeholder="$t('searchTokens')"
        trim
      />
    </b-form-group>
    <div class="filterButtonWrapper">
      <TokenSelectorButton
        v-for="account in $Wallet.tokenAccounts"
        :key="account.address"
        :token="account"
      />
    </div>
  </div>
</template>

<script>
import TokenSelectorButton from '@/components/Wallet/Tokens/Nav/TokenSelector.vue'

export default {
  name: 'TokenSelectorNav',
  components: {
    TokenSelectorButton
  },
  data () {
    return {
      tokenName: null
    }
  }
}
</script>
<style scoped lang="scss">
.tokenPanel {
  width: 190px;
  height: 100vh;
  flex: none;
  background: theme-color("secondary");
}
.searchWrapper {
  position: fixed;
  background: theme-color("secondary");
  top: 0;
  width: 190px;
  left: 82px;
  z-index: 2;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.filterButtonWrapper > button:first-child {
  margin-top: 81px;
}
</style>
