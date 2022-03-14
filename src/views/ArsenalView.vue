<template>
  <div class="row justify-center">
    <div class="col cols-8 gif-selection">
      <GridGif
        :gifs="gifs"
      />
      <h3 class="row justify-center selection-text">
        Send the arsenal?
      </h3>
    </div>
  </div>
</template>

<script>

import GridGif from '@/components/containers/gridGif.vue'

export default {
  name: 'gif-selection-view',
  components: {
    GridGif
  },
  data: () => ({
    gif: null
  }),
  computed: {
    gifs: function () {
      return Array.from(this.$store.getters.gifs)
    }
  }
}
</script>

<style scoped>
  .gif-selection {
    /* margin-top: 25vh; */
  }
  .selection-text {
    color: #FFE81F;
    font-family: StarJedi;
  }
</style>