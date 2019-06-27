<template>
  <b-card
    no-body
    class="text-left"
  >
    <b-card-body>
      <b-card-title>
        <div class="d-flex justify-content-between">
          <div>
            Revoke
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
        <font-awesome-icon
          :icon="faMask"
          class="text-danger mr-2"
        />
        <LogosAddress
          class="mr-2"
          :address="requestInfo.source"
          :force="small"
        />
        <span class="mr-2">was revoked</span>
        <span
          v-if="requestInfo.transaction.amountInToken"
          class="text-danger mr-2"
        >{{ requestInfo.transaction.amountInToken }}</span>
        <span
          v-if="typeof requestInfo.transaction.amountInToken === 'undefined'"
          class="text-danger mr-2"
        >{{ requestInfo.transaction.amount }}</span>
        <span>{{ requestInfo.tokenInfo.symbol }}</span>
      </b-list-group-item>
      <b-list-group-item>
        <font-awesome-icon
          :icon="faArrowDown"
          class="text-success mr-2"
        />
        <LogosAddress
          class="mr-2"
          :address="requestInfo.transaction.destination"
          :force="small"
        />
        <span class="mr-2">received</span>
        <span
          v-if="requestInfo.transaction.amountInToken"
          class="text-success mr-2"
        >{{ requestInfo.transaction.amountInToken }}</span>
        <span
          v-if="typeof requestInfo.transaction.amountInToken === 'undefined'"
          class="text-success mr-2"
        >{{ requestInfo.transaction.amount }}</span>
        <span>{{ requestInfo.tokenInfo.symbol }}</span>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import { faMask, faArrowDown } from '@fortawesome/pro-light-svg-icons'
import token from '@/components/Shared/Requests/token.vue'

export default {
  name: 'Revoke',
  components: {
    'LogosAddress': () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue'),
    'token': token
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
  },
  data () {
    return {
      faMask,
      faArrowDown
    }
  }
}
</script>
<style lang="scss" scoped>
  .timestamp {
    font-size: 1rem
  }
</style>
