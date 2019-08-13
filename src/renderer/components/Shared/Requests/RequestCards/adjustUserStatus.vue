<template>
  <b-card
    no-body
    class="text-left border-0"
  >
    <b-card-body>
      <b-card-text>
        <div class="d-flex justify-content-between">
          <div v-if="requestInfo.status === 'frozen' || requestInfo.status === 'unfrozen'">
            <font-awesome-icon
              :icon="faSnowflake"
              class="text-success mr-2"
            />
            <span
              v-if="requestInfo.status === 'frozen'"
              v-t="'froze'"
            />
            <span
              v-else-if="requestInfo.status === 'unfrozen'"
              v-t="'unfroze'"
            />
            <LogosAddress
              v-if="requestInfo.account"
              :address="requestInfo.account"
              :force="small"
              :inactive="true"
              :replace="true"
            />
          </div>
          <div v-else>
            <font-awesome-icon
              :icon="faListAlt"
              class="text-success mr-2"
            />
            <span
              v-if="requestInfo.status === 'whitelisted'"
              v-t="'whitelisted'"
            />
            <span
              v-else-if="requestInfo.status === 'not_whitelisted'"
              v-t="'removedFromWhitelist'"
            />
            <LogosAddress
              v-if="requestInfo.account"
              :address="requestInfo.account"
              :force="small"
              :inactive="true"
              :replace="true"
            />
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
import { faSnowflake, faListAlt } from '@fortawesome/pro-light-svg-icons'

export default {
  name: 'AdjustUserStatus',
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
      faSnowflake,
      faListAlt
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
</style>
