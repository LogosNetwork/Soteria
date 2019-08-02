<template>
  <b-container
    v-if="tokenAccount"
    fluid
    class="mt-3"
  >
    <div class="text-left mb-3">
      <div class="d-flex justify-content-between">
        <div>
          <h3>
            {{ tokenAccount.name }} - {{ tokenAccount.symbol }}
          </h3>
          <code class="bg-secondary text-base p-1 mb-3">{{ tokenAccount.address }}</code>
        </div>
        <div>
          <Actions />
        </div>
      </div>
    </div>
    <div>
      <div class="text-left">
        <small
          class="text-uppercase text-muted"
        >
          <span v-t="'statistics'" />
        </small>
      </div>
      <div class="d-flex justify-content-between">
        <div class="text-center">
          <b-card
            class="d-inline-block mr-3 border-0 shadow-sm"
            body-class="p-3"
          >
            <div class="statLabel mb-1">
              <small class="text-uppercase">
                <span v-t="'token'" /> <span v-t="'balance'" />
              </small>
            </div>
            <div>
              <h4 class="d-flex align-items-end justify-content-center mb-0">
                <span class="stats d-inline-block text-truncate">{{ tokenBalance }}</span>
                <small class="ml-1">{{ tokenAccount.symbol }}</small>
              </h4>
            </div>
          </b-card>
          <b-card
            class="d-inline-block mr-3 border-0 shadow-sm"
            body-class="p-3"
          >
            <div class="statLabel mb-1">
              <small class="text-uppercase">
                <span v-t="'circulatingSupply'" />
              </small>
            </div>
            <div>
              <h4 class="d-flex align-items-end justify-content-center mb-0">
                <span class="stats d-inline-block text-truncate">{{ circulatingSupply }}</span>
                <small class="ml-1">{{ tokenAccount.symbol }}</small>
              </h4>
            </div>
          </b-card>
          <b-card
            class="d-inline-block mr-3 border-0 shadow-sm"
            body-class="p-3"
          >
            <div class="statLabel mb-1">
              <small class="text-uppercase">
                <span v-t="'logos'" /> <span v-t="'balance'" />
              </small>
            </div>
            <div>
              <h4 class="d-flex align-items-end justify-content-center mb-0">
                <span class="stats d-inline-block text-truncate">{{ balance }}</span>
                <font-awesome-icon
                  class="text-primary ml-1"
                  :icon="['fal','lambda']"
                />
              </h4>
            </div>
          </b-card>
          <b-card
            v-if="showFeeBalance"
            body-class="p-3"
            class="d-inline-block mr-3 border-0 shadow-sm"
          >
            <div class="statLabel mb-1">
              <small class="text-uppercase">
                <span v-t="'feeBalance'" />
              </small>
            </div>
            <div>
              <h4 class="d-flex align-items-end justify-content-center mb-0">
                <span class="stats d-inline-block text-truncate">{{ feeBalance }}</span>
                <small class="ml-1">{{ tokenAccount.symbol }}</small>
              </h4>
            </div>
          </b-card>
          <b-card
            class="d-inline-block mr-3 border-0 shadow-sm"
            body-class="p-3"
          >
            <div class="statLabel mb-1">
              <small class="text-uppercase">
                <span v-t="'feeRate'" />
              </small>
            </div>
            <div>
              <h4 class="d-flex align-items-end justify-content-center mb-0">
                <span class="stats d-inline-block text-truncate">{{ feeRate }}</span>
                <span v-if="tokenAccount.feeType.toLowerCase() === 'flat'">
                  <small class="ml-1">{{ tokenAccount.symbol }}</small>
                </span>
                <span v-else-if="tokenAccount.feeType.toLowerCase() === 'percentage'">
                  <small class="ml-1">%</small>
                </span>
              </h4>
            </div>
          </b-card>
        </div>
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
                :replace="true"
              /><br>
            </b-col>
          </b-row>
        </b-button>
        <b-button
          v-if="tokenAccount.controllers.length < 10 && updateControllers"
          v-b-tooltip.hover
          :title="`Add a controller`"
          class="text-white"
          variant="outline-primary"
        >
          <font-awesome-icon
            :icon="['fal', 'plus']"
          />
        </b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import bigInt from 'big-integer'
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
    updateControllers () {
      for (const address in this.$Wallet.accounts) {
        if (this.tokenAccount.controllerPrivilege(address, 'update_controller')) {
          return true
        }
      }
      return false
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
      return this.tokenAccount.tokenFeeBalance !== '0' || this.tokenAccount.feeRate !== '0'
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
    },
    circulatingSupply () {
      const supplyInMinor = bigInt(this.tokenAccount.totalSupply).minus(bigInt(this.tokenAccount.tokenBalance)).toString()
      if (this.tokenAccount.decimals) {
        return parseInt(this.tokenAccount.convertToMajor(supplyInMinor), 10).toLocaleString(this.languageCode, { useGrouping: true })
      }
      return parseInt(supplyInMinor, 10).toLocaleString(this.languageCode, { useGrouping: true })
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
.stats {
  max-width: 200px;
}
.statLabel {
  height: 15px;
}
.statLabel > small {
  font-size: 65%;
  display: inline-block;
  vertical-align: top;
}
</style>
