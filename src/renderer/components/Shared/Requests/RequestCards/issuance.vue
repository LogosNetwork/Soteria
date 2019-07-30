<template>
  <b-card
    no-body
    class="text-left border-0"
  >
    <b-card-body>
      <b-card-text>
        <div class="d-flex justify-content-between">
          <div>
            <font-awesome-icon
              :icon="faCoins"
              class="text-success mr-2"
            />
            <LogosAddress
              v-if="!activeAddress"
              :address="requestInfo.view"
              :force="small"
              :inactive="true"
              :replace="true"
            />
            <span
              v-if="!activeAddress"
              v-t="'issued'"
              class="text-lowercase"
            />
            <span
              v-else
              v-t="'issued'"
            />
            <span class="text-success">
              {{ requestInfo.name }} ({{ requestInfo.symbol }})
            </span>
          </div>
          <div class="timestamp text-right">
            <small>
              <span v-if="requestInfo.createdAt">{{ requestInfo.createdAt | fromNow }}</span>
              <span v-if="requestInfo.timestamp">{{ requestInfo.timestamp | fromNow }}</span>
            </small>
          </div>
        </div>
      </b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import { faCoins } from '@fortawesome/pro-light-svg-icons'

export default {
  name: 'Issuance',
  components: {
    LogosAddress: () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue')
  },
  props: {
    requestInfo: {
      type: Object,
      default: null
    },
    address: {
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
      faCoins
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    })
  }
}
</script>
<style lang="scss" scoped>
  .timestamp {
    font-size: 1rem
  }
</style>
