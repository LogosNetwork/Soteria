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
    </b-modal>
  </div>
</template>

<script>
import Receive from '@/components/Shared/ActionModals/Receive'

export default {
  name: 'TokenActionModals',
  components: {
    Receive
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
