<template>
  <div v-if="Object.values(actions).length > 0">
    <b-dropdown
      class="text-left"
      variant="outline-primary"
      toggle-class="text-white"
      right
      :text="$t('actions')"
    >
      <b-dropdown-item-button
        v-for="action in Object.values(actions)"
        :key="action.id"
        size="sm"
        @click="openModal(action.id)"
      >
        <font-awesome-icon
          class="mr-1 actionIcon"
          :icon="['fal',action.icon]"
        />
        <span>
          {{ action.text }}
        </span>
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TokenAccountActions',
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    tokenAccount () {
      return this.$Wallet.tokenAccounts[this.activeAddress]
    },
    actions () {
      const actions = {}
      for (const account in this.$Wallet.accounts) {
        if (!actions['distribute'] && this.tokenAccount.controllerPrivilege(account, 'distribute')) {
          actions.distribute = {
            icon: 'arrow-down',
            text: this.$t('tokenActions.distribute'),
            id: 'distribute'
          }
        }
        if (!actions['mint'] &&
          this.tokenAccount.hasSetting('issuance') &&
          this.tokenAccount.controllerPrivilege(account, 'issuance')) {
          actions.mint = {
            icon: 'magic',
            text: this.$t('tokenActions.mint'),
            id: 'mint'
          }
        }
        if (!actions['burn'] &&
          this.tokenAccount.hasSetting('burn') &&
          this.tokenAccount.controllerPrivilege(account, 'burn')) {
          actions.burn = {
            icon: 'fire',
            text: this.$t('tokenActions.burn'),
            id: 'burn'
          }
        }
        if (!actions['revoke'] &&
          this.tokenAccount.hasSetting('revoke') &&
          this.tokenAccount.controllerPrivilege(account, 'revoke')) {
          actions.revoke = {
            icon: 'mask',
            text: this.$t('tokenActions.revoke'),
            id: 'revoke'
          }
        }
        if (!actions['adjustUsers'] &&
          ((this.tokenAccount.hasSetting('freeze') && this.tokenAccount.controllerPrivilege(account, 'freeze')) ||
          (this.tokenAccount.hasSetting('whitelist') && this.tokenAccount.controllerPrivilege(account, 'whitelist')))) {
          actions.adjustUsers = {
            icon: 'user-edit',
            text: this.$t('tokenActions.adjustUsers'),
            id: 'adjustUsers'
          }
        }
        if (!actions['updateInfo'] &&
          this.tokenAccount.controllerPrivilege(account, 'update_issuer_info')) {
          actions.updateInfo = {
            icon: 'edit',
            text: this.$t('tokenActions.updateInfo'),
            id: 'updateInfo'
          }
        }
      }
      return actions
    }
  },
  methods: {
    openModal (id) {
      console.log(id)
      return null
    }
  }
}
</script>

<style scoped lang="scss">
.actionIcon {
  width: 17.5px;
}
</style>
