<template>
  <div class="tokenPanel">
    <b-form-group
      class="text-left searchWrapper pt-3 pl-3"
    >
      <div class="d-flex justify-content-between">
        <div class="align-self-end">
          <label
            v-t="'filterByCurrency'"
            for="tokenSearch"
          />
        </div>
        <div class="align-self-start">
          <b-button
            variant="outline-link"
            class="text-base"
            @click="$bvModal.hide('tokenFilterModal')"
          >
            <font-awesome-icon
              :title="$t('closeTheTokenFilter')"
              size="lg"
              :icon="['fal','times']"
            />
          </b-button>
        </div>
      </div>
      <b-form-input
        id="tokenSearch"
        v-model="tokenName"
        :placeholder="$t('searchTokens')"
        trim
      />
    </b-form-group>
    <div class="filterButtonWrapper">
      <FilterButton />
      <FilterButton :token="'logos'" />
      <FilterButton
        v-for="num in 15"
        :key="num"
        :token="`fakeToken_${num}`"
      />
    </div>
  </div>
</template>

<script>
import FilterButton from '@/components/Wallet/Dashboard/AccountList/TokenFilter/TokenPanel/FilterButton.vue'

export default {
  name: 'TokenSelector',
  components: {
    FilterButton
  },
  data () {
    return {
      tokenName: null
    }
  }
}
</script>
<style scoped lang="scss">
.tokenPanel {
  width: 266px;
}
.searchWrapper {
  position: fixed;
  top: 0;
  z-index: 2;
  background: theme-color("secondary");
  width: 282px;
  left: -298px;
}
.filterButtonWrapper {
  margin-top: calc(76px + 0.5rem);
}
</style>
