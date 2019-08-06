<template>
  <div class="tokenPanel scroller">
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
    <div class="filterButtonWrapper px-2">
      <b-button
        v-b-modal.createToken
        variant="outline-primary"
        class="align-top text-white w-100 mb-3"
      >
        <font-awesome-icon
          :icon="['fal','plus']"
          class="mr-2"
        />
        <span v-t="'createToken'" />
      </b-button>
      <TokenSelectorButton
        v-for="account in $Wallet.tokenAccounts"
        :key="account.address"
        :token="account"
      />
    </div>
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
