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
              :icon="faMagic"
              class="text-success mr-2"
            />
            <span
              v-t="'minted'"
            />
            <span class="text-success">
              {{ totalAmount }} {{ requestInfo.tokenInfo.symbol }}
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
import { faMagic } from '@fortawesome/pro-light-svg-icons'
import bigInt from 'big-integer'

export default {
  name: 'Mint',
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
      faMagic
    }
  },
  computed: {
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    totalAmount () {
      const sum = bigInt(this.requestInfo.amount)
      if (this.requestInfo.tokenInfo.issuerInfo &&
        typeof this.requestInfo.tokenInfo.issuerInfo.decimals !== 'undefined' &&
        this.requestInfo.tokenInfo.issuerInfo.decimals > 0) {
        return parseFloat(this.$Wallet.rpcClient.convert.fromTo(sum.toString(), 0, this.requestInfo.tokenInfo.issuerInfo.decimals)).toLocaleString(this.languageCode, { useGrouping: true })
      } else {
        return parseFloat(sum.toString()).toLocaleString(this.languageCode, { useGrouping: true })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
