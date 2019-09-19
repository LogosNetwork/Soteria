<template>
  <div>
    <b-container
      class="text-left"
      fluid
    >
      <div>
        <b-form-group
          class="mt-3"
          label-size="lg"
          :label="`Optional Issuer Info Parameters`"
        >
          <b-form-group
            id="tokenDecimals"
            label="Token Decimals"
            :description="decimals !== '' ? `${$t('totalSupplyWouldBe')} ${totalSupply}` : ''"
          >
            <b-input-group size="lg">
              <b-form-input
                id="tokenDecimalsInput"
                v-model="decimals"
                autocomplete="off"
                aria-describedby="decimalError"
                :state="validDecimal"
                placeholder="Enter the decimal value of the display unit"
              />
              <b-form-invalid-feedback id="decimalError">
                Optional, must be an integer value
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group
            id="tokenImage"
            label="Token Image"
            :description="`Optionally provide a url to small 128x128 image to be your default icon`"
          >
            <b-input-group size="lg">
              <b-form-input
                id="tokenImageInput"
                v-model="image"
                autocomplete="off"
                placeholder="Enter image url"
                aria-describedby="imageError"
                :state="validImage"
              />
              <b-form-invalid-feedback id="imageError">
                Must be a valid URL
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group
            id="tokenWebsite"
            label="Token Website"
            :description="`Optionally provide a website url to let people learn more about your token`"
          >
            <b-input-group size="lg">
              <b-form-input
                id="websiteInput"
                v-model="website"
                autocomplete="off"
                placeholder="Enter Website URL"
                aria-describedby="urlError"
                :state="validURL"
              />
              <b-form-invalid-feedback id="urlError">
                Must be a valid URL
              </b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-t="'insufficientLogosFunds'"
                class="text-danger"
                :class="!hasFee ? 'd-block': ''"
              />
            </b-input-group>
          </b-form-group>
        </b-form-group>
      </div>
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
            :disabled="validImage === false || validURL === false || validDecimal === false || !hasFee"
            class="w-100"
            variant="primary"
            @click="editInfo()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bigInt from 'big-integer'

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
export default {
  name: 'Burn',
  data () {
    return {
      decimals: '',
      website: '',
      image: ''
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    validImage () {
      if (this.image === '') return null
      return urlRegex.test(this.image)
    },
    validURL () {
      if (this.website === '') return null
      return urlRegex.test(this.website)
    },
    hasFee () {
      return bigInt(this.tokenAccount.balance).minus(bigInt(this.$Utils.minimumFee)).greaterOrEquals(0)
    },
    validDecimal () {
      if (this.decimals === '') return null
      return /^([0-9]+)$/.test(this.decimals)
    },
    tokenAccount () {
      return this.$Wallet.tokenAccounts[this.activeAddress]
    },
    currentDecimal () {
      if (this.tokenAccount.decimals) {
        return this.tokenAccount.decimals
      } else {
        return '0'
      }
    },
    totalSupply () {
      if (this.decimals === '') return null
      return this.$Wallet.rpcClient.convert.fromTo(this.tokenAccount.totalSupply, this.currentDecimal, this.decimals)
    }
  },
  mounted () {
    this.decimals = this.currentDecimal
    try {
      const parsedInfo = JSON.parse(this.issuerInfo)
      if (parsedInfo &&
        typeof parsedInfo.image !== 'undefined') {
        this.image = parsedInfo.image
      }
      if (parsedInfo &&
        typeof parsedInfo.website !== 'undefined') {
        this.website = parsedInfo.website
      }
    } catch (e) {
      console.log('invalid token info')
    }
  },
  methods: {
    editInfo () {
      for (const accountAddress in this.$Wallet.accounts) {
        if (this.tokenAccount.controllerPrivilege(accountAddress, 'update_issuer_info')) {
          let issuerInfo = {}
          if (this.validDecimal) {
            issuerInfo.decimals = this.decimals
          }
          if (this.validImage) {
            issuerInfo.image = this.image
          }
          if (this.validURL) {
            issuerInfo.website = this.website
          }
          issuerInfo = JSON.stringify(issuerInfo)
          this.$Wallet.accounts[accountAddress].createUpdateIssuerInfoRequest({
            tokenAccount: this.tokenAccount.address,
            issuerInfo: issuerInfo
          })
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
