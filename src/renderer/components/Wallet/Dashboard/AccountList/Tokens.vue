<template>
  <multiselect
    v-model="value"
    :options="options"
  />
</template>

<script>
export default {
  name: 'TokenSelector',
  data () {
    return {
      value: null,
      options: ['list', 'of', 'options']
    }
  }
}
</script>
<style scoped lang="scss">
</style>
