<template>
  <b-container
    fluid
    class="mt-3"
  >
    <div class="d-flex justify-content-between">
      <div class="text-center">
        <div class="align-self-center d-inline-block">
          <div>
            <small class="text-uppercase text-muted">
              <span v-t="'logos'" /> <span v-t="'balance'" />
            </small>
          </div>
          <div>
            <h4>
              {{ balance }}
              <font-awesome-icon
                class="text-primary ml-1"
                :icon="['fal','lambda']"
              />
            </h4>
          </div>
        </div>
        <div class="align-self-center d-inline-block ml-3">
          <div>
            <small class="text-uppercase text-muted">
              <span v-t="'token'" /> <span v-t="'balance'" />
            </small>
          </div>
          <div>
            <h4>
              {{ tokenBalance }} <small>{{ tokenAccount.symbol }}</small>
            </h4>
          </div>
        </div>
        <div
          v-if="showFeeBalance"
          class="align-self-center d-inline-block ml-3"
        >
          <div>
            <small class="text-uppercase text-muted">
              <span v-t="'feeBalance'" />
            </small>
          </div>
          <div>
            <h4>
              {{ feeBalance }} <small>{{ tokenAccount.symbol }}</small>
            </h4>
          </div>
        </div>
        <div
          v-if="showFeeBalance"
          class="align-self-center d-inline-block ml-3"
        >
          <div>
            <small class="text-uppercase text-muted">
              <span v-t="'feeRate'" />
            </small>
          </div>
          <div>
            <h4>
              <span v-if="tokenAccount.feeType.toLowerCase() === 'flat'">
                {{ feeRate }} <small>{{ tokenAccount.symbol }}</small>
              </span>
              <span v-else-if="tokenAccount.feeType.toLowerCase() === 'percentage'">
                {{ tokenAccount.feeRate }}%
              </span>
            </h4>
          </div>
        </div>
      </div>
      <div class="align-self-center">
        <Actions />
      </div>
    </div>
    <div class="mt-3">
      <div class="text-left">
        <small
          class="text-uppercase text-muted"
        >
          <span v-t="'settings'" />
        </small>
      </div>
      <div class="ml-3 text-left mt-1">
        <Settings :token="tokenAccount" />
      </div>
    </div>
    <div class="mt-3">
      <div class="text-left">
        <small
          class="text-uppercase text-muted"
        >
          <span v-t="'controllers'" />
        </small>
      </div>
      <div class="text-left mt-1">
        <b-button
          v-for="controller in tokenAccount.controllers"
          :key="'controller'+controller.account"
          v-b-modal="'controllerModal'"
          class="text-white mr-2"
          variant="outline-primary"
        >
          <b-row class="justify-content-md-center">
            <b-col>
              <span
                v-if="tokenAccount.controllerPrivilege(controller.account, 'update_controller')"
                v-b-tooltip.hover
                :title="`This controller has admin rights of ${tokenAccount.name}. They can add or remove other controllers and set any privileges.`"
              >
                <font-awesome-icon
                  :icon="['fal', 'crown']"
                  class="mr-2"
                />
              </span>
              <LogosAddress
                :address="controller.account"
                :inactive="true"
                :force="true"
              /><br>
            </b-col>
          </b-row>
        </b-button>
        <b-button
          class="text-white"
          variant="outline-primary"
        >
          Add a Controller
        </b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Actions from '@/components/Wallet/Tokens/Info/Actions.vue'
import Settings from '@/components/Wallet/Tokens/Info/Settings.vue'

export default {
  name: 'TokenAccountInfo',
  components: {
    Actions,
    Settings,
    LogosAddress: () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue')
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    tokenAccount () {
      return this.$Wallet.tokenAccounts[this.activeAddress]
    },
    balance () {
      return parseInt(this.$Wallet.rpcClient().convert.fromReason(this.tokenAccount.balance, 'LOGOS'), 10).toLocaleString(this.languageCode, { useGrouping: true })
    },
    tokenBalance () {
      const balanceInMinor = this.tokenAccount.tokenBalance
      if (this.tokenAccount.decimals) {
        return parseInt(this.tokenAccount.convertToMajor(balanceInMinor), 10).toLocaleString(this.languageCode, { useGrouping: true })
      }
      return parseInt(balanceInMinor, 10).toLocaleString(this.languageCode, { useGrouping: true })
    },
    showFeeBalance () {
      return (this.tokenAccount.tokenFeeBalance !== '0' || this.tokenAccount.settings.feeRate !== '0')
    },
    feeRate () {
      const feeRateInMinor = this.tokenAccount.feeRate
      if (this.tokenAccount.decimals) {
        return parseInt(this.tokenAccount.convertToMajor(feeRateInMinor), 10).toLocaleString(this.languageCode, { useGrouping: true })
      }
      return parseInt(feeRateInMinor, 10).toLocaleString(this.languageCode, { useGrouping: true })
    },
    feeBalance () {
      const feeBalanceInMinor = this.tokenAccount.tokenFeeBalance
      if (this.tokenAccount.decimals) {
        return parseInt(this.tokenAccount.convertToMajor(feeBalanceInMinor), 10).toLocaleString(this.languageCode, { useGrouping: true })
      }
      return parseInt(feeBalanceInMinor, 10).toLocaleString(this.languageCode, { useGrouping: true })
    }
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
