<template>
  <div id="toast" class="overlay toast">
    <transition name="fade">
      <div class="star-text justify-center" v-show="showToast">
        <transition-group name="slide-up" @leave="onLeave">
          <div
            v-for="gif in reversedQueue"
            :key="gif.id"
          >
            <ContainerGif
              v-bind="parse(gif)"
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

import { parseGif } from '@/utils/gif'

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
      console.log('aqui')
      this.queue.splice(0, 1)
    },
    parse (gif) {
      const index = this.queue.map(el => el.id).indexOf(gif.id)
      console.log(index)
      return this.queue[index]
    }
  },
  watch: {
    lastGif: function (val) {
      console.log(val)
      if (val) {
        this.queue.push({ ...val, active: true })
        setTimeout(() => {
          this.queue[0].active = false
          console.log(val.id, this.queue[0].id)
        }, 5000)
      }
    },
  },
  computed: {
    lastGif: function () {
      return parseGif(this.$store.getters.lastGif, 'fixed_width_small')
    },
    reversedQueue: function () {
      console.log('re-reversing')
      return Array.from(this.queue.filter(el => el.active)).reverse()
    },
    showToast: function () {
      return this.queue.length > 0
    }
  }
}
</script>

<style scoped>
  .toast {
    margin: 16px;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
  .toast-gif {
    margin-top: 8px;
  }
</style>
