<template>
  <div class="wallet-container">
    <b-container
      class="h-100 p-0"
      fluid
    >
      <b-row
        class="h-100"
        no-gutters
      >
        <b-col
          cols="3"
          class="pt-4 sidebar"
        >
          <Sidebar />
        </b-col>
        <b-col class="content">
          <router-view class="pt-4" />
        </b-col>
      </b-row>
      <div
        v-if="!synced"
        v-b-tooltip.hover
        class="syncer"
        :title="$t('syncingWallet')"
      >
        <font-awesome-icon
          class="text-primary mr-3 mb-3"
          size="2x"
          :icon="['fal','sync-alt']"
          spin
        />
      </div>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '@/components/Wallet/Sidebar.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Wallet',
  components: {
    Sidebar: Sidebar
  },
  data () {
    return {
      wallet: this.$Wallet
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress,
      synced: state => state.synced
    })
  },
  mounted: function () {
    if (this.$Wallet.seed) {
      this.setSynced(false)
      if (this.activeAddress) {
        if (this.$Wallet.accounts[this.activeAddress]) {
          this.$Wallet.currentAccountAddress = this.activeAddress
        } else {
          this.setActiveAddress(this.$Wallet.currentAccountAddress)
        }
      }
      this.$Wallet.sync().then((result) => {
        this.setSynced(result)
      })
      window.addEventListener('beforeunload', this.recordData)
    }
  },
  created () {
    if (this.$Wallet.seed === null) {
      this.$router.push({ path: '/' })
    } else if (this.$Wallet && Object.values(this.$Wallet.accounts).length === 0) {
      this.$Wallet.VueCreateAccount()
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('beforeunload', this.recordData)
  },
  methods: {
    ...mapActions('EncryptedWallet', [
      'setWallet'
    ]),
    ...mapActions('Wallet', [
      'setActiveAddress',
      'setSynced'
    ]),
    recordData () {
      this.setWallet(this.$Wallet.encrypt())
    }
  }
}
</script>

<style scoped lang="scss">
  .sidebar { max-width: 200px; }
  .wallet-container {
    overflow:hidden;
    height: calc(100vh);
    background-color: theme-color("secondary");
  }
  .content {
    background-color: theme-color("bg");
    height: 100%;
    overflow: hidden;
  }
  .syncer {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
</style>
