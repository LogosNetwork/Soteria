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
              {{ totalReceived }} {{ requestInfo.tokenInfo.symbol }}
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
          <div v-else>
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
              {{ requestInfo.totalAmountInToken }} {{ requestInfo.tokenInfo.symbol }}
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
  name: 'TokenSend',
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
      if (!this.address) {
        for (const transaction in this.requestInfo.transactions) {
          if (this.requestInfo.transactions[transaction].destination === this.requestInfo.view) {
            return true
          }
        }
      } else {
        for (const transaction in this.requestInfo.transactions) {
          if (this.requestInfo.transactions[transaction].destination === this.address) {
            return true
          }
        }
      }
      return false
    },
    totalAmount () {
      if (this.requestInfo.tokenInfo.issuerInfo &&
        typeof this.requestInfo.tokenInfo.issuerInfo.decimals !== 'undefined' &&
        this.requestInfo.tokenInfo.issuerInfo.decimals > 0) {
        return parseInt(this.$Wallet.rpcClient().convert.fromTo(this.requestInfo.totalAmount, 0, this.requestInfo.tokenInfo.issuerInfo.decimals), 10).toLocaleString(this.languageCode, { useGrouping: true })
      } else {
        return parseInt(this.requestInfo.totalAmount, 10).toLocaleString(this.languageCode, { useGrouping: true })
      }
    },
    totalReceived () {
      if (this.isReceive) {
        let sum = bigInt(0)
        for (const transaction in this.requestInfo.transactions) {
          if (this.requestInfo.transactions[transaction].destination === this.requestInfo.view) {
            sum = sum.plus(bigInt(this.requestInfo.transactions[transaction].amount))
          }
        }
        if (this.requestInfo.tokenInfo.issuerInfo &&
          typeof this.requestInfo.tokenInfo.issuerInfo.decimals !== 'undefined' &&
          this.requestInfo.tokenInfo.issuerInfo.decimals > 0) {
          return parseInt(this.$Wallet.rpcClient().convert.fromTo(sum.toString(), 0, this.requestInfo.tokenInfo.issuerInfo.decimals), 10).toLocaleString(this.languageCode, { useGrouping: true })
        } else {
          return parseInt(sum.toString(), 10).toLocaleString(this.languageCode, { useGrouping: true })
        }
      }
      return null
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
