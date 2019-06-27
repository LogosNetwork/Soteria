<template>
  <b-card
    no-body
    class="text-left"
  >
    <b-card-body>
      <b-card-title>
        <div class="d-flex justify-content-between">
          <div>
            Update Controller
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
        <strong>Action: </strong>{{ requestInfo.action }}
      </b-list-group-item>
      <b-list-group-item>
        <strong>Controller: </strong><LogosAddress
          :address="requestInfo.controller.account"
          :force="small"
        /><br>
        <ul v-if="requestInfo.controller.privileges.length > 0">
          <li
            v-for="privilege in requestInfo.controller.privileges"
            :key="privilege"
          >
            {{ requestInfo.action === 'add' ? 'added' : 'removed' }} {{ privilege }}
          </li>
        </ul>
        <span v-else-if="requestInfo.action === 'remove'">
          Was Removed from the token's controllers
        </span>
        <span v-else-if="requestInfo.action === 'add'">
          Was Added to the token's controllers with no permissions
        </span>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import token from '@/components/Shared/Requests/token.vue'

export default {
  name: 'UpdateController',
  components: {
    'LogosAddress': () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue'),
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
  }
}
</script>
<style lang="scss" scoped>
  .timestamp {
    font-size: 1rem
  }
</style>
