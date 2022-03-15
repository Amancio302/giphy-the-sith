<template>
  <div id="toast" class="overlay my-toast">
    <transition name="fade">
      <div class="star-text justify-center" v-show="showToast">
        <transition-group name="slide-up" @leave="onLeave">
          <div
            v-for="gif in reversedQueue"
            :key="gif.id"
          >
            <ContainerGif
              v-bind="parse(gif)"
              :height="75"
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
    },
    parse (gif) {
      const index = this.queue.map(el => el.id).indexOf(gif.id)
      return this.queue[index]
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
    showToast: function () {
      return this.queue.length > 0
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
    margin-top: 8px;
  }
</style>
