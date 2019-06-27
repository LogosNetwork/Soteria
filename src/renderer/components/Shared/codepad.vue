<template>
  <prism-editor
    v-model="localInput"
    class="prismEditor"
    :class="{ thin: thin, forge: forge }"
    :line-numbers="!thin"
    :readonly="readOnly"
    language="json"
    @change="codeChange"
  />
</template>

<script>
import PrismEditor from 'vue-prism-editor'
import { mapState, mapActions } from 'vuex'
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
    },
    forge: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localInput: '',
      initialInput: ''
    }
  },
  computed: {
    ...mapState('forge', {
      issuerInfo: state => state.issuerInfo
    })
  },
  watch: {
    issuerInfo: function (newInfo, oldInfo) {
      if (this.forge && this.initalInput !== newInfo) {
        this.localInput = newInfo
      }
    },
    code: function (newCode, oldCode) {
      if (!this.forge) {
        this.localInput = newCode
      }
    }
  },
  created () {
    if (this.forge) {
      this.initalInput = this.issuerInfo
      this.localInput = this.issuerInfo
      this.setTempInfo(this.issuerInfo)
    } else if (this.code) {
      this.localInput = this.code
    }
  },
  methods: {
    ...mapActions('forge',
      [
        'setTempInfo'
      ]
    ),
    codeChange (newInfo) {
      if (this.forge) this.setTempInfo(newInfo)
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
.prismEditor.forge {
  min-height: 125px;
}
.prismEditor.forge > pre > code {
  min-height: 123px;
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
