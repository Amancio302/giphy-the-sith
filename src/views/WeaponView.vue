<template>
  <div class="row justify-center">
    <div class="col cols-8 gif-selection">
      <div class="row">
        <div class="col">
          <SelectorGif
            v-model="gif"
          />
        </div>
      </div>
      <div class="row" v-if="!!gif">
        <div class="col">
          <h3 class="text-center selection-text">
            Can it make him laught?
          </h3>
        </div>
      </div>
      <div class="row justify-center" v-if="!!gif">
        <div class="col cols-4">
          <sui-button color="red">
            Não
          </sui-button>
        </div>
        <div class="col cols-4">
          <sui-button color="green" @click="onSuccessClick">
            Sim
          </sui-button>
        </div>
      </div>
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
  }),
  methods: {
    onSuccessClick () {
      this.$store.commit('addGif', this.gif)
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