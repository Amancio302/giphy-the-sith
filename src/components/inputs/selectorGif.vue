<template>
  <div id="gif-selector">
    <div class="row justify-center">
      <InputGif
        :value="value"
        @input="onInput"
        :height="controllers.gifHeight"
      />
    </div>
    <div class="row justify-center gif" :style="{
      height: `${controllers.gifHeight}px`
    }">
      <transition name="scale-fade" @after-leave="onAfterLeave">
        <ContainerGif
          :id="keepData.id"
          v-show="showGif"
        />
      </transition>
    </div>
  </div>
</template>

<script>

import InputGif from '@/components/inputs/inputGif.vue'

import ContainerGif from '@/components/containers/containerGif.vue'

import { parseGif } from '@/utils/gif'

export default {
  name: 'gif-selector-component',
  components: {
    InputGif,
    ContainerGif
  },
  props: {
    value: {}
  },
  data: () => ({
    controllers: {
      isLoading: false,
      gifHeight: 200
    },
    keepData: {}
  }),
  methods: {
    onInput (val) {
      this.$emit('input', val)
    },
    onAfterLeave () {
      this.keepData = {}
    },
    setLoading (val) {
      this.controllers.isLoading = val
    }
  },
  computed: {
    gif: function () {
      return parseGif(this.value, 'fixed_height')
    },
    showGif: function () {
      return !!this.value
    }
  },
  watch: {
    gif: {
      handler (val) {
        if (val.id) this.keepData = val
      }
    }
  }
}
</script>

<style scoped>
  .gif {
    margin: 64px 0;
  }
</style>