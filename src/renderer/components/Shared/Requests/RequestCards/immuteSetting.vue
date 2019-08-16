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
              :icon="faLockAlt"
              class="text-success mr-2"
            />
            <span
              v-t="'immutedSettingOf'"
            />
            <span
              v-if="requestInfo.setting === 'issuance'"
              v-t="'tokenActions.mint'"
              class="text-success"
            />
            <span
              v-else-if="requestInfo.setting === 'revoke'"
              v-t="'tokenActions.revoke'"
              class="text-success"
            />
            <span
              v-else-if="requestInfo.setting === 'freeze'"
              v-t="'tokenActions.freeze'"
              class="text-success"
            />
            <span
              v-else-if="requestInfo.setting === 'adjust_fee'"
              v-t="'tokenActions.adjustFee'"
              class="text-success"
            />
            <span
              v-else-if="requestInfo.setting === 'whitelist'"
              v-t="'tokenActions.whitelist'"
              class="text-success"
            />
            <span
              v-t="'to'"
              class="text-lowercase"
            />
            <span
              v-t="tokenAccount.hasSetting(requestInfo.setting) ? 'true' : 'false'"
              :class="tokenAccount.hasSetting(requestInfo.setting) ? 'text-success' : 'text-danger'"
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
import { faLockAlt } from '@fortawesome/pro-light-svg-icons'

export default {
  name: 'ImmuteSetting',
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
      faLockAlt
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    tokenAccount () {
      return this.$Wallet.tokenAccounts[this.activeAddress]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
