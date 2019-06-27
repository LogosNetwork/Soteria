<template>
  <b-card
    no-body
    class="text-left"
  >
    <b-card-body>
      <b-card-title>
        <div class="d-flex justify-content-between">
          <div>
            Update Info
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
        <codepad
          class="text-left"
          :code="requestInfo.prettyInfo"
          :thin="true"
        />
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import token from '@/components/Shared/Requests/token.vue'

export default {
  name: 'IssuerInfo',
  components: {
    'token': token,
    'codepad': () => import(/* webpackChunkName: "Codepad" */ '@/components/Shared/codepad.vue')
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
  }
}
</script>
<style lang="scss" scoped>
  .timestamp {
    font-size: 1rem
  }
</style>
