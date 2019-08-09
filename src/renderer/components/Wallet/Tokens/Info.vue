<template>
  <div>
    <div
      v-if="tokenAccount"
      class="drag"
    >
      <div class="text-left py-2 border-bottom px-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <b-dropdown
              variant="transparent"
              toggle-class="text-white p-0"
              size="sm"
            >
              <template slot="button-content">
                <h5 class="mb-0 d-inline-block">
                  {{ tokenAccount.name }} - {{ tokenAccount.symbol }}
                </h5>
              </template>
              <b-dropdown-form
                class="px-2"
              >
                <b-form-group
                  class="mb-0"
                  @submit.stop.prevent
                >
                  <b-form-input
                    v-model="tokenName"
                    size="sm"
                    :placeholder="$t('searchTokens')"
                  />
                </b-form-group>
              </b-dropdown-form>
              <b-dropdown-divider />
              <b-dropdown-group
                id="tokenAccountsGroup"
              >
                <b-dropdown-item-button
                  v-for="account in tokenAccounts"
                  :key="account.address"
                  @click="setActiveAddress(account.address)"
                >
                  <div class="text-truncate">
                    <span>{{ account.name }} ({{ account.symbol }})</span>
                  </div>
                </b-dropdown-item-button>
              </b-dropdown-group>
              <b-dropdown-divider />
              <b-dropdown-item-button
                v-b-modal.createToken
              >
                <font-awesome-icon
                  :icon="['fal','plus']"
                  class="mr-2"
                />
                <span v-t="'createToken'" />
              </b-dropdown-item-button>
            </b-dropdown>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <Actions />
            <b-button
              v-if="!tokenAccountSidebar"
              v-b-tooltip.hover
              :title="$t('openTheTokenNav')"
              variant="outline-primary"
              class="text-base ml-3"
              size="sm"
              @click="setTokenAccountSidebar(true)"
            >
              <font-awesome-icon
                :title="$t('openTheTokenNav')"
                size="lg"
                :icon="['fal','bars']"
              />
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="tokenContainer"
      class="scroller pt-3"
    >
      <b-container
        v-if="tokenAccount"
        fluid
        class="text-left"
      >
        <div>
          <div class="mb-3">
            <div>
              <small
                class="text-uppercase text-muted"
              >
                <span v-t="'token'" /> <span v-t="'address'" />
              </small>
            </div>
            <code class="bg-secondary text-base p-1 mt-1 d-inline-block">{{ tokenAccount.address }}</code>
          </div>
          <div class="mb-3">
            <div>
              <small
                class="text-uppercase text-muted"
              >
                <span v-t="'myWalletBalance'" />
              </small>
            </div>
            <div class="text-left mt-1">
              <h4 class="d-flex align-items-end justify-content-start mb-0">
                <span class="stats d-inline-block text-truncate">{{ walletBalance }}</span>
                <small class="ml-1">{{ tokenAccount.symbol }}</small>
              </h4>
            </div>
          </div>
          <div>
            <small
              class="text-uppercase text-muted"
            >
              <span v-t="'tokenAccount'" /> <span v-t="'statistics'" />
            </small>
          </div>
          <div class="d-flex justify-content-between">
            <div class="mt-1">
              <b-card
                class="d-inline-block mr-3 border-0 shadow-sm text-center mb-3"
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
                class="d-inline-block mr-3 border-0 shadow-sm text-center mb-3"
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
                class="d-inline-block mr-3 border-0 shadow-sm text-center mb-3"
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
                class="d-inline-block mr-3 border-0 shadow-sm text-center mb-3"
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
                class="d-inline-block mr-3 border-0 shadow-sm text-center mb-3"
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
        <div>
          <div>
            <small
              class="text-uppercase text-muted"
            >
              <span v-t="'settings'" />
            </small>
          </div>
          <div class="mt-1">
            <Settings :token="tokenAccount" />
          </div>
        </div>
        <div class="mt-3">
          <div>
            <small
              class="text-uppercase text-muted"
            >
              <span v-t="'controllers'" />
            </small>
          </div>
          <div class="mt-1 controllerButtonWrapper">
            <b-button
              v-for="controller in tokenAccount.controllers"
              :key="'controller'+controller.account"
              v-b-modal="'controllerModal'"
              size="sm"
              class="text-white mr-2 mb-3"
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
              size="sm"
              :title="`Add a controller`"
              class="text-white mb-3"
              variant="outline-primary"
            >
              <font-awesome-icon
                :icon="['fal', 'plus']"
              />
            </b-button>
          </div>
        </div>
      </b-container>
      <TokenAccountHistory />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import bigInt from 'big-integer'
import Actions from '@/components/Wallet/Tokens/Info/Actions.vue'
import Settings from '@/components/Wallet/Tokens/Info/Settings.vue'
import TokenAccountHistory from '@/components/Wallet/Tokens/Info/History.vue'

export default {
  name: 'TokenAccountInfo',
  components: {
    Actions,
    Settings,
    TokenAccountHistory,
    LogosAddress: () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue')
  },
  data () {
    return {
      tokenName: null
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress,
      tokenAccountSidebar: state => state.tokenAccountSidebar
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
    walletBalance () {
      let totalBalanceInMinor = bigInt(0)
      for (const account in this.$Wallet.accounts) {
        const logosAccount = this.$Wallet.accounts[account]
        const tokenBalance = logosAccount.tokenBalance(this.tokenAccount.publicKey)
        if (tokenBalance) {
          totalBalanceInMinor = totalBalanceInMinor.plus(bigInt(tokenBalance.minor))
        }
      }
      if (this.tokenAccount.decimals) {
        return parseInt(this.tokenAccount.convertToMajor(totalBalanceInMinor), 10).toLocaleString(this.languageCode, { useGrouping: true })
      }
      return parseInt(totalBalanceInMinor, 10).toLocaleString(this.languageCode, { useGrouping: true })
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
    },
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
  },
  created () {
    if (!this.$Wallet.tokenAccounts[this.activeAddress]) {
      for (const address in this.$Wallet.tokenAccounts) {
        this.setActiveAddress(address)
        break
      }
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'setActiveAddress',
      'setTokenAccountSidebar'
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
#tokenContainer.scroller {
  max-height: calc(100vh - 48px);
}
.controllerButtonWrapper {
  font-size: 0px;
}
</style>
