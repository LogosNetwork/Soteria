<template>
  <div>
    <b-button
      v-if="!showFilter"
      v-b-tooltip.hover
      :title="$t('tokenFilter')"
      size="sm"
      variant="outline-primary"
      class="align-top text-white btn-xs"
      @click="setShowFilter()"
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
    <transition name="slide">
      <TokenPanel v-show="showFilter" />
    </transition>
  </div>
</template>

<script>
import TokenPanel from '@/components/Wallet/Dashboard/AccountList/TokenPanel.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TokenPanelToggle',
  components: {
    'TokenPanel': TokenPanel
  },
  computed: {
    ...mapState('Wallet', {
      showFilter: state => state.showFilter
    })
  },
  methods: {
    ...mapActions('Wallet', [
      'setShowFilter'
    ])
  }
}
</script>

<style scoped lang="scss">
.slide-leave-active,
.slide-enter-active {
  transition: .3s;
}
.slide-enter {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
.slide-leave-to {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
.btn-xs {
  padding: 0rem 0.5rem;
}
</style>
