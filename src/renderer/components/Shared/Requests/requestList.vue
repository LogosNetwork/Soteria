<template>
  <virtual-list
    v-if="requests && requests.length > 0"
    ref="vlist"
    :size="82"
    :remain="remains"
    :item="request"
    :itemcount="requests.length"
    :itemprops="getItemProps"
    :variable="getItemHeight"
  />
  <small
    v-else
    v-t="'notOpened'"
    class="text-center text-muted"
  />
</template>
<script>
import Request from '@/components/Shared/Requests/request.vue'
import virtualList from 'vue-virtual-scroll-list'
export default {
  name: 'RequestList',
  components: { 'virtual-list': virtualList },
  props: {
    requests: {
      type: Array,
      default: null
    },
    address: {
      type: String,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      request: Request,
      remains: this.updateRemains()
    }
  },
  watch: {
    requests: function (newRequests, oldRequests) {
      if (newRequests.length !== oldRequests.length && this.$refs.vlist) {
        this.$refs.vlist.forceRender()
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateRemains)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateRemains)
  },
  methods: {
    updateRemains () {
      this.remains = Math.ceil((Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 171) / 82)
      return this.remains
    },
    getItemProps (itemIndex) {
      if (!this.requests[itemIndex].view && this.address) {
        this.requests[itemIndex].view = this.address
      }
      let data = {
        key: `${this.requests[itemIndex].hash}_${this.address}`,
        props: {
          requestInfo: this.requests[itemIndex],
          address: this.address,
          small: this.small
        }
      }
      if (this.address) {
        data.key = `${data.key}_${this.address}`
      } else if (this.requests[itemIndex].view) {
        data.key = `${data.key}_${this.requests[itemIndex].view}`
      }
      return data
    },
    getItemHeight (itemIndex) {
      return 82
    }
  }
}
</script>
