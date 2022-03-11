<template>
  <div id="gif-selector">
    <div class="row justify-center">
      <InputGif
        :value="value"
        @input="onInput"
      />
    </div>
    <div class="row justify-center gif">
      <ContainerGif
        :src="src"
      />
    </div>
  </div>
</template>

<script>

import InputGif from '@/components/inputs/inputGif.vue'

import ContainerGif from '@/components/containers/containerGif.vue'

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
      isLoading: false
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
  watch: {
    src: function () {
      this.setLoading(true)
    }
  },
  computed: {
    src: function () {
      if (this.value == null) return ''
      return this.value.images.fixed_height.url
    }
  }
}
</script>

<style scoped>
  .gif {
    margin-top: 100px;
  }
</style>