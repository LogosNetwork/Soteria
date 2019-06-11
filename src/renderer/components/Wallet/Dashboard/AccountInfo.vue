<template>
  <b-container
    fluid
    class="mt-3"
  >
    <div class="text-left">
      Account Info
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountInfo',
  data () {
    return {
      wallet: this.$Wallet
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    })
  },
  methods: {
    ...mapActions('Wallet', [
      'setActiveAddress'
    ])
  }
}
</script>

<style scoped lang="scss">
</style>
