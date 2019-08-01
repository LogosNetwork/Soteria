<template>
  <div
    class="w-100 text-left pt-3"
  >
    <b-button
      class="navigationSelector"
      variant="transparent"
      :pressed="$route.name === 'dashboard' "
      to="dashboard"
    >
      <font-awesome-icon
        class="icon mr-2"
        size="sm"
        :icon="['fal','tachometer-alt']"
      />
      <span v-t="'dashboard'" />
    </b-button>
    <b-button
      class="navigationSelector"
      variant="transparent"
      :pressed="$route.name === 'tokens'"
      to="tokens"
    >
      <font-awesome-icon
        class="icon mr-2"
        size="sm"
        :icon="['fal','coins']"
      />
      <span v-t="'manageTokens'" />
    </b-button>
    <b-button
      class="navigationSelector"
      variant="transparent"
      :pressed="$route.name === 'governance'"
      to="governance"
    >
      <font-awesome-icon
        class="icon mr-2"
        size="sm"
        :icon="['fal','landmark']"
      />
      <span v-t="'governance'" />
    </b-button>
    <b-button
      class="navigationSelector"
      variant="transparent"
      :pressed="$route.name === 'staking'"
      to="staking"
    >
      <font-awesome-icon
        class="icon mr-2"
        size="sm"
        :icon="['fal','chart-line']"
      />
      <span v-t="'staking'" />
    </b-button>
    <b-button
      class="navigationSelector"
      variant="transparent"
      :pressed="$route.name === 'settings'"
      to="settings"
    >
      <font-awesome-icon
        class="icon mr-2"
        size="sm"
        :icon="['fal','cogs']"
      />
      <span v-t="'settings'" />
    </b-button>
    <b-button
      class="navigationSelector"
      variant="transparent"
      @click="logout"
    >
      <font-awesome-icon
        class="icon mr-2"
        size="sm"
        :icon="['fal','power-off']"
      />
      <span v-t="'logout'" />
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
    text-align: left;
    color: $gray-600;
    margin-left: 1rem;
    margin-right: 1rem;
    width: calc(100% - 2rem);
  }
  .navigationSelector:not(.active):hover {
    cursor: pointer;
    background-color: theme-color("tertiary");
    color: $gray-400;
  }
  .navigationSelector.active {
    color: theme-color("base");
    background-color: theme-color("bg");
  }
  .navigationSelector > small {
    display: block;
  }
</style>
