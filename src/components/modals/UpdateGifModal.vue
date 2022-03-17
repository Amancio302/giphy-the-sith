<template>
  <div id="update-gif-modal">
    <Modal :value="show" fixed dark>
      <div class="ui grid update-gif-modal">
        <div class="centered row align-center">
          <div class="one wide column"></div>
          <div class="thirteen wide column star-text">
            <div class="text-center">
              o que deseja fazer com o gif?
            </div>
          </div>
          <div class="one wide column">
            <div class="text-right">
              <i class="big close icon yellow clickable me-3" @click="onCloseClick"></i>
            </div>
          </div>
        </div>
        <div class="centered row">
          <div class="column" style="flex: 0">
            <ContainerGif
              :id="controllers.localdata.id"
              :height="200"
              link
              show-attribution
            />
          </div>
        </div>
        <div class="centered row">
          <div class="column">
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
        <div class="one column centered row" :class="{ 'py-0 actions-inactive': !controllers.action }">
          <div class="column">
            <transition name="drop" mode="out-in">
              <!-- Update -->
              <div id="update" v-if="controllers.action === 'update'" key="update">
                <div class="ui grid mb-4">
                  <div class="two column centered row">
                    <div class="column">
                      <InputText
                        label="título"
                        v-model="controllers.localdata.title"
                      />
                    </div>
                    <div class="column">
                      <InputText
                        label="url"
                        v-model="controllers.localdata.url"
                      />
                    </div>
                  </div>
                  <div class="centered row">
                    <div class="column">
                      <div class="two ui buttons">
                        <button class="ui button basic red" @click="onCloseClick">
                          Cancelar
                        </button>
                        <button class="ui button green" @click="onSubmitClick()">
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Delete -->
              <div id="delete" v-if="controllers.action === 'delete'" key="delete">
                <div class="ui grid mb-4">
                  <div class="centered row">
                    <div class="column">
                      <div class="star-text text-center">
                        tem certeza disso patrulheiro? não há como voltar atrás depois disso
                      </div>
                    </div>
                  </div>
                  <div class="centered row">
                    <div class="column">
                      <div class="two ui buttons">
                        <div class="two ui buttons">
                          <button class="ui button basic red" @click="onCloseClick">
                            Repensar
                          </button>
                          <button class="ui button red" @click="onDeleteClick()">
                            Deletar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>

import Modal from './Modal.vue'

import ContainerGif from '@/components/containers/containerGif.vue'

import InputText from '@/components/inputs/InputText.vue'

export default {
  name: 'update-gif-modal',
  components: {
    Modal,
    ContainerGif,
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
      if (this.controllers.action === val) {
        this.controllers.action = undefined
      } else {
        this.controllers.action = val
      }
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

<style scoped lang="less">

  @import url('@/assets/styles/colors.less');

  .update-gif-modal {
    border-radius: inherit;
    max-width: 50vw;
  }
  @media all and (max-width: 400) {
    .update-gif-modal {
      max-width: 100vw;
    }
  }
  @media all and (max-width: 600) {
    .update-gif-modal {
      max-width: 90vw;
    }
  }
  @media all and (max-width: 900) {
    .update-gif-modal {
      max-width: 75vw;
    }
  }
  @media all and (max-width: 1200) {
    .update-gif-modal {
      max-width: 50vw;
    }
  }
  @media all and (min-width: 1900) {
    .update-gif-modal {
      max-width: 25vw;
    }
  }
  .actions-text {
    font-size: 1.25em;
    line-height: 1.5em;
    color: white;
    margin-top: 16px;
  }
  .actions-inactive {
    line-height: 0;
  }
</style>