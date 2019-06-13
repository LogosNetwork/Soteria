<template>
  <b-container
    fluid
    class="mt-3"
  >
    <div class="d-flex justify-content-between">
      <div class="text-left align-self-center">
        <div>
          <small class="text-uppercase text-muted">
            <span v-t="'logos'" /> <span v-t="'balance'" />
          </small>
        </div>
        <div class="text-center">
          {{ wallet.account.balance }}
          <font-awesome-icon
            class="text-primary ml-1"
            :icon="['fal','lambda']"
          />
        </div>
      </div>
      <div class="align-self-center">
        <b-button
          variant="primary"
          size="sm"
        >
          <font-awesome-icon
            class="mr-1"
            :icon="['fal','paper-plane']"
          />
          <span v-t="'send'" />
        </b-button>
        <b-button
          variant="primary"
          size="sm"
        >
          <font-awesome-icon
            class="mr-1"
            :icon="['fal','hand-receiving']"
          />
          <span v-t="'receive'" />
        </b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountInfo',
  data () {
    return {
      wallet: this.$Wallet
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
