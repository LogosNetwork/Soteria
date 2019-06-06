<template>
  <div class="export">
    <h4
      v-t="'importseed'"
      class="mt-3"
    />
    <div>
      <small v-t="'importMethods'" />
    </div>
    <div class="row mt-3 justify-content-center align-items-center">
      <div class="panel table text-base">
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <font-awesome-icon
                size="3x"
                class="icon"
                :icon="['fal','pencil']"
              />
            </div>
            <div class="card-body">
              <h5
                v-t="'insertPlainSeed'"
                class="card-title"
              />
              <b-button
                v-t="'continue'"
                class="btn mt-3 btn-lg"
                variant="primary"
                @click="plainSeed()"
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
                :icon="['fal','lock-alt']"
              />
            </div>
            <div class="card-body">
              <h5
                v-t="'seedvault'"
                class="card-title"
              />
              <b-button
                v-t="'continue'"
                class="btn mt-3 btn-lg"
                variant="primary"
                @click="uploadVault()"
              />
            </div>
          </div>
        </div>
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <span style="font-size:2.2em">Abc</span>
            </div>
            <div class="card-body">
              <h5
                v-t="'importMnemonic'"
                class="card-title"
              />
              <b-button
                v-t="'continue'"
                class="btn mt-3 btn-lg"
                variant="primary"
                @click="mnemonic()"
              />
            </div>
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
export default {
  name: 'ImportSeed',
  methods: {
    plainSeed () {
      this.$router.push({ name: 'insertSeed' })
    },
    mnemonic () {
      this.$router.push({ name: 'insertMnemonic' })
    },
    uploadVault () {
      this.$router.push({ name: 'insertVault' })
    },
    previous () {
      this.$router.go(-1)
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
    z-index: 10;
  }
  .export {
    width: 100%;
    max-width: 100vw
  }
  .icon {
    color: var(--base);
    max-width: 50%;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    background: var(--bg);
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
    border-right: 1px solid #e1f1ff;
    flex-basis: 100%;
    padding: 25px 50px;
  }

  .plan:last-child {
    border-right: none;
  }

  .header {
    color: #888;
    font-weight: 600;
    letter-spacing: 1px;
  }
</style>
