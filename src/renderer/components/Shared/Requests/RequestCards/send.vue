<template>
  <b-card
    no-body
    class="text-left"
  >
    <b-card-body>
      <b-card-text>
        <div class="d-flex justify-content-between">
          <div
            v-if="isReceive"
          >
            <font-awesome-icon
              :icon="faArrowDown"
              class="text-success mr-2"
            />
            <LogosAddress
              :address="viewAddress"
              :force="small"
              :inactive="true"
            />
            <span v-t="'received'" />
            <span class="text-success">
              {{ totalReceived }}
              <span v-t="'logos'" />
            </span>
          </div>
          <div
            v-else
          >
            <font-awesome-icon
              :icon="faPaperPlane"
              class="text-danger mr-2"
            />
            <LogosAddress
              :address="requestInfo.origin"
              :force="small"
              :inactive="true"
            />
            <span v-t="'sent'" />
            <span class="text-danger">
              {{ requestInfo.totalAmountLogos }}
              <span v-t="'logos'" />
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
import { faPaperPlane, faArrowDown } from '@fortawesome/pro-light-svg-icons'
import Logos from '@logosnetwork/logos-rpc-client'
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
      faArrowDown
    }
  },
  computed: {
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
        return parseInt(Logos.convert.fromReason(sum.toString(), 'LOGOS'), 10).toLocaleString(this.languageCode, { useGrouping: true })
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
