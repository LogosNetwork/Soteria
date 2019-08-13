<template>
  <b-card
    no-body
    class="text-left border-0"
  >
    <b-card-body>
      <b-card-text>
        <div class="d-flex justify-content-between">
          <div v-if="isReceive">
            <font-awesome-icon
              :icon="faHandReceiving"
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
              v-t="'received'"
              class="text-lowercase"
            />
            <span
              v-else
              v-t="'received'"
            />
            <span class="text-success">
              {{ requestInfo.transaction.amountInLogos }}
              <span v-t="'logos'" />
            </span>
            <span
              v-t="'from'"
              class="text-lowercase"
            />
            <LogosAddress
              :address="$Utils.accountFromHexKey(requestInfo.token_id)"
              :force="small"
              :inactive="true"
              :replace="true"
            />
          </div>
          <div v-else>
            <font-awesome-icon
              :icon="faPaperPlane"
              class="text-danger mr-2"
            />
            <span
              v-t="'sent'"
            />
            <span class="text-danger">
              {{ requestInfo.transaction.amountInLogos }}
              <span v-t="'logos'" />
            </span>
            <span
              v-t="'to'"
              class="text-lowercase"
            />
            <LogosAddress
              :address="requestInfo.transaction.destination"
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
import { faPaperPlane, faHandReceiving } from '@fortawesome/pro-light-svg-icons'

export default {
  name: 'WithdrawLogos',
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
      faPaperPlane,
      faHandReceiving
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    isReceive () {
      if (this.address) {
        if (this.requestInfo.transaction.destination === this.address) {
          return true
        }
      } else {
        if (this.requestInfo.transaction.destination === this.requestInfo.view) {
          return true
        }
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
