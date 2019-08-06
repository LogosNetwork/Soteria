<template>
  <b-button
    class="tokenFilterButton"
    variant="transparent"
    :pressed="selected"
    @click.stop="toggleTokenFilter(token)"
  >
    <div class="d-flex justify-content-between">
      <div class="text-truncate">
        <font-awesome-icon
          class="icon mr-2"
          size="sm"
          :icon="icon"
        />
        <span>{{ tokenName }}</span>
      </div>
      <Favorite
        v-if="token !== null"
        :token="token"
      />
    </div>
  </b-button>
</template>

<script>
import Favorite from '@/components/Wallet/Dashboard/AccountList/TokenFilter/TokenPanel/FilterButton/Favorite.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TokenSelector',
  components: {
    Favorite
  },
  props: {
    token: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState('Wallet', {
      tokenFilter: state => state.tokenFilter
    }),
    icon () {
      if (this.token === null) {
        return ['fal', 'globe-americas']
      } else if (this.token === 'logos') {
        return ['fal', 'lambda']
      } else {
        return ['fal', 'coins']
      }
    },
    tokenName () {
      if (this.token === null) {
        return this.$t('all')
      } else if (this.token === 'logos') {
        return this.$t('logos')
      } else if (this.token) {
        return this.token
      } else {
        return 'TODO Token Name'
      }
    },
    selected () {
      return this.tokenFilter === this.token || (this.tokenFilter === null && this.token === null)
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'setTokenFilter'
    ]),
    toggleTokenFilter () {
      if (this.selected) {
        this.setTokenFilter(null)
      } else {
        this.setTokenFilter(this.token)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.tokenFilterButton {
  text-align: left;
  color: $gray-600;
  width: 100%;
}
.tokenFilterButton:not(.active):hover {
  background-color: theme-color("tertiary");
  color: $gray-400;
}
.tokenFilterButton.active {
  color: theme-color("base");
  background-color: theme-color("bg");
}
.tokenFilterButton > small {
  display: block;
}
</style>
