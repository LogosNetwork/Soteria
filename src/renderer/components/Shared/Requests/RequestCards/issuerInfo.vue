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
              :icon="faEdit"
              class="text-success mr-2"
            />
            <LogosAddress
              :address="requestInfo.origin"
              :force="small"
              :inactive="true"
              :replace="true"
            />
            <span
              v-t="'updatedIssuerInfo'"
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
import { faEdit } from '@fortawesome/pro-light-svg-icons'

export default {
  name: 'UpdateIssuerInfo',
  components: {
    LogosAddress: () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue')
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
      faEdit
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
