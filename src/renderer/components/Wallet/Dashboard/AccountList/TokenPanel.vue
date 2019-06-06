<template>
  <div class="panel scroller">
    <b-form-group
      class="text-left pt-3"
      :label="$t('tokenFilter')"
      :label-sr-only="true"
    >
      <div class="inputWrapper">
        <b-form-input
          id="tokenSearch"
          v-model="tokenName"
          class="tokenSearch"
          :state="nameState"
          :placeholder="$t('searchTokens')"
          trim
        />
      </div>
      <div
        tabindex="-1"
        role="group"
        class="tokenGroup"
      >
        <div
          id="tokenRadios"
          role="radiogroup"
          tabindex="-1"
          class="w-100 btn-group-toggle"
        >
          <label
            class="btn btn-transparent tokenSelector"
            :class="{ active: true }"
          >
            <input
              :id="`tokenRadios_Logos`"
              type="radio"
              name="tokenSelector"
              autocomplete="off"
              value="All"
            >
            <span>
              All
            </span>
          </label>
        </div>
        <div
          id="tokenRadios"
          role="radiogroup"
          tabindex="-1"
          class="w-100 btn-group-toggle"
        >
          <label
            class="btn btn-transparent tokenSelector"
            :class="{ active: false }"
          >
            <input
              :id="`tokenRadios_Logos`"
              type="radio"
              name="tokenSelector"
              autocomplete="off"
              value="Logos"
            >
            <span>
              Logos (LGS)
            </span>
          </label>
        </div>
        <div
          v-for="num in 15"
          :id="`tokenRadios_${num}`"
          :key="num"
          role="radiogroup"
          tabindex="-1"
          class="w-100 btn-group-toggle"
        >
          <label
            class="btn btn-transparent tokenSelector"
            :class="{ active: false }"
          >
            <input
              :id="`tokenRadios_${num}`"
              type="radio"
              name="tokenSelector"
              autocomplete="off"
              :value="`Token_${num}`"
            >
            <span>
              Token ({{ num }})
            </span>
          </label>
        </div>
      </div>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'TokenSelector',
  data () {
    return {
      value: null
    }
  }
}
</script>
<style scoped lang="scss">
.panel {
  height: 100vh;
  position: fixed;
  width: 300px;
  right: 0;
  top: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  background: theme-color("secondary");
  overflow-y: auto;
}
.tokenSelector {
  text-align: left;
  color: $gray-600;
  width: 100%;
}
.tokenSelector:not(.active):hover {
  cursor: pointer;
  background-color: theme-color("tertiary");
  color: $gray-400;
}
.tokenSelector.active {
  color: theme-color("base");
  background-color: theme-color("bg");
}
.tokenSelector > small {
  display: block;
}
.tokenSearch {
  position: fixed;
  top: 1rem;
  width: calc(300px - 2rem);
}
.tokenGroup {
  margin-top: 58px;
  width: calc(300px - 2rem);
}
.inputWrapper {
  height: calc(38px + 2rem);
  position: fixed;
  top: 0px;
  z-index: 2;
  background: theme-color("secondary");
  width: calc(300px - 2rem);
}
</style>
