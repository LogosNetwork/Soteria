<template>
  <div v-if="Object.values(actions).length > 0">
    <b-dropdown
      class="text-left"
      variant="outline-primary"
      toggle-class="text-white"
      size="sm"
      right
      :text="$t('actions')"
    >
      <b-dropdown-item-button
        v-for="action in actions"
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
    <TokenActionModals :actions="modalActions" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TokenActionModals from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals.vue'

export default {
  name: 'TokenAccountActions',
  components: {
    TokenActionModals
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    tokenAccount () {
      return this.$Wallet.tokenAccounts[this.activeAddress]
    },
    actions () {
      const actions = {
        recieve: {
          icon: 'hand-receiving',
          text: `${this.$t('receive')} ${this.$t('logos')}`,
          id: 'receive'
        }
      }
      for (const account in this.$Wallet.accounts) {
        if (!actions['distribute'] && this.tokenAccount.controllerPrivilege(account, 'distribute')) {
          actions.distribute = {
            icon: 'paper-plane',
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
        if (!actions['freeze'] &&
          (this.tokenAccount.hasSetting('freeze') && this.tokenAccount.controllerPrivilege(account, 'freeze'))) {
          actions.freeze = {
            icon: 'snowflake',
            text: this.$t('tokenActions.freeze'),
            id: 'freeze'
          }
        }
        if (!actions['whitelist'] &&
          (this.tokenAccount.hasSetting('whitelist') && this.tokenAccount.controllerPrivilege(account, 'whitelist'))) {
          actions.adjustUsers = {
            icon: 'list-alt',
            text: this.$t('tokenActions.whitelist'),
            id: 'whitelist'
          }
        }
        if (!actions['editInfo'] &&
          this.tokenAccount.controllerPrivilege(account, 'update_issuer_info')) {
          actions.editInfo = {
            icon: 'edit',
            text: this.$t('tokenActions.editInfo'),
            id: 'editInfo'
          }
        }
        if (!actions['adjustFee'] &&
          this.tokenAccount.hasSetting('adjust_fee') &&
          this.tokenAccount.controllerPrivilege(account, 'adjust_fee')) {
          actions.adjustFee = {
            icon: 'percentage',
            text: this.$t('tokenActions.adjustFee'),
            id: 'adjustFee'
          }
        }
        if (!actions['withdrawFees'] &&
          this.tokenAccount.controllerPrivilege(account, 'withdraw_fee')) {
          actions.withdrawFees = {
            icon: 'hand-receiving',
            text: this.$t('tokenActions.withdrawFees'),
            id: 'withdrawFees'
          }
        }
        if (!actions['withdrawLogos'] &&
          this.tokenAccount.controllerPrivilege(account, 'withdraw_logos')) {
          actions.withdrawLogos = {
            icon: 'lambda',
            text: this.$t('tokenActions.withdrawLogos'),
            id: 'withdrawLogos'
          }
        }
        if (!actions['settings'] &&
          ((this.tokenAccount.hasSetting('modify_issuance') && this.tokenAccount.controllerPrivilege(account, 'change_issuance')) ||
          (this.tokenAccount.hasSetting('modify_issuance') && this.tokenAccount.controllerPrivilege(account, 'change_modify_issuance')) ||
          (this.tokenAccount.hasSetting('modify_revoke') && this.tokenAccount.controllerPrivilege(account, 'change_revoke')) ||
          (this.tokenAccount.hasSetting('modify_revoke') && this.tokenAccount.controllerPrivilege(account, 'change_modify_revoke')) ||
          (this.tokenAccount.hasSetting('modify_freeze') && this.tokenAccount.controllerPrivilege(account, 'change_freeze')) ||
          (this.tokenAccount.hasSetting('modify_freeze') && this.tokenAccount.controllerPrivilege(account, 'change_modify_freeze')) ||
          (this.tokenAccount.hasSetting('modify_adjust_fee') && this.tokenAccount.controllerPrivilege(account, 'change_adjust_fee')) ||
          (this.tokenAccount.hasSetting('modify_adjust_fee') && this.tokenAccount.controllerPrivilege(account, 'change_modify_adjust_fee')) ||
          (this.tokenAccount.hasSetting('modify_whitelist') && this.tokenAccount.controllerPrivilege(account, 'change_whitelist')) ||
          (this.tokenAccount.hasSetting('modify_whitelist') && this.tokenAccount.controllerPrivilege(account, 'change_modify_whitelist')))) {
          actions.settings = {
            icon: 'cogs',
            text: this.$t('settings'),
            id: 'settings'
          }
        }
      }
      return actions
    },
    modalActions () {
      const actions = this.actions
      actions.update_controller = {
        id: 'update_controller'
      }
      return actions
    }
  },

  methods: {
    openModal (id) {
      this.$bvModal.show(`tkActionModal_${id}`)
    }
  }
}
</script>

<style scoped lang="scss">
.actionIcon {
  width: 17.5px;
}
</style>
