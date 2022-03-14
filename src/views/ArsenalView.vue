<template>
  <!-- Full Arsenal -->
  <div id="arsenal-view">
    <!-- Grid Row -->
    <div class="row">
      <div class="col">
        <GridGif
          :gifs="gifs"
          @click="onGifClick"
        />
      </div>
    </div>
    <!-- Text Row -->
    <div class="row">
      <div class="col">
        <h3 class="text-center star-text my-2">
          o que deseja fazer com o arsenal?
        </h3>
      </div>
    </div>
    <!-- Actions Row -->
    <div class="row justify-center">
      <div class="col cols-4">
        <sui-button :disabled="gifs.length <= 0" color="red" @click="onErrorClick">
          Limpar
        </sui-button>
      </div>
      <div class="col cols-4">
        <sui-button :disabled="gifs.length <= 0" color="green" @click="onSuccessClick">
          Enviar
        </sui-button>
      </div>
    </div>
    <!-- Modal -->
    <transition name="fade">
      <div class="overlay arsenal-overlay" v-if="controllers.showOverlay">
        <div class="row fill-height justify-center align-center">
          <div class="col cols-auto">
            <!-- Card -->
            <div class="card overlay-card">
              <!-- Text -->
              <div class="row text-center alignt-center">
                <div class="col cols-1">
                </div>
                <div class="col">
                  <h3 class="star-text my-2">
                    o que deseja fazer com o gif?
                  </h3>
                </div>
                <!-- Close Icon -->
                <div class="col cols-1">
                  <sui-icon
                    name="close icon"
                    inverted
                    color="yellow"
                    size="big"
                    class="clickable"
                    @click="onCloseClick"
                  />
                </div>
              </div>
              <!-- Actions btns -->
              <div class="row justify-space-around align-center">
                <div class="col cols-4">
                  <sui-button
                    icon="trash alternate"
                    content="Deletar"
                    color="red"
                    @click="onModalClick('delete')"
                  />
                </div>
                <div class="col cols-4">
                  <sui-button
                    icon="pencil alternate"
                    content="Editar"
                    color="yellow"
                    @click="onModalClick('update')"
                  />
                </div>
              </div>
              <!-- Actions Text -->
              <div class="row justify-center star-text actions actions-text my-2">
                <transition name="fade">
                  <!-- Delete actions -->
                  <div class="row justify-space-around" v-if="controllers.action === 'delete'">
                    <div class="col cols-12 text-center my-2">
                      Tem certeza disso patrulheiro? Não há como voltar atrás
                    </div>
                    <div class="col cols-4">
                      <sui-button
                        icon="step backward"
                        content="Repensar"
                        color="red"
                        basic
                        @click="onModalClick('delete')"
                      />
                    </div>
                    <div class="col cols-4">
                      <sui-button
                        icon="trash alternate"
                        content="Deletar"
                        color="red"
                        @click="onModalClick('delete')"
                      />
                    </div>
                  </div>
                  <!-- Update Actions -->
                  <div class="row justify-space-around" v-if="controllers.action === 'update'">
                    <div class="col cols-12 text-center my-2">
                      Edite os campos que quiser patrulheiro
                    </div>
                    <div class="col cols-5">
                      <sui-input
                        icon="step backward"
                        content="Repensar"
                        color="red"
                        basic
                      />
                    </div>
                    <div class="col cols-5">
                      <sui-input
                        icon="trash alternate"
                        content="Deletar"
                        color="red"
                      />
                    </div>
                    <div class="col cols-4 mt-4">
                      <sui-button
                        icon="step backward"
                        content="Repensar"
                        color="red"
                        basic
                        @click="onModalClick('delete')"
                      />
                    </div>
                    <div class="col cols-4 mt-4">
                      <sui-button
                        icon="paper plane"
                        content="Salvar"
                        color="yellow"
                        @click="onModalClick('delete')"
                      />
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
    controllers: {
      showOverlay: false,
      clickedId: undefined,
      action: undefined
    }
  }),
  computed: {
    gifs: function () {
      return Array.from(this.$store.getters.gifs)
    }
  },
  methods: {
    onErrorClick () {
      // Clear all arsenal
    },
    onSuccessClick () {
      // Submit all arsenal
    },
    onGifClick (id) {
      console.log(id)
      this.controllers.clickedId = id
      this.controllers.showOverlay = true
    },
    onModalClick (action) {
      this.controllers.action = action
    },
    onCloseClick () {
      this.controllers.clickedId = undefined
      this.controllers.showOverlay = false
    }
  }
}
</script>

<style scoped>
  .arsenal-overlay {
    background-color: #00000050;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  .overlay-card {
      min-width: 25vw;
    }
  .actions-text {
    font-size: 1.25em;
    line-height: 1.5em;
    color: white;
    margin-top: 16px;
  }
</style>