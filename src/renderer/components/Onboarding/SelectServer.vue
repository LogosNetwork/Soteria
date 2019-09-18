<template>
  <div class="selectServer">
    <h4
      v-t="'selectServer'"
      class="mt-3"
    />
    <div>
      <small v-t="'severInfo'" />
    </div>
    <div class="row mt-3 justify-content-center align-items-center">
      <div class="panel table text-base">
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <font-awesome-icon
                size="3x"
                class="icon"
                :icon="['fal','lambda']"
              />
            </div>
            <div class="card-body">
              <h5
                v-t="'officialLogosNode'"
                class="card-title"
              />
              <b-button
                v-t="'connectLogosNode'"
                class="mt-3"
                size="lg"
                variant="primary"
                @click="connectLogosNode()"
              />
            </div>
          </div>
        </div>
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <font-awesome-icon
                size="3x"
                class="icon"
                :icon="['fal','server']"
              />
            </div>
            <div class="card-body">
              <h5
                v-t="'remoteLocalNode'"
                class="card-title"
              />
              <b-button
                v-t="'connectLocalNode'"
                class="mt-3"
                size="lg"
                variant="primary"
                @click="connectToNode()"
              />
            </div>
          </div>
          <div>
            <b-button
              variant="link"
              href="https://pla.bs/install-guide"
              target="_blank"
              class="text-white"
              @click="openPage($event)"
            >
              How to setup a local node
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group
          class="w-100"
          size="lg"
        >
          <b-button
            v-t="'previous'"
            class="w-100"
            variant="secondary"
            @click="previous()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SelectServer',
  computed: {
    ...mapState('System', {
      operatingSystem: state => state.operatingSystem,
      hasDocker: state => state.hasDocker
    })
  },
  methods: {
    previous () {
      this.$router.go(-1)
    },
    connectLogosNode () {
      this.$router.push({ path: '/onboarding/seed' })
    },
    connectToNode () {
      this.$router.push({ path: '/onboarding/insertServerInfo' })
    },
    openPage (event) {
      if (global && global.shell) {
        event.preventDefault()
        event.stopPropagation()
        global.shell.openExternal('https://pla.bs/install-guide')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  .panel {
    border-radius: 10px;
    padding: 1rem 2rem;
    position: relative;
    width: 100%;
    z-index: 2;
  }
  .selectServer {
    width: 100%;
    max-width: 100vw
  }
  .icon {
    color: theme-color("base");
    max-width: 50%;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    background: theme-color("bg");
    border-radius: 50%;
    margin: auto;
    margin-bottom: 25px;
    max-width: 100%;
  }

  .table {
    display: flex;
    flex-direction: row;
  }

  .plan {
    border-bottom: none;
    border-right: 1px solid theme-color("base");
    flex-basis: 100%;
    padding: 25px 50px;
  }

  .plan:last-child {
    border-right: none;
  }
</style>
