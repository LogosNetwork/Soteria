<template>
  <div class="d-flex align-items-start">
    <b-button
      :id="`favoriteButton_${token}`"
      :title="title"
      variant="outline-link"
      class="btn-star text-warning"
      size="sm"
      :aria-label="title"
      :disabled="disabled"
      @click.stop="toggleFavorite()"
    >
      <div class="wrapper">
        <div class="circle" />
        <font-awesome-icon
          :class="{ selected: favorited }"
          size="sm"
          :icon="['fas', 'star']"
        />
        <font-awesome-icon
          :class="{ selected: !favorited }"
          size="sm"
          :icon="['fal', 'star']"
        />
      </div>
    </b-button>
    <b-tooltip
      triggers="hover"
      :target="`favoriteButton_${token}`"
    >
      {{ title }}
    </b-tooltip>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Favorite',
  props: {
    token: {
      type: String,
      default: 'logos'
    }
  },
  computed: {
    ...mapState('Wallet', {
      favorites: state => state.favorites
    }),
    favorited () {
      return this.favorites[this.token]
    },
    title () {
      if (this.favorited) {
        return this.$t('stopTrackingThisTokenInTheDashboard')
      } else {
        return this.$t('trackThisTokenInTheDashboard')
      }
    },
    disabled () {
      return this.token === 'logos' && this.favorited && Object.keys(this.favorites).length === 1
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'addFavorite',
      'removeFavorite'
    ]),
    toggleFavorite () {
      if (this.favorited) {
        this.removeFavorite(this.token)
        if (Object.keys(this.favorites).length === 0) this.addFavorite('logos')
      } else {
        this.addFavorite(this.token)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.btn-star {
  display: flex;
  height: 100%;
  width: 100%;
  text-align: left;
  padding: 0px;
  border: none;
}
.btn-star > .wrapper {
  position: relative;
  width: 30px;
  height: 24px;
}
.btn-star > .wrapper > svg {
  position: absolute;
  transition: opacity .3s, transform .3s;
  top: 6px;
  left: 8px;
  opacity: 0;
}
.btn-star > .wrapper > .selected,
.btn-star:not(:disabled):hover > .wrapper > .circle {
  opacity: 1;
}
.circle {
  width: 24px;
  height: 24px;
  background: rgba(theme-color("warning"),0.2);
  border-radius: 100%;
  position: absolute;
  left: 3px;
  opacity: 0;
  transition: opacity .3s, transform .3s;
}
</style>
