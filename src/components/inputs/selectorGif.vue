<template>
  <div id="gif-selector">
    <div class="row justify-center">
      <InputGif
        :value="value"
        @input="onInput"
        :height="controllers.gifHeight"
      />
    </div>
    <div class="row justify-center gif">
      <ContainerGif
        :src="gif.src"
        :height="`${controllers.gifHeight}px`"
        :width="gif.width"
      />
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
    }
  }),
  methods: {
    onInput (val) {
      this.$emit('input', val)
    },
    setLoading (val) {
      this.controllers.isLoading = val
    }
  },
  computed: {
    gif: function () {
      return parseGif(this.value, 'fixed_height')
    }
  }
}
</script>

<style scoped>
  .gif {
    margin: 64px 0;
  }
</style>