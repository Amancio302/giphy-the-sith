<template>
  <div class="row justify-center">
    <div class="col cols-8 gif-selection">
      <SelectorGif
        v-model="gif"
      />
      <h3 class="row justify-center selection-text">
        Send the arsenal?
      </h3>
    </div>
  </div>
</template>

<script>

import SelectorGif from '@/components/inputs/selectorGif.vue'

export default {
  name: 'gif-selection-view',
  components: {
    SelectorGif
  },
  data: () => ({
    gif: null
  })
}
</script>

<style scoped>
  .gif-selection {
    margin-top: 25vh;
  }
  .selection-text {
    color: #FFE81F;
    font-family: StarJedi;
  }
</style>