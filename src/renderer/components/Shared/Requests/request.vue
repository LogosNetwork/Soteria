<template>
  <div
    class="shadow-sm"
    :class="{ 'mb-3': !lastItem }"
  >
    <send
      v-if="request.type === 'send'"
      :request-info="request"
      :account="account"
      :small="small"
    />
    <burn
      v-if="request.type === 'burn'"
      :request-info="request"
      :small="small"
    />
    <issuerInfo
      v-if="request.type === 'update_issuer_info'"
      :request-info="request"
      :small="small"
    />
    <tokenSend
      v-if="request.type === 'token_send'"
      :request-info="request"
      :account="account"
      :small="small"
    />
    <distribute
      v-if="request.type === 'distribute'"
      :request-info="request"
      :small="small"
    />
    <adjustFee
      v-if="request.type === 'adjust_fee'"
      :request-info="request"
      :small="small"
    />
    <changeSetting
      v-if="request.type === 'change_setting'"
      :request-info="request"
      :small="small"
    />
    <adjustUserStatus
      v-if="request.type === 'adjust_user_status'"
      :request-info="request"
      :small="small"
    />
    <issuance
      v-if="request.type === 'issuance'"
      :request-info="request"
      :small="small"
    />
    <issueAdditional
      v-if="request.type === 'issue_additional'"
      :request-info="request"
      :small="small"
    />
    <withdrawFee
      v-if="request.type === 'withdraw_fee'"
      :request-info="request"
      :small="small"
    />
    <withdrawLogos
      v-if="request.type === 'withdraw_logos'"
      :request-info="request"
      :small="small"
    />
    <updateController
      v-if="request.type === 'update_controller'"
      :request-info="request"
      :small="small"
    />
    <revoke
      v-if="request.type === 'revoke'"
      :request-info="request"
      :small="small"
    />
    <immuteSetting
      v-if="request.type === 'immute_setting'"
      :request-info="request"
      :small="small"
    />
  </div>
</template>

<script>
import Logos from '@logosnetwork/logos-rpc-client'

export default {
  name: 'Request',
  components: {
    'send': () => import(/* webpackChunkName: "sendCard" */'@/components/Shared/Requests/RequestCards/send.vue'),
    'burn': () => import(/* webpackChunkName: "burnCard" */'@/components/Shared/Requests/RequestCards/burn.vue'),
    'issuerInfo': () => import(/* webpackChunkName: "issuerInfoCard" */'@/components/Shared/Requests/RequestCards/issuerInfo.vue'),
    'distribute': () => import(/* webpackChunkName: "distributeCard" */'@/components/Shared/Requests/RequestCards/distribute.vue'),
    'adjustFee': () => import(/* webpackChunkName: "adjustFeeCard" */'@/components/Shared/Requests/RequestCards/adjustFee.vue'),
    'changeSetting': () => import(/* webpackChunkName: "changeSettingCard" */'@/components/Shared/Requests/RequestCards/changeSetting.vue'),
    'adjustUserStatus': () => import(/* webpackChunkName: "adjustUserStatusCard" */'@/components/Shared/Requests/RequestCards/adjustUserStatus.vue'),
    'issuance': () => import(/* webpackChunkName: "issuanceCard" */'@/components/Shared/Requests/RequestCards/issuance.vue'),
    'issueAdditional': () => import(/* webpackChunkName: "issueAdditionalCard" */'@/components/Shared/Requests/RequestCards/issueAdditional.vue'),
    'withdrawFee': () => import(/* webpackChunkName: "withdrawFeeCard" */'@/components/Shared/Requests/RequestCards/withdrawFee.vue'),
    'withdrawLogos': () => import(/* webpackChunkName: "withdrawLogosCard" */'@/components/Shared/Requests/RequestCards/withdrawLogos.vue'),
    'updateController': () => import(/* webpackChunkName: "updateControllerCard" */'@/components/Shared/Requests/RequestCards/updateController.vue'),
    'revoke': () => import(/* webpackChunkName: "revokeCard" */'@/components/Shared/Requests/RequestCards/revoke.vue'),
    'immuteSetting': () => import(/* webpackChunkName: "immuteSettingCard" */'@/components/Shared/Requests/RequestCards/immuteSetting.vue'),
    'tokenSend': () => import(/* webpackChunkName: "tokenSendCard" */'@/components/Shared/Requests/RequestCards/tokenSend.vue')
  },
  props: {
    requestInfo: {
      type: Object,
      default: null
    },
    account: {
      type: String,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    },
    lastItem: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    request () {
      if (this.requestInfo.constructor.name !== 'Object') {
        let request = JSON.parse(this.requestInfo.toJSON())
        if (this.requestInfo.view) request.view = this.requestInfo.view
        if (request.token_id) {
          let tokenAddress = this.$Utils.accountFromHexKey(request.token_id)
          let tokenAccount = this.$Wallet.tokenAccounts[tokenAddress]
          request.tokenInfo = {
            name: tokenAccount.name,
            symbol: tokenAccount.symbol,
            tokenAccount: tokenAddress
          }
          try {
            request.tokenInfo.issuerInfo = JSON.parse(tokenAccount.issuerInfo)
          } catch (e) {
            request.tokenInfo.issuerInfo = null
          }
          if (this.requestInfo.constructor.name === 'Issuance') {
            try {
              request.prettyInfo = JSON.stringify(JSON.parse(request.issuer_info), null, 2)
            } catch (e) {
              request.prettyInfo = request.issuer_info
            }
          } else if (this.requestInfo.constructor.name === 'UpdateIssuerInfo') {
            try {
              request.prettyInfo = JSON.stringify(JSON.parse(request.new_info), null, 2)
            } catch (e) {
              request.prettyInfo = request.issuer_info
            }
          } else if (this.requestInfo.constructor.name === 'WithdrawLogos') {
            request.transaction.amountInLogos = Logos.convert.fromReason(request.transaction.amount, 'LOGOS')
          } else if (request.transaction) {
            if (request.tokenInfo.issuerInfo &&
              typeof request.tokenInfo.issuerInfo.decimals !== 'undefined' &&
              request.tokenInfo.issuerInfo.decimals > 0) {
              request.transaction.amountInToken = Logos.convert.fromTo(request.transaction.amount, 0, request.tokenInfo.issuerInfo.decimals)
            }
          } else if (request.transactions) {
            request.totalAmount = this.requestInfo.totalAmount
            if (request.tokenInfo.issuerInfo &&
              typeof request.tokenInfo.issuerInfo.decimals !== 'undefined' &&
              request.tokenInfo.issuerInfo.decimals > 0) {
              request.totalAmountInToken = Logos.convert.fromTo(request.totalAmount, 0, request.tokenInfo.issuerInfo.decimals)
              for (let transaction of request.transactions) {
                transaction.amountInToken = Logos.convert.fromTo(transaction.amount, 0, request.tokenInfo.issuerInfo.decimals)
              }
            }
          }
        } else if (request.transactions) {
          request.totalAmountLogos = Logos.convert.fromReason(this.requestInfo.totalAmount, 'LOGOS')
          for (let transaction of request.transactions) {
            transaction.amountInLogos = Logos.convert.fromReason(transaction.amount, 'LOGOS')
          }
        }
        return request
      } else {
        return this.requestInfo
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .cardLink {
    color:#525f7f;
  }
  .cardLink:hover {
    text-decoration: none;
  }
  .list-group-item {
    background-color: inherit;
  }
  .cardLink > .card {
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    border: 0px;
  }
  .cardLink:hover > .card {
    box-shadow: 0 10px 30px -5px rgba(10,16,34,.2);
  }
</style>
