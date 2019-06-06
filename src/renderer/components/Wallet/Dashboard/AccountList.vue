<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <Accounts />
      </b-col>
      <b-col class="text-right">
        <b-button
          variant="link"
          class="p-0"
          @click="show = !show"
        >
          <font-awesome-layers class="fa-lg">
            <font-awesome-icon :icon="['fal','filter']" />
            <font-awesome-icon
              :icon="['fal','plus']"
              transform="shrink-6"
              :style="{ color: 'white' }"
            />
          </font-awesome-layers>
        </b-button>
      </b-col>
    </b-row>
    <TokenPanel v-show="show" />
  </b-container>
</template>

<script>
import Accounts from '@/components/Wallet/Dashboard/AccountList/Accounts.vue'
import TokenPanel from '@/components/Wallet/Dashboard/AccountList/TokenPanel.vue'

export default {
  name: 'AccountList',
  data () {
    return {
      show: false
    }
  },
  components: {
    'Accounts': Accounts,
    'TokenPanel': TokenPanel
  }
}
</script>

<style scoped lang="scss">
</style>
