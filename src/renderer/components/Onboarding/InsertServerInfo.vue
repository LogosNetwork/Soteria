<template>
  <div class="mh-100 w-100">
    <b-container>
      <h4
        v-t="'localNodeInformation'"
        class="mt-3"
      />
      <small v-t="'localNodeHelp'" />
      <div class="form-group text-left">
        <form
          id="localNodeSetup"
          @submit.stop.prevent="connectToLocalNode()"
        >
          <div class="card bg-secondary formContents mt-3 mx-auto">
            <div class="card-body">
              <label
                v-t="'nodeURL'"
                for="nodeURL"
                class="text-base"
              />
              <div class="input-group input-group-lg">
                <b-input
                  id="nodeURL"
                  v-model="nodeURL"
                  :state="validURL"
                  placeholder="54.91.230.200"
                />
              </div>
              <label
                v-t="'nodePort'"
                for="nodePort"
                class="text-base mt-3"
              />
              <div class="input-group input-group-lg">
                <b-input
                  id="nodePort"
                  v-model="nodePort"
                  placeholder="Logos rpc port (default is 55000)"
                />
              </div>
              <label
                v-t="'wsPort'"
                for="wsPort"
                class="text-base mt-3"
              />
              <div class="input-group input-group-lg">
                <b-input
                  id="wsPort"
                  v-model="wsPort"
                  placeholder="Logos ws port (default is 18000)"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </b-container>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group
          class="w-100"
          size="lg"
        >
          <b-button
            v-t="'previous'"
            class="w-50"
            variant="secondary"
            @click="previous()"
          />
          <b-button
            v-t="'connect'"
            :disabled="!validURL"
            class="w-50"
            variant="primary"
            @click="connectToLocalNode()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const urlRegex = /^(?!http|https|https:\/\/|http:\/\/)((?:[?a-zA-Z0-9-.+]{2,256}\.[a-z]{2,4})|(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}))$/

export default {
  name: 'InsertServerInfo',
  data () {
    return {
      nodeURL: '54.91.230.200',
      nodePort: '55000',
      wsPort: '18000'
    }
  },
  computed: {
    ...mapState('Onboarding', {
      nodeOptions: state => state.nodeOptions
    }),
    validURL () {
      if (this.nodeURL === '') return null
      return urlRegex.test(this.nodeURL)
    }
  },
  mounted () {
    if (this.nodeOptions) {
      if (this.nodeOptions.nodeURL) {
        this.nodeURL = this.nodeOptions.nodeURL
      }
      if (this.nodeOptions.nodePort) {
        this.nodePort = this.nodeOptions.nodePort
      }
      if (this.nodeOptions.wsPort) {
        this.wsPort = this.nodeOptions.wsPort
      }
    }
  },
  methods: {
    ...mapActions('Onboarding', [
      'setNodeOptions'
    ]),
    previous () {
      this.$router.go(-1)
    },
    connectToLocalNode () {
      this.setNodeOptions({
        nodeURL: this.nodeURL,
        nodePort: this.nodePort,
        wsPort: this.wsPort
      })
      this.$router.push({ path: '/onboarding/seed' })
    }
  }
}
</script>

<style scoped lang="scss">
  .validation {
    width: 100vw;
  }
  input {
    border: 1px solid rgba($black, .125);
  }
  ul {
    list-style: none;
  }
  li {
    margin-bottom: 1rem;
  }
  .mh-100 {
    max-height: 100%;
  }
  .formContents {
    max-width:450px;
    width:100vw;
  }
</style>
