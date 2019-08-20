<template>
  <div>
    <b-container
      class="text-left"
      fluid
    >
      <div>
        <h1 class="text-center">
          Hello Mom!
        </h1>
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
            class="w-100"
            variant="primary"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'ControllerModal'
}
</script>

<style scoped lang="scss">
</style>
