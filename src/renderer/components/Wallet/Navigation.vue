<template>
  <b-form-group
    class="text-left pt-3"
    :label="$t('walletNavigation')"
    :label-sr-only="true"
  >
    <div tabindex="-1" role="group">
      <div id="navigationRadios" role="radiogroup" tabindex="-1" class="w-100 btn-group-toggle">
        <label class="btn btn-transparent navigationSelector" v-bind:class="{ active: $route.name === 'dashboard' }">
          <input :id="`navigationRadios_wallet`" type="radio" name="navigationSelector" autocomplete="off" value="wallet"/>
          <font-awesome-icon class="icon mr-2" size="sm" :icon="['fal','wallet']" />
          <span v-t="'wallet'"></span>
        </label>
        <label class="btn btn-transparent navigationSelector" v-bind:class="{ active: $route.name === 'governance' }">
          <input :id="`navigationRadios_gov`" type="radio" name="navigationSelector" autocomplete="off" value="governance"/>
          <font-awesome-icon class="icon mr-2" size="sm" :icon="['fal','landmark']" />
          <span v-t="'governance'"></span>
        </label>
        <label class="btn btn-transparent navigationSelector" v-bind:class="{ active: $route.name === 'settings' }">
          <input :id="`navigationRadios_settings`" type="radio" name="navigationSelector" autocomplete="off" value="settings"/>
          <font-awesome-icon class="icon mr-2" size="sm" :icon="['fal','cogs']" />
          <span v-t="'settings'"></span>
        </label>
        <label class="btn btn-transparent navigationSelector">
          <input :id="`navigationRadios_logout`" type="radio" name="navigationSelector" autocomplete="off" value="logout"/>
          <font-awesome-icon class="icon mr-2" size="sm" :icon="['fal','power-off']" />
          <span v-t="'logout'"></span>
        </label>
      </div>
    </div>
  </b-form-group>
</template>

<script>
export default {
  name: 'navigationSelector'
}
</script>

<style scoped lang="scss">
  .navigationSelector {
    text-align: left;
    color: var(--gray-600);
    margin-left: 1rem;
    margin-right: 1rem;
    width: calc(100% - 2rem);
  }
  .navigationSelector:not(.active):hover {
    cursor: pointer;
    background-color: var(--tertiary);
    color: var(--gray-400);
  }
  .navigationSelector.active {
    color: var(--base);
    background-color: var(--bg);
  }
  .navigationSelector > small {
    display: block;
  }
</style>
