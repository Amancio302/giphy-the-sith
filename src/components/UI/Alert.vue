<template>
  <div id="alert" class="alert-container star-text">
    <transition-group name="scale-fade" @leave="onLeave">
      <div
        v-for="message in messages"
        :key="message.id"
        class="card text-right alert-card py-2 px-3 baa-3 mt-3 me-3"
        :class="parsedQueue[message.id].classes"
        ref="alert"
      >
        <div class="alert-message">
          {{ parsedQueue[message.id].text }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'GTS-alert-component',
  data: () => ({
    queue: []
  }),
  methods: {
    onLeave () {
      this.queue.splice(0, 1)
    },
    parseClass (type) {
      const classes = {}
      classes[type] = true
      classes[`${type}-text`] = true
      return classes
    }
  },
  watch: {
    lastMessage: {
      handler (val) {
        if (val) {
          this.queue.push({ ...val, active: true })
          setTimeout(() => {
            this.queue[0].active = false
          }, val.duration)
        }
      }
    }
  },
  computed: {
    lastMessage: function () {
      return this.$store.getters.lastMessage
    },
    messages: function () {
      return this.queue.filter(el => el.active)
    },
    parsedQueue: function () {
      const res = {}
      this.queue.map(el => {
        el.classes = this.parseClass(el.type)
        res[el.id] = el
      })
      return res
    }
  },
  beforeDestroy () {
    let id = window.setTimeout(function() {}, 0)
    while (id--) {
      window.clearTimeout(id)
    }
  }

}
</script>

<style lang="less" scoped>
  
</style>