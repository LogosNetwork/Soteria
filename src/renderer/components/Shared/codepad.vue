<template>
  <prism-editor
    v-model="localInput"
    class="prismEditor"
    :class="{ thin: thin }"
    :line-numbers="!thin"
    :readonly="readOnly"
    language="json"
  />
</template>

<script>
import PrismEditor from 'vue-prism-editor'
import 'prismjs'
import 'prismjs/themes/prism-coy.css'
import 'prismjs/components/prism-json.js'
import 'vue-prism-editor/dist/VuePrismEditor.css'

export default {
  name: 'Codepad',
  components: {
    PrismEditor
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    thin: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      localInput: '',
      initialInput: ''
    }
  },
  created () {
    if (this.code) {
      this.localInput = this.code
    }
  }
}
</script>
<style lang="scss">
.prismEditor {
  height: auto;
}
.prismEditor:not(.thin) {
  border: 1px solid #ddd
}
.prismEditor.thin > pre > code {
  background-image: none;
}
.prismEditor > pre > code {
  max-height: inherit;
  height: inherit;
  padding: 0 0.5em;
  display: block;
  overflow: auto;

  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: #FFF;
}
</style>
