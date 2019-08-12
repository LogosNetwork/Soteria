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
    </b-modal>
  </div>
</template>

<script>
import Receive from '@/components/Shared/ActionModals/Receive'
import Distribute from '@/components/Wallet/Tokens/Info/Actions/TokenActionModals/Distribute'

export default {
  name: 'TokenActionModals',
  components: {
    Receive,
    Distribute
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
