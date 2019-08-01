<template>
  <span>
    <!-- Issuance -->
    <span
      v-if="token.hasSetting('issuance') && !token.hasSetting('modify_issuance')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} allows controllers to mint more ${token.symbol}. This is a permanent setting and cannot be disabled.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faMagic" />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-15 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="token.hasSetting('issuance') && token.hasSetting('modify_issuance')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} allows controllers to mint more ${token.symbol}. This can be disabled by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faMagic" />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-15 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('issuance') && token.hasSetting('modify_issuance')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not allow controllers to mint more ${token.symbol}. This can be changed by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faMagic"
          transform="shrink-6"
        />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-15 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('issuance') && !token.hasSetting('modify_issuance')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not allow controllers to mint more ${token.symbol}. This is a permanent settings and cannot be changed.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faMagic"
          transform="shrink-6"
        />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-15 down-2"
        />
      </font-awesome-layers>
    </span>
    <!-- Revoke -->
    <span
      v-if="token.hasSetting('revoke') && !token.hasSetting('modify_revoke')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} allows controllers to revoke ${token.symbol} from token holder's accounts. This is a permanent setting and cannot be disabled.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faMask" />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-18 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="token.hasSetting('revoke') && token.hasSetting('modify_revoke')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} allows controllers to revoke ${token.symbol} from token holder's accounts. This can be disabled by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faMask" />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-18 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('revoke') && token.hasSetting('modify_revoke')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not allow controllers to revoke ${token.symbol} from token holder's accounts. This can be changed by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faMask"
          transform="shrink-8 left-2"
        />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-18 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('revoke') && !token.hasSetting('modify_revoke')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not allow controllers to revoke ${token.symbol} from token holder's accounts. This is a permanent settings and cannot be changed.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faMask"
          transform="shrink-8 left-2"
        />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-18 down-2"
        />
      </font-awesome-layers>
    </span>
    <!-- Freeze -->
    <span
      v-if="token.hasSetting('freeze') && !token.hasSetting('modify_freeze')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} allows controllers to freeze the funds in a ${token.symbol} accounts. This is a permanent setting and cannot be disabled.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faSnowflake" />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-14 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="token.hasSetting('freeze') && token.hasSetting('modify_freeze')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} allows controllers to freeze the funds in a ${token.symbol} accounts. This can be disabled by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faSnowflake" />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-14 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('freeze') && token.hasSetting('modify_freeze')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not allow controllers to freeze the funds in a ${token.symbol} from accounts. This can be changed by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faSnowflake"
          transform="shrink-6"
        />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-14 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('freeze') && !token.hasSetting('modify_freeze')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not allow controllers to freeze the funds in a ${token.symbol} from accounts. This is a permanent settings and cannot be changed.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faSnowflake"
          transform="shrink-6"
        />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-14 down-2"
        />
      </font-awesome-layers>
    </span>
    <!-- Adjust Fee -->
    <span
      v-if="token.hasSetting('adjust_fee') && !token.hasSetting('modify_adjust_fee')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} allows controllers to adjust the fee of ${token.symbol}. This is a permanent setting and cannot be disabled.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faPercentage" />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-14 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="token.hasSetting('adjust_fee') && token.hasSetting('modify_adjust_fee')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} allows controllers to adjust the fee of ${token.symbol}. This can be disabled by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faPercentage" />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-14 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('adjust_fee') && token.hasSetting('modify_adjust_fee')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not allow controllers to adjust the fee of ${token.symbol}. This can be changed by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faPercentage"
          transform="shrink-6"
        />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-14 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('adjust_fee') && !token.hasSetting('modify_adjust_fee')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not allow controllers to adjust the fee of ${token.symbol}. This is a permanent settings and cannot be changed.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faPercentage"
          transform="shrink-6"
        />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-14 down-2"
        />
      </font-awesome-layers>
    </span>
    <!-- Whitelist -->
    <span
      v-if="token.hasSetting('whitelist') && !token.hasSetting('modify_whitelist')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} requires accounts to be whitelisted prior to using the ${token.symbol} token. This is a permanent setting and cannot be disabled.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faListAlt" />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-15 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="token.hasSetting('whitelist') && token.hasSetting('modify_whitelist')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} requires accounts to be whitelisted prior to using the ${token.symbol} token. This can be disabled by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon :icon="faListAlt" />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-15 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('whitelist') && token.hasSetting('modify_whitelist')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not require accounts to be whitelisted prior to using the ${token.symbol} token. This can be changed by a ${token.name} controller.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faListAlt"
          transform="shrink-6"
        />
        <font-awesome-icon
          :icon="faLockOpenAlt"
          transform="shrink-6 right-15 down-2"
        />
      </font-awesome-layers>
    </span>
    <span
      v-if="!token.hasSetting('whitelist') && !token.hasSetting('modify_whitelist')"
      v-b-tooltip.hover
      class="d-inline-block mr-2"
      :title="`${token.name} does not require accounts to be whitelisted prior to using the ${token.symbol} token. This is a permanent settings and cannot be changed.`"
    >
      <font-awesome-layers class="fa-lg mr-4">
        <font-awesome-icon
          :icon="faBan"
          class="text-danger"
        />
        <font-awesome-icon
          :icon="faListAlt"
          transform="shrink-6"
        />
        <font-awesome-icon
          :icon="faLockAlt"
          transform="shrink-6 right-15 down-2"
        />
      </font-awesome-layers>
    </span>
  </span>
</template>

<script>
import { faPercentage, faMagic, faSnowflake, faMask, faListAlt, faLockOpenAlt, faLockAlt, faBan } from '@fortawesome/pro-light-svg-icons'

export default {
  name: 'TokenSettings',
  props: {
    token: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      faPercentage,
      faMagic,
      faSnowflake,
      faMask,
      faListAlt,
      faLockOpenAlt,
      faLockAlt,
      faBan
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
