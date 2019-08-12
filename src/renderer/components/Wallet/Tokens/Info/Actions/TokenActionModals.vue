<template>
  <div v-if="actions !== null && Object.values(actions).length > 0">
    <b-modal
      v-for="action in actions"
      :id="`tkActionModal_${action.id}`"
      :key="action.id"
      :body-class="action.id !== 'receive' ? 'pb-0' : ''"
      hide-footer
      hide-header
    >
      <Receive
        v-if="action.id === 'receive'"
        :list="false"
      />
      <Distribute
        v-else-if="action.id === 'distribute'"
      />
      <Mint
        v-else-if="action.id === 'mint'"
      />
    </b-modal>
  </div>
</template>

<script>
import Receive from '@/components/Shared/ActionModals/Receive'
import Distribute from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/Distribute'
import Mint from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/Mint'

export default {
  name: 'TokenActionModals',
  components: {
    Receive,
    Distribute,
    Mint
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
