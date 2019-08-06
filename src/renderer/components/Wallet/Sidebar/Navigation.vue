<template>
  <div
    role="navigation"
    :aria-label="$t('main')"
    class="w-100 text-center pt-3"
  >
    <b-button
      v-b-tooltip.right.hover="$t('wallet')"
      class="navigationSelector mb-2 btn-transparent d-flex align-items-center justify-content-center mx-auto"
      variant="transparent"
      :title="$t('wallet')"
      :pressed="$route.name === 'dashboard' "
      to="dashboard"
    >
      <font-awesome-icon
        size="lg"
        :icon="['fal','wallet']"
      />
      <span
        v-t="'wallet'"
        class="sr-only"
      />
    </b-button>
    <b-button
      v-b-tooltip.right.hover="$t('tokens')"
      class="navigationSelector mb-2 btn-transparent d-flex align-items-center justify-content-center mx-auto"
      variant="transparent"
      :title="$t('tokens')"
      :pressed="$route.name === 'tokens'"
      to="tokens"
    >
      <font-awesome-icon
        size="lg"
        :icon="['fal','coins']"
      />
      <span
        v-t="'tokens'"
        class="sr-only"
      />
    </b-button>
    <b-button
      v-b-tooltip.right.hover="$t('governance')"
      class="navigationSelector mb-2 btn-transparent d-flex align-items-center justify-content-center mx-auto"
      variant="transparent"
      :title="$t('governance')"
      :pressed="$route.name === 'governance'"
      to="governance"
    >
      <font-awesome-icon
        size="lg"
        :icon="['fal','landmark']"
      />
      <span
        v-t="'governance'"
        class="sr-only"
      />
    </b-button>
    <b-button
      v-b-tooltip.right.hover="$t('staking')"
      class="navigationSelector mb-2 btn-transparent d-flex align-items-center justify-content-center mx-auto"
      variant="transparent"
      :title="$t('staking')"
      :pressed="$route.name === 'staking'"
      to="staking"
    >
      <font-awesome-icon
        size="lg"
        :icon="['fal','chart-line']"
      />
    </b-button>
    <b-button
      v-b-tooltip.right.hover="$t('settings')"
      class="navigationSelector mb-2 btn-transparent d-flex align-items-center justify-content-center mx-auto"
      variant="transparent"
      :title="$t('settings')"
      :pressed="$route.name === 'settings'"
      to="settings"
    >
      <font-awesome-icon
        size="lg"
        :icon="['fal','cogs']"
      />
      <span
        v-t="'settings'"
        class="sr-only"
      />
    </b-button>
    <b-button
      v-b-tooltip.right.hover="$t('logout')"
      class="navigationSelector mb-2 btn-transparent d-flex align-items-center justify-content-center mx-auto"
      variant="transparent"
      :title="$t('logout')"
      @click="logout"
    >
      <font-awesome-icon
        size="lg"
        :icon="['fal','power-off']"
      />
      <span
        v-t="'logout'"
        class="sr-only"
      />
    </b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NavigationSelector',
  methods: {
    ...mapActions('EncryptedWallet', [
      'setWallet'
    ]),
    logout () {
      this.setWallet(this.$Wallet.encrypt())
      this.$Wallet.mqttDisconnect()
      this.$Wallet.loadOptions({
        seed: null,
        mqtt: null,
        rpc: null,
        walletID: false
      })
      this.$router.push({ path: '/locked' })
    }
  }
}
</script>

<style scoped lang="scss">
  .navigationSelector {
    color: $gray-600;
    width: 50px;
    height: 50px;
  }
  .navigationSelector > svg {
    vertical-align: -webkit-baseline-middle;
  }
  .navigationSelector:not(.active):hover {
    cursor: pointer;
    background-color: theme-color("bg");
    color: $gray-400;
    border-radius: 20%;
  }
  .navigationSelector.active {
    color: theme-color("base");
    background-color: theme-color("bg");
    border: 1px solid theme-color("darkest");
    border-radius: 20%;
  }
  .navigationSelector > small {
    display: block;
  }
</style>
