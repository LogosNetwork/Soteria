<template>
  <h3
    ref="editable"
    contenteditable
    class="d-inline-block"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners () {
      return { ...this.$listeners, input: this.onInput }
    }
  },
  mounted () {
    this.$refs.editable.innerText = this.value
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.innerText)
    }
  }
}
</script>
