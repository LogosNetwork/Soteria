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
              v-if="requestInfo.setting === 'issuance'"
              :icon="faMagic"
              class="text-success mr-2"
            />
            <font-awesome-icon
              v-else-if="requestInfo.setting === 'revoke'"
              :icon="faMask"
              class="text-success mr-2"
            />
            <font-awesome-icon
              v-if="requestInfo.setting === 'freeze'"
              :icon="faSnowflake"
              class="text-success mr-2"
            />
            <font-awesome-icon
              v-if="requestInfo.setting === 'adjust_fee'"
              :icon="faPercentage"
              class="text-success mr-2"
            />
            <font-awesome-icon
              v-if="requestInfo.setting === 'whitelist'"
              :icon="faListAlt"
              class="text-success mr-2"
            />
            <span
              v-t="'changedSettingOf'"
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
              v-if="requestInfo.value === true"
              v-t="'true'"
              class="text-success"
            />
            <span
              v-else-if="requestInfo.value === false"
              v-t="'false'"
              class="text-danger"
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
import { faListAlt, faMagic, faMask, faSnowflake, faPercentage } from '@fortawesome/pro-light-svg-icons'

export default {
  name: 'ChangeSetting',
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
      faListAlt,
      faMagic,
      faMask,
      faSnowflake,
      faPercentage
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
