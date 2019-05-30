
<template>
  <div>
    <div class="borderBottom">
      <font-awesome-icon class="icon text-primary mb-3" size="3x" :icon="['fal','lambda']" />
    </div>
    <Accounts/>
    <Navigation class="borderTop"/>
  </div>
</template>

<script>
import Accounts from '@/components/Wallet/Accounts.vue'
import Navigation from '@/components/Wallet/Navigation.vue'

export default {
  name: 'Sidebar',
  components: {
    'Accounts': Accounts,
    'Navigation': Navigation
  }
}
</script>

<style scoped lang="scss">
  .borderBottom {
    -webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.1), 0 1.5px 0 rgba(43,44,49,1), 0 3px 0 rgba(43,44,49,.5);
    box-shadow: 0 1px 0 rgba(0,0,0,0.1), 0 1.5px 0 rgba(43,44,49,1), 0 3px 0 rgba(43,44,49,.5);
  }
  .borderTop {
    -webkit-box-shadow: 0 -1px 0 rgba(0,0,0,0.1), 0 -1.5px 0 rgba(43,44,49,1), 0 -3px 0 rgba(43,44,49,.5);
    box-shadow: 0 -1px 0 rgba(0,0,0,0.1), 0 -1.5px 0 rgba(43,44,49,1), 0 -3px 0 rgba(43,44,49,.5);
  }
</style>