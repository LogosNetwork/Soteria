<template>
  <b-container class="text-left">
    <div class="d-flex justify-content-between">
      <div class="text-left align-self-center">
        <h4
          v-t="'tokens'"
          class="mb-0"
        />
      </div>
      <div class="align-self-center">
        <b-button
          v-b-modal.createToken
          variant="outline-primary"
          class="text-white"
          size="sm"
        >
          <font-awesome-icon
            class="mr-1"
            :icon="['fal','plus']"
          />
          <span v-t="'createToken'" />
        </b-button>
        <b-modal
          id="createToken"
          body-class="pb-0"
          size="full"
          no-fade
          hide-footer
          hide-header
        >
          Create a token here!
        </b-modal>
      </div>
    </div>
  </b-container>
</template>

<script>

export default {
  name: 'Tokens'
}
</script>

<style scoped lang="scss">
</style>
