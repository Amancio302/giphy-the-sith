<template>
  <div id="toast" class="toast">
    <transition name="fade">
      <div class="star-text justify-center" v-show="showToast">
        <transition-group name="slide-up" @leave="onLeave">
          <div
            v-for="gif in reversedQueue"
            :key="gif.id"
          >
            <ContainerGif
              v-bind="parsedQueue[gif.id]"
              :width="100"
              class="toast-gif"
            />
          </div>
        </transition-group>
        Added Gif!
      </div>
    </transition>
  </div>
</template>

<script>

import ContainerGif from '@/components/containers/containerGif.vue'

export default {
  name: 'GTS-toast',
  components: {
    ContainerGif
  },
  data: () => ({
    queue: []
  }),
  methods: {
    onLeave () {
      this.queue.splice(0, 1)
    }
  },
  watch: {
    lastGif: function (val) {
      if (val) {
        this.queue.push({ ...val, active: true })
        setTimeout(() => {
          this.queue[0].active = false
        }, 5000)
      }
    },
  },
  computed: {
    lastGif: function () {
      return this.$store.getters.lastGif
    },
    reversedQueue: function () {
      return Array.from(this.queue.filter(el => el.active)).reverse()
    },
    parsedQueue: function () {
      const res = {}
      this.queue.map(el => {
        res[el.id] = el
      })
      return res
    },
    showToast: function () {
      return this.queue.length > 0
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

<style scoped>
  .my-toast {
    margin: 16px;
    bottom: 0;
    right: 0;
    overflow: hidden;
    z-index: 99;
  }
  .toast-gif {
    /* margin-top: 8px; */
  }
  .toast {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 99;
    overflow: hidden;
  }
</style>
