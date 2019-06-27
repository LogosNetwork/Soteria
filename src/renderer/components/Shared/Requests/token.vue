<template>
  <div>
    <div v-if="tokenInfo.pending !== true">
      <b-card-text @click.stop>
        <span v-if="size && tokenInfo.issuerInfo && tokenInfo.issuerInfo.image"><img
          :alt="`${tokenInfo.name} currency image`"
          :style="{ width: size + 'px', height: size + 'px' }"
          class="avatar mr-2"
          :src="tokenInfo.issuerInfo.image"
        ></span>
        <span v-else-if="tokenInfo.issuerInfo && tokenInfo.issuerInfo.image"><img
          :alt="`${tokenInfo.name} currency image`"
          class="avatar mr-2"
          :src="tokenInfo.issuerInfo.image"
        ></span>
        <font-awesome-layers
          v-if="!tokenInfo.issuerInfo || !tokenInfo.issuerInfo.image"
          class="fa-lg mr-2 align-middle faIcon"
        >
          <font-awesome-icon :icon="faCircle" />
          <font-awesome-icon
            :icon="faCoins"
            transform="shrink-6"
          />
        </font-awesome-layers>
        <b-link
          v-if="!inactive"
          :title="tokenInfo.name"
          :to="'/'+tokenInfo.tokenAccount"
        >
          {{ tokenInfo.name }} - {{ tokenInfo.symbol }}
        </b-link>
        <span v-if="inactive">{{ tokenInfo.name }} - {{ tokenInfo.symbol }}</span>
      </b-card-text>
      <b-card-text v-if="origin">
        <font-awesome-icon
          size="lg"
          class="text-info mr-2 align-middle faIcon"
          :icon="faUserCircle"
        />
        <strong class="mr-2">Controller:</strong>
        <LogosAddress
          class="mr-2"
          :address="origin"
          :force="small"
        />
      </b-card-text>
    </div>
    <div v-if="tokenInfo.pending === true">
      <b-card-text>
        Loading Token Info
      </b-card-text>
    </div>
  </div>
</template>

<script>
import { faCoins, faCircle, faUserCircle } from '@fortawesome/pro-light-svg-icons'
export default {
  name: 'Token',
  components: {
    'LogosAddress': () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue')
  },
  props: {
    tokenInfo: {
      type: Object,
      default: null
    },
    origin: {
      type: String,
      default: null
    },
    inactive: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      faCoins,
      faCircle,
      faUserCircle
    }
  }
}
</script>
<style lang="scss" scoped>
  .faIcon {
    height: 20px;
  }
  .avatar {
    width: 22px;
    height: 22px;
    vertical-align: top;
  }
</style>
