<template>
  <div>
    <b-button
      v-if="!showFilter"
      variant="link"
      class="p-0"
      @click="setShowFilter()"
    >
      <font-awesome-layers style="font-size: 1.42em;">
        <font-awesome-icon
          :icon="['fal','filter']"
          transform="left-2"
        />
        <font-awesome-icon
          :icon="['fal','circle']"
          transform="shrink-4 right-4 down-2"
          :style="{ color: 'white' }"
        />
        <font-awesome-icon
          :icon="['fal','coins']"
          transform="shrink-10 right-4 down-2"
          :style="{ color: 'white' }"
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
</style>
