<template>
  <div>
    <b-button
      v-b-modal.tokenFilterModal
      v-b-tooltip.hover
      :title="$t('tokenFilter')"
      size="sm"
      variant="outline-primary"
      class="align-top text-white btn-xs"
    >
      <font-awesome-layers>
        <font-awesome-icon
          :icon="['fal','filter']"
          transform="left-5"
        />
        <font-awesome-icon
          :icon="['fal','coins']"
          transform="right-6 down-2 shrink-3"
        />
      </font-awesome-layers>
    </b-button>
    <b-modal
      id="tokenFilterModal"
      :body-class="['scroller', 'visible']"
      hide-footer
      hide-header
      no-fade
      size="right"
    >
      <TokenPanel />
    </b-modal>
  </div>
</template>

<script>
import TokenPanel from '@/components/Wallet/Dashboard/AccountList/TokenFilter/TokenPanel.vue'

export default {
  name: 'TokenPanelToggle',
  components: {
    TokenPanel
  }
}
</script>

<style scoped lang="scss">
.btn-xs {
  padding: 0rem 0.5rem;
}
</style>
