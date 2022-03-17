<template>
  <div id="weapon-view">
    <div class="ui grid">
      <div class="row">
        <div class="column stretch">
          <SelectorGif
            v-model="gif"
            @submit="onSuccessClick"
          />
        </div>
      </div>
    </div>
    <div class="ui grid" v-if="!!gif">
      <div class="two column centered row">
        <div class="7 wide column">
          <InputText
            label="título"
            v-model="gif.title"
          />
        </div>
        <div class="7 wide column">
          <InputText
            label="url"
            v-model="gif.url"
          />
        </div>
      </div>
      <div class="row centered">
        <h3 class="text-center star-text my-2">
          guardar no arsenal?
        </h3>
      </div>
      <div class="row centered">
        <div class="ten wide column">
          <div class="two ui buttons">
            <button class="ui red button fluid" :class="{'disabled': !gif}" @click="onErrorClick">
              Não
            </button>
            <button class="ui green button fluid" :class="{'disabled': !gif}" @click="onSuccessClick">
              Sim
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SelectorGif from '@/components/inputs/selectorGif.vue'
import InputText from '@/components/inputs/InputText.vue'

export default {
  name: 'gif-selection-view',
  components: {
    SelectorGif,
    InputText
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
      if (res !== true) {
        this.$store.commit('sendMessage', { text: 'esse gif já está no arsenal patrulheiro!', duration: 2500, type: 'error' })
      }
    },
    onErrorClick () {
      this.gif = null
    }
  }
}
</script>

<style scoped>
  #weapon-view {
    height: 100%;
  }
</style>