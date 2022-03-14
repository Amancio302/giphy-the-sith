<template>
  <div id="weapon-view">
    <div class="row">
      <div class="col">
        <SelectorGif
          v-model="gif"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3 class="text-center star-text my-2">
          Adicionar ao arsenal?
        </h3>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col cols-4">
        <sui-button :disabled="!gif" color="red" @click="onErrorClick">
          Não
        </sui-button>
      </div>
      <div class="col cols-4">
        <sui-button :disabled="!gif" color="green" @click="onSuccessClick">
          Sim
        </sui-button>
      </div>
    </div>
    <transition name="scale-fade">
      <div v-show="controllers.showOverlay" class="overlay star-text already-added">
        Esse gif já adicionado ao arsenal patrulheiro!
      </div>
    </transition>
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
    gif: null,
    controllers: {
      showOverlay: false
    }
  }),
  methods: {
    async onSuccessClick () {
      const res = await this.$store.dispatch('addGif', this.gif)
      console.log(res)
      if (!res) {
        this.controllers.showOverlay = true
        setTimeout(() => {
          this.controllers.showOverlay = false
        }, 3000)
      }
    },
    onErrorClick () {
      this.gif = null
    }
  }
}
</script>

<style scoped>
  .already-added {
    bottom: 0;
    margin-bottom: 16px;
  }
</style>