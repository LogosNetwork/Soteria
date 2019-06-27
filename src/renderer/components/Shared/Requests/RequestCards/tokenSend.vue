<template>
  <b-card
    no-body
    class="text-left"
  >
    <b-card-body>
      <b-card-title>
        <div class="d-flex justify-content-between">
          <div v-if="account && requestInfo.origin !== account">
            Token Recieve
          </div>
          <div v-if="!account || (account && requestInfo.origin === account)">
            Token Send
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
        :small="small"
      />
      <b-card-text class="mt-3">
        <font-awesome-icon
          :icon="faPaperPlane"
          class="text-danger mr-2"
        />
        <LogosAddress
          class="mr-2"
          :address="requestInfo.origin"
          :force="small"
        />
        <span class="mr-2">sent</span>
        <span
          v-if="requestInfo.totalAmountInToken"
          class="text-danger mr-2"
        >{{ requestInfo.totalAmountInToken }}</span>
        <span
          v-if="typeof requestInfo.totalAmountInToken === 'undefined'"
          class="text-danger mr-2"
        >{{ requestInfo.totalAmount }}</span>
        <span>{{ requestInfo.tokenInfo.symbol }}</span>
      </b-card-text>
    </b-card-body>
    <b-list-group flush>
      <b-list-group-item
        v-for="transaction in requestInfo.transactions"
        :key="transaction.hash"
      >
        <font-awesome-icon
          :icon="faArrowDown"
          class="text-success mr-2"
        />
        <LogosAddress
          class="mr-2"
          :address="transaction.destination"
          :force="small"
        />
        <span class="mr-2">received</span>
        <span
          v-if="transaction.amountInToken"
          class="text-success mr-2"
        >{{ transaction.amountInToken }}</span>
        <span
          v-if="typeof transaction.amountInToken === 'undefined'"
          class="text-success mr-2"
        >{{ transaction.amount }}</span>
        <span>{{ requestInfo.tokenInfo.symbol }}</span>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import { faPaperPlane, faArrowDown } from '@fortawesome/pro-light-svg-icons'
import token from '@/components/Shared/Requests/token.vue'

export default {
  name: 'TokenSend',
  components: {
    'LogosAddress': () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue'),
    'token': token
  },
  props: {
    requestInfo: {
      type: Object,
      default: null
    },
    account: {
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
      faPaperPlane,
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
