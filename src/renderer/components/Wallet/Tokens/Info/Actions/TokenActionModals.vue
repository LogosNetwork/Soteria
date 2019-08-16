<template>
  <div v-if="actions !== null && Object.values(actions).length > 0">
    <b-modal
      v-for="action in actions"
      :id="`tkActionModal_${action.id}`"
      :key="action.id"
      :body-class="action.id !== 'receive' ? 'pb-0' : ''"
      :size="action.id === 'settings' ? 'lg' : ''"
      hide-footer
      hide-header
    >
      <Receive
        v-if="action.id === 'receive'"
        :list="false"
      />
      <Distribute
        v-else-if="action.id === 'distribute'"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
      <Mint
        v-else-if="action.id === 'mint'"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
      <Burn
        v-else-if="action.id === 'burn'"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
      <Revoke
        v-else-if="action.id === 'revoke'"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
      <AdjustUserStatus
        v-else-if="action.id === 'freeze' || action.id === 'whitelist'"
        :type="action.id"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
      <AdjustFee
        v-else-if="action.id === 'adjustFee'"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
      <WithdrawFees
        v-else-if="action.id === 'withdrawFees'"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
      <WithdrawLogos
        v-else-if="action.id === 'withdrawLogos'"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
      <EditInfo
        v-else-if="action.id === 'editInfo'"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
      <Settings
        v-else-if="action.id === 'settings'"
        @sent="$bvModal.hide(`tkActionModal_${action.id}`)"
      />
    </b-modal>
  </div>
</template>

<script>
import Receive from '@/components/Shared/ActionModals/Receive'
import Distribute from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/Distribute'
import Mint from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/Mint'
import Burn from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/Burn'
import Revoke from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/Revoke'
import AdjustUserStatus from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/AdjustUserStatus'
import AdjustFee from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/AdjustFee'
import EditInfo from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/EditInfo'
import Settings from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/Settings'
import WithdrawFees from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/WithdrawFees'
import WithdrawLogos from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/WithdrawLogos'

export default {
  name: 'TokenActionModals',
  components: {
    Receive,
    Distribute,
    Mint,
    Burn,
    Revoke,
    AdjustUserStatus,
    AdjustFee,
    EditInfo,
    Settings,
    WithdrawFees,
    WithdrawLogos
  },
  props: {
    actions: {
      type: Object,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
