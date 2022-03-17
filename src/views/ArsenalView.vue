<template>
  <div id="arsenal-view">
    <div class="ui grid" v-if="gifs.length > 0">
      <div class="centered row">
        <div class="column">
          <GridGif
            :gifs="gifs"
            @click="onGifClick"
          />
        </div>
      </div>
      <div class="centered row">
        <div class="column">
          <h3 class="text-center star-text my-2">
            o que deseja fazer com o arsenal?
          </h3>
        </div>
      </div>
      <div class="centered row">
        <div class="ten wide column">
          <div class="two ui buttons">
            <button class="ui button red" :class="{'disabled': gifs.length < 1}" @click="onErrorClick">
              Limpar
            </button>
            <button class="ui button green" :class="{'disabled': gifs.length < 1}" @click="onSuccessClick">
              Atacar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="ui grid" v-else>
      <div class="centered row">
        <div class="10 wide column">
          <div class="star-text text-center">
            nada ainda patrulheiro!
          </div>
        </div>
      </div>
    </div>
    <transition name="scale">
      <UpdateGif
        :show="controllers.showOverlay"
        :data="controllers.clickedGif"
        @close="onCloseClick"
        @delete="onDeleteClick"
        @submit="onSubmitClick"
      />
    </transition>
  </div>
</template>

<script>

import GridGif from '@/components/containers/gridGif.vue'

import UpdateGif from '@/components/modals/UpdateGifModal.vue'

export default {
  name: 'gif-selection-view',
  components: {
    GridGif,
    UpdateGif
  },
  data: () => ({
    controllers: {
      showOverlay: false,
      clickedId: undefined,
      clickedGif: undefined,
      action: undefined,
    }
  }),
  computed: {
    gifs: function () {
      return Array.from(this.$store.getters.gifs)
    }
  },
  methods: {
    async onErrorClick () {
      await this.$store.dispatch('clearGifs')
      this.$store.commit('sendMessage', { text: 'arsenal completamente limpo patrulheiro!', duration: 2500, type: 'warning' })
    },
    async onSuccessClick () {
      await this.$store.dispatch('sendGifs')
      this.$store.commit('sendMessage', { text: 'ataque enviado com sucesso patrulheiro!', duration: 3000, type: 'success' })
    },
    onGifClick (id) {
      this.controllers.clickedId = id
      this.controllers.clickedGif = this.gifs.filter(el => el.id === id)[0]
      this.controllers.showOverlay = true
    },
    onCloseClick () {
      this.controllers.clickedId = undefined
      this.controllers.clickedGif = undefined
      this.controllers.showOverlay = false
    },
    async onDeleteClick () {
      const res = await this.$store.dispatch('deleteGif', this.controllers.clickedId)
      if (res) {
        // GIF DELETED
      } else {
        // DELETE ERROR
      }
      this.onCloseClick()
    },
    async onSubmitClick (val) {
      const res = await this.$store.dispatch('updateGif', val)
      if (res) {
        // GIFS SUBMITED
      } else {
        // SUBMIT ERROR
      }
      this.onCloseClick()
    }
  }
}
</script>

<style scoped>
  
</style>