<template>
  <div class="overlay update-gif-overlay" v-if="show">
    <div class="card overlay-card">
      <div class="ui grid">
        <div class="centered row">
          <div class="one wide column"></div>
          <div class="thirteen wide column star-text">
            <div class="text-center">
              o que deseja fazer com o gif?
            </div>
          </div>
          <div class="one wide column">
            <div class="text-right">
              <i class="big close icon yellow clickable" @click="onCloseClick"></i>
            </div>
          </div>
        </div>
        <div class="centered row">
          <div class="ten wide column">
            <div class="two ui buttons">
              <button class="ui button red" @click="onModalClick('delete')">
                Deletar
              </button>
              <button class="ui button yellow" @click="onModalClick('update')">
                Editar
              </button>
            </div>
          </div>
        </div>
        <div class="centered row">
          <div class="ten wide column">
            <transition name="fade">
              <div id="update" v-if="controllers.action === 'update'">
                <div class="ui grid mb-4">
                  <div class="two column centered row">
                    <div class="7 wide column">
                      <InputText
                        label="título"
                        v-model="controllers.localdata.title"
                      />
                    </div>
                    <div class="7 wide column">
                      <InputText
                        label="url"
                        v-model="controllers.localdata.url"
                      />
                    </div>
                  </div>
                </div>
                <div class="two ui buttons">
                  <button class="ui button basic red" @click="onModalClick(undefined)">
                    Cancelar
                  </button>
                  <button class="ui button green" @click="onSubmitClick()">
                    Enviar
                  </button>
                </div>
              </div>
              <div id="delete" v-if="controllers.action === 'delete'">
                <div class="star-text text-center mb-4">
                  tem certeza disso patrulheiro? não há como voltar atrás depois disso
                </div>
                <div class="two ui buttons">
                  <button class="ui button basic red" @click="onModalClick(undefined)">
                    Repensar
                  </button>
                  <button class="ui button red" @click="onDeleteClick()">
                    Deletar
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InputText from '@/components/inputs/InputText.vue'

export default {
  name: 'update-gif-modal',
  components: {
    InputText
  },
  props: {
    show: {
      type: Boolean
    },
    data: {
      type: Object
    }
  },
  data: () => ({
    controllers: {
      action: undefined,
      localdata: {}
    }
  }),
  methods: {
    onCloseClick () {
      this.$emit('close')
    },
    onModalClick (val) {
      this.controllers.action = val
    },
    onDeleteClick () {
      this.$emit('delete')
    },
    onSubmitClick () {
      this.$emit('submit', this.controllers.localdata)
    }
  },
  watch: {
    data: {
      handler (val) {
        this.controllers.localdata = val || {}
      }
    },
    show: {
      handler () {
        this.controllers.action = undefined
      }
    }
  }
}
</script>

<style scoped>
  .update-gif-overlay {
    background-color: #00000099;
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