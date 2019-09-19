<template>
  <div>
    <b-container
      class="text-left"
      fluid
    >
      <div>
        <b-form-group
          id="tokenFeeType"
          :label="$t('feeType')"
          label-size="lg"
          description=""
        >
          <b-input-group size="lg">
            <Multiselect
              id="feeTypeInput"
              v-model="feeType"
              class="w-100"
              :allow-empty="false"
              :searchable="false"
              :deselect-label="$t('cantRemove')"
              :options="feeOptions"
            />
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="tokenFeeRate"
          :label="$t('feeRate')"
          label-size="lg"
        >
          <b-input-group size="lg">
            <b-form-input
              id="feeRateInput"
              v-model="feeRate"
              autocomplete="off"
              :placeholder="`${$t('amountIn')} ${tokenAccount.name}`"
            />
          </b-input-group>
          <b-form-invalid-feedback
            v-t="'insufficientLogosFunds'"
            class="text-danger"
            :class="!hasFee ? 'd-block': ''"
          />
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
            :disabled="!validFeeRate || !hasFee"
            class="w-100"
            variant="primary"
            @click="adjustFee()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bigInt from 'big-integer'

export default {
  name: 'AdjustFee',
  components: {
    Multiselect: () => import(/* webpackChunkName: "Multiselect" */'vue-multiselect')
  },
  data () {
    return {
      feeType: '',
      feeRate: '',
      feeOptions: ['flat', 'percentage']
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    tokenAccount () {
      return this.$Wallet.tokenAccounts[this.activeAddress]
    },
    feeRateInMinorUnit () {
      if (this.feeRate === '') return false
      if (this.feeType === 'percentage') {
        return this.feeRate
      }
      if (this.tokenAccount.decimals !== null) {
        if (!/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(this.feeRate)) return false
        return this.tokenAccount.convertToMinor(this.feeRate)
      } else {
        if (!/^([0-9]+)$/.test(this.feeRate)) return false
        return this.feeRate
      }
    },
    feeRateInMajorUnit () {
      if (this.feeRate === '') return false
      if (this.tokenAccount.decimals === null) return false
      if (!/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(this.feeRate)) return false
      return this.feeRate
    },
    hasFee () {
      return bigInt(this.tokenAccount.balance).minus(bigInt(this.$Utils.minimumFee)).greaterOrEquals(0)
    },
    validFeeRate () {
      if (this.feeType === '') return null
      if (this.feeRate === '') return null
      if (this.feeType === 'percentage') {
        return bigInt(this.feeRate).lesser(bigInt(100)) && bigInt(this.feeRate).greaterOrEquals(bigInt(0))
      } else if (this.feeType === 'flat') {
        return bigInt(this.tokenAccount.totalSupply).greaterOrEquals(bigInt(this.feeRate))
      }
      return null
    }
  },
  mounted () {
    if (this.tokenAccount.feeType === 'flat') {
      this.feeType = 'flat'
      if (this.tokenAccount.decimals) {
        this.feeRate = this.tokenAccount.convertToMajor(this.tokenAccount.feeRate)
      } else {
        this.feeRate = this.tokenAccount.feeRate
      }
    } else {
      this.feeType = 'percentage'
      this.feeRate = this.tokenAccount.feeRate
    }
  },
  methods: {
    adjustFee () {
      for (const accountAddress in this.$Wallet.accounts) {
        if (this.tokenAccount.controllerPrivilege(accountAddress, 'adjust_fee')) {
          this.$Wallet.accounts[accountAddress].createAdjustFeeRequest({
            tokenAccount: this.tokenAccount.address,
            feeType: this.feeType,
            feeRate: this.feeRateInMinorUnit
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
