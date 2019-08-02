<template>
  <div>
    <div
      :class="{ tokenAccountList: addtoken === true }"
      class="d-inline-block"
    >
      <ul
        v-if="Object.values($Wallet.tokenAccounts).length > 0"
        role="tablist"
        class="nav nav-tabs scroller"
      >
        <b-nav-item
          v-for="account in $Wallet.tokenAccounts"
          :key="account.address"
          href="#"
          class="mb-0"
          :class="{ active: account.address === activeAddress }"
          @click="setCurrentAccount(account.address)"
        >
          <span>
            {{ account.name }} ({{ account.symbol }})
          </span>
        </b-nav-item>
      </ul>
      <b-button
        v-else
        v-b-modal.createToken
        variant="link"
      >
        Create a Token!
      </b-button>
    </div>
    <b-button
      v-if="addtoken"
      v-b-tooltip.hover
      v-b-modal.createToken
      size="sm"
      variant="outline-primary"
      class="align-top text-white btn-xs"
      :title="$t('createToken')"
    >
      <font-awesome-icon
        :icon="['fal','plus']"
      />
    </b-button>
    <b-modal
      id="createToken"
      body-class="pb-0"
      modal-class="pl-0"
      content-class="scroller"
      size="full"
      no-fade
      hide-footer
      hide-header
    >
      <CreateToken />
    </b-modal>
  </div>
</template>

<script>
import CreateToken from '@/components/Wallet/Tokens/CreateToken.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TokenAccounts',
  components: {
    CreateToken
  },
  props: {
    addtoken: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    })
  },
  created () {
    if (!this.$Wallet.tokenAccounts[this.activeAddress]) {
      for (const address in this.$Wallet.tokenAccounts) {
        this.setActiveAddress(address)
        break
      }
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'setActiveAddress'
    ]),
    setCurrentAccount (address) {
      this.setActiveAddress(address)
    }
  }
}
</script>

<style scoped lang="scss">
.tokenAccountList {
  width: calc(100% - 30px);
}
.text-inherit {
  color: inherit
}
.nav-tabs {
  max-height: 39px;
}
.nav-link {
  color: $gray-600;
  padding: 0px;
  padding-left: 0.5rem;
  margin-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 0.5rem;
  border: 0px;
}
.nav-item:not(.active) > .nav-link:hover {
  color: $gray-400;
}
.nav-item.active > .nav-link {
  color: theme-color("base");
  border-bottom: 1px solid theme-color("primary");
  background: transparent;
}
.nav-item:first-child > .nav-link {
  margin-left: 0px;
}
.btn-xs {
  padding: 0rem 0.4rem;
}
.btn-xs > svg {
  position: relative;
  left: 0.5px;
}
</style>
