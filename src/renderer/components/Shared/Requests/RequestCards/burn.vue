<template>
  <b-card
    no-body
    class="text-left"
  >
    <b-card-body>
      <b-card-title>
        <div class="d-flex justify-content-between">
          <div>
            Burn
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
          :icon="faFire"
          class="text-danger mr-2"
        />
        <strong class="mr-2">Burned</strong>
        <span
          v-if="requestInfo.amountInToken"
          class="text-danger mr-2"
        >{{ requestInfo.amountInToken }}</span>
        <span
          v-if="typeof requestInfo.amountInToken === 'undefined'"
          class="text-danger mr-2"
        >{{ requestInfo.amount }}</span>
        <span>{{ requestInfo.tokenInfo.symbol }}</span>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import { faFire } from '@fortawesome/pro-light-svg-icons'
import token from '@/components/Shared/Requests/token.vue'

export default {
  name: 'Burn',
  components: {
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
      faFire
    }
  }
}
</script>
<style lang="scss" scoped>
  .timestamp {
    font-size: 1rem
  }
</style>
