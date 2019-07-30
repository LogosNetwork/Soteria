<template>
  <div>
    <AccountList />
    <b-container class="text-left">
      <div class="d-flex justify-content-between">
        <div class="text-left align-self-center">
          <h4
            v-t="'tokens'"
            class="mb-0"
          />
        </div>
        <div class="align-self-center">
          <b-button
            v-b-modal.createToken
            variant="outline-primary"
            class="text-white"
            size="sm"
          >
            <font-awesome-icon
              class="mr-1"
              :icon="['fal','plus']"
            />
            <span v-t="'createToken'" />
          </b-button>
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
      </div>
      <div>
        <div
          v-for="token in $Wallet.tokenAccounts"
          :key="token.address"
        >
          {{ token.name }}
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import CreateToken from '@/components/Wallet/Tokens/CreateToken.vue'
import AccountList from '@/components/Wallet/Dashboard/AccountList.vue'
export default {
  name: 'Tokens',
  components: {
    AccountList,
    CreateToken
  }
}
</script>

<style scoped lang="scss">
</style>
