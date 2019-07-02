<template>
  <span
    v-if="!inactive"
    class="wordBreak"
    @click.stop
  >
    <b-link
      class="d-lg-none"
      :title="address"
      :to="'/'+address"
    >
      <span v-if="replace && label !== null">
        {{ label }}
      </span>
      <span v-else-if="forceExpand">
        {{ address }}
      </span>
      <span v-else>
        {{ abrvAddress }}
      </span>
    </b-link>
    <b-link
      class="d-none d-lg-inline-block"
      :title="address"
      :to="'/'+address"
    >
      <span v-if="replace && label !== null">
        {{ label }}
      </span>
      <span v-else-if="force">
        {{ abrvAddress }}
      </span>
      <span v-else>
        {{ address }}
      </span>
    </b-link>
  </span>
  <span v-else>
    <span
      class="d-lg-none"
      :title="address"
    >
      <span v-if="replace && label !== null">
        {{ label }}
      </span>
      <span v-else-if="forceExpand">
        {{ address }}
      </span>
      <span v-else>
        {{ abrvAddress }}
      </span>
    </span>
    <span
      class="d-none d-lg-inline-block"
      :title="address"
    >
      <span v-if="replace && label !== null">
        {{ label }}
      </span>
      <span v-else-if="force">
        {{ abrvAddress }}
      </span>
      <span v-else>
        {{ address }}
      </span>
    </span>
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LogosAddress',
  props: {
    address: {
      type: String,
      default: null
    },
    inactive: Boolean,
    force: Boolean,
    forceExpand: Boolean,
    separator: {
      type: String,
      default: '...'
    },
    prefixCount: {
      type: Number,
      default: 5
    },
    suffixCount: {
      type: Number,
      default: 5
    },
    replace: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('Wallet', {
      contacts: state => state.contacts
    }),
    abrvAddress: function () {
      if (this.address) {
        return this.address.substring(0, 4 + this.prefixCount) + this.separator + this.address.substring(64 - this.suffixCount, 64)
      } else {
        return ''
      }
    },
    label () {
      for (let address in this.$Wallet.accountsObject) {
        if (address === this.address) {
          return `${this.$Wallet.accountsObject[address].label}`
        }
      }
      for (let token in this.$Wallet.tokenAccounts) {
        if (token === this.address) {
          return `${this.$Wallet.tokenAccounts[token].name} (${this.$Wallet.tokenAccounts[token].symbol})`
        }
      }
      for (let contact of this.contacts) {
        if (contact.address === this.address) {
          if (contact.label.match(/^lgs_[13456789abcdefghijkmnopqrstuwxyz]{60}$/)) {
            return null
          } else {
            return contact.label
          }
        }
      }
      return null
    }
  }
}
</script>
<style scoped lang="scss">
.wordBreak {
  word-break: break-all
}
</style>
