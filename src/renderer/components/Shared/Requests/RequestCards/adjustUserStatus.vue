<template>
  <b-card
    no-body
    class="text-left"
  >
    <b-card-body>
      <b-card-title>
        <div class="d-flex justify-content-between">
          <div>
            Adjust User Status
          </div>
          <div class="timestamp text-right">
            <small>
              <span v-if="requestInfo.createdAt">{{ requestInfo.createdAt | fromNow }}</span>
              <span v-if="requestInfo.timestamp">{{ requestInfo.timestamp | fromNow }}</span>
            </small>
          </div>
        </div>
      </b-card-title>
      <token
        :token-info="requestInfo.tokenInfo"
        :origin="requestInfo.origin"
        :small="small"
      />
    </b-card-body>
    <b-list-group flush>
      <b-list-group-item>
        <strong class="mr-2">{{ requestInfo.status }}</strong>
        <LogosAddress
          class="mr-2"
          :address="requestInfo.account"
          :force="small"
        />
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import token from '@/components/Shared/Requests/token.vue'

export default {
  name: 'AdjustUserStatus',
  components: {
    LogosAddress: () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue'),
    token: token
  },
  props: {
    requestInfo: {
      type: Object,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .timestamp {
    font-size: 1rem
  }
</style>
