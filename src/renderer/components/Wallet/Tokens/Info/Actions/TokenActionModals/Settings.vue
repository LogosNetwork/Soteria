<template>
  <div>
    <b-container
      class="text-left"
      fluid
    >
      <b-form-group
        :label="$t('settings')"
        :label-size="'lg'"
      >
        <b-input-group :size="'lg'">
          <Multiselect
            id="settingSelector"
            v-model="setting"
            class="w-100"
            required
            track-by="text"
            label="text"
            :options="settings"
            :multiple="false"
            placeholder="Search for setting"
          >
            <template
              slot="singleLabel"
              slot-scope="{ option }"
            >
              {{ option.text }}
            </template>
          </Multiselect>
        </b-input-group>
      </b-form-group>
    </b-container>
    <b-row
      class="mt-3"
    >
      <b-col class="p-0 w-100">
        <b-button-group
          class="w-100"
          size="lg"
        >
          <b-button
            v-t="'send'"
            :disabled="!setting"
            class="w-100"
            variant="primary"
            @click="changeSetting()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  components: {
    Multiselect: () => import(/* webpackChunkName: "Multiselect" */'vue-multiselect')
  },
  data () {
    return {
      type: 'change',
      setting: null,
      value: ''
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    settings () {
      const settings = []
      const privs = {
        issuance: false,
        revoke: false,
        freeze: false,
        adjust_fee: false,
        whitelist: false,
        modify_issuance: false,
        modify_revoke: false,
        modify_freeze: false,
        modify_adjust_fee: false,
        modify_whitelist: false
      }
      for (const account in this.$Wallet.accounts) {
        if (privs.issuance === false &&
          this.tokenAccount.hasSetting('modify_issuance') &&
          this.tokenAccount.controllerPrivilege(account, 'change_issuance')) {
          settings.push({
            type: 'change',
            setting: 'issuance',
            priv: 'change_issuance',
            value: this.tokenAccount.hasSetting('issuance'),
            text: `${this.tokenAccount.hasSetting('issuance') ? this.$t('disable') : this.$t('enable')} ${this.$t('mintingNewTokens')}`
          })
          privs.issuance = true
        }

        if (privs.revoke === false &&
          this.tokenAccount.hasSetting('modify_revoke') &&
          this.tokenAccount.controllerPrivilege(account, 'change_revoke')) {
          settings.push({
            type: 'change',
            setting: 'revoke',
            priv: 'change_revoke',
            value: this.tokenAccount.hasSetting('revoke'),
            text: `${this.tokenAccount.hasSetting('revoke') ? this.$t('disable') : this.$t('enable')} ${this.$t('revokingTokensFromUsers')}`
          })
          privs.revoke = true
        }

        if (privs.freeze === false &&
          this.tokenAccount.hasSetting('modify_freeze') &&
          this.tokenAccount.controllerPrivilege(account, 'change_freeze')) {
          settings.push({
            type: 'change',
            setting: 'freeze',
            priv: 'change_freeze',
            value: this.tokenAccount.hasSetting('freeze'),
            text: `${this.tokenAccount.hasSetting('freeze') ? this.$t('disable') : this.$t('enable')} ${this.$t('freezingUserAccounts')}`
          })
          privs.freeze = true
        }

        if (privs.adjust_fee === false &&
          this.tokenAccount.hasSetting('modify_adjust_fee') &&
          this.tokenAccount.controllerPrivilege(account, 'change_adjust_fee')) {
          settings.push({
            type: 'change',
            setting: 'adjust_fee',
            priv: 'change_adjust_fee',
            value: this.tokenAccount.hasSetting('adjust_fee'),
            text: `${this.tokenAccount.hasSetting('adjust_fee') ? this.$t('disable') : this.$t('enable')} ${this.$t('adjustingFees')}`
          })
          privs.adjust_fee = true
        }

        if (privs.whitelist === false &&
          this.tokenAccount.hasSetting('modify_whitelist') &&
          this.tokenAccount.controllerPrivilege(account, 'change_whitelist')) {
          settings.push({
            type: 'change',
            setting: 'whitelist',
            priv: 'change_whitelist',
            value: this.tokenAccount.hasSetting('whitelist'),
            text: `${this.tokenAccount.hasSetting('whitelist') ? this.$t('disable') : this.$t('enable')} ${this.$t('theRequirementOfBeingWhitelisted')}`
          })
          privs.whitelist = true
        }

        if (privs.modify_issuance === false &&
          this.tokenAccount.hasSetting('modify_issuance') &&
          this.tokenAccount.controllerPrivilege(account, 'change_modify_issuance')) {
          settings.push({
            type: 'immute',
            setting: 'issuance',
            priv: 'change_modify_issuance',
            text: `${this.$t('abilityToMintTokens')} ${this.tokenAccount.hasSetting('issuance') ? this.$t('true') : this.$t('false')}`
          })
          privs.modify_issuance = true
        }

        if (privs.modify_revoke === false &&
          this.tokenAccount.hasSetting('modify_revoke') &&
          this.tokenAccount.controllerPrivilege(account, 'change_modify_revoke')) {
          settings.push({
            type: 'immute',
            setting: 'revoke',
            priv: 'change_modify_revoke',
            text: `${this.$t('abilityToRevokeTokens')} ${this.tokenAccount.hasSetting('revoke') ? this.$t('true') : this.$t('false')}`
          })
          privs.modify_revoke = true
        }

        if (privs.modify_freeze === false &&
          this.tokenAccount.hasSetting('modify_freeze') &&
          this.tokenAccount.controllerPrivilege(account, 'change_modify_freeze')) {
          settings.push({
            type: 'immute',
            setting: 'freeze',
            priv: 'change_modify_freeze',
            text: `${this.$t('abilityToFreezeAccounts')} ${this.tokenAccount.hasSetting('freeze') ? this.$t('true') : this.$t('false')}`
          })
          privs.modify_freeze = true
        }

        if (privs.modify_adjust_fee === false &&
          this.tokenAccount.hasSetting('modify_adjust_fee') &&
          this.tokenAccount.controllerPrivilege(account, 'change_modify_adjust_fee')) {
          settings.push({
            type: 'immute',
            setting: 'adjust_fee',
            priv: 'change_modify_adjust_fee',
            text: `${this.$t('abilityToAdjustTokenFee')} ${this.tokenAccount.hasSetting('adjust_fee') ? this.$t('true') : this.$t('false')}`
          })
          privs.modify_adjust_fee = true
        }

        if (privs.modify_whitelist === false &&
          this.tokenAccount.hasSetting('modify_whitelist') &&
          this.tokenAccount.controllerPrivilege(account, 'change_modify_whitelist')) {
          settings.push({
            type: 'immute',
            setting: 'whitelist',
            priv: 'change_modify_whitelist',
            text: `${this.$t('abilityToWhitelist')} ${this.tokenAccount.hasSetting('whitelist') ? this.$t('true') : this.$t('false')}`
          })
          privs.modify_whitelist = true
        }
      }
      return settings
    },
    tokenAccount () {
      return this.$Wallet.tokenAccounts[this.activeAddress]
    }
  },
  mounted () {
    if (this.settings.length > 0) {
      this.setting = this.settings[0]
    }
  },
  methods: {
    changeSetting () {
      for (const accountAddress in this.$Wallet.accounts) {
        if (this.tokenAccount.controllerPrivilege(accountAddress, this.setting.priv)) {
          if (this.setting.type === 'change') {
            this.$Wallet.accounts[accountAddress].createChangeSettingRequest({
              tokenAccount: this.tokenAccount.address,
              setting: this.setting.setting,
              value: !this.setting.value
            })
          } else if (this.setting.type === 'immute') {
            this.$Wallet.accounts[accountAddress].createImmuteSettingRequest({
              tokenAccount: this.tokenAccount.address,
              setting: this.setting.setting
            })
          }
          this.$emit('sent')
          break
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
