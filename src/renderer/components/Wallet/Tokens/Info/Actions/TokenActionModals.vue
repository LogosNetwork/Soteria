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
      {{ action.id }}
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TokenActionModals',
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
