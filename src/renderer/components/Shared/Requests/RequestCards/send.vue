<template>
  <b-card
    no-body
    class="text-left border-0"
  >
    <b-card-body>
      <b-card-text>
        <div class="d-flex justify-content-between">
          <div
            v-if="isReceive"
          >
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
              {{ totalReceived }}
              <span v-t="'logos'" />
            </span>
            <span
              v-t="'from'"
              class="text-lowercase"
            />
            <LogosAddress
              :address="requestInfo.origin"
              :force="small"
              :inactive="true"
              :replace="true"
            />
          </div>
          <div
            v-else
          >
            <font-awesome-icon
              :icon="faPaperPlane"
              class="text-danger mr-2"
            />
            <LogosAddress
              v-if="!activeAddress"
              :address="requestInfo.origin"
              :force="small"
              :inactive="true"
              :replace="true"
            />
            <span
              v-if="!activeAddress"
              v-t="'sent'"
              class="text-lowercase"
            />
            <span
              v-else
              v-t="'sent'"
            />
            <span class="text-danger">
              {{ requestInfo.totalAmountLogos }}
              <span v-t="'logos'" />
            </span>
            <span
              v-t="'to'"
              class="text-lowercase"
            />
            <LogosAddress
              v-if="requestInfo.transactions.length === 1"
              :address="requestInfo.transactions[0].destination"
              :force="small"
              :inactive="true"
              :replace="true"
            />
            <span v-else>
              {{ requestInfo.transactions.length }} <span v-t="'accounts'" />
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
import { faPaperPlane, faHandReceiving } from '@fortawesome/pro-light-svg-icons'
import bigInt from 'big-integer'

export default {
  name: 'Send',
  components: {
    'LogosAddress': () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue')
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
    viewAddress () {
      if (this.address) return this.address
      if (this.requestInfo.view) return this.requestInfo.view
      if (this.requestInfo.origin) return this.requestInfo.origin
      return null
    },
    isReceive () {
      if (!this.address) {
        for (let transaction in this.requestInfo.transactions) {
          if (this.requestInfo.transactions[transaction].destination === this.requestInfo.view) {
            return true
          }
        }
      } else {
        for (let transaction in this.requestInfo.transactions) {
          if (this.requestInfo.transactions[transaction].destination === this.address) {
            return true
          }
        }
      }
      return false
    },
    totalReceived () {
      if (this.isReceive) {
        let sum = bigInt(0)
        for (let transaction in this.requestInfo.transactions) {
          if (this.requestInfo.transactions[transaction].destination === this.requestInfo.view) {
            sum = sum.plus(bigInt(this.requestInfo.transactions[transaction].amount))
          }
        }
        return parseInt(this.$Wallet.rpcClient().convert.fromReason(sum.toString(), 'LOGOS'), 10).toLocaleString(this.languageCode, { useGrouping: true })
      }
      return null
    }
  }
}
</script>
<style lang="scss" scoped>
  .timestamp {
    font-size: 1rem
  }
</style>
