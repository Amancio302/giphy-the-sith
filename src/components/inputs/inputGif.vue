<template>
  <div class="input-container gif-input-container">
    <div class="row">
      <sui-input
        placeholder="Começe a digitar algo..."
        icon="search"
        size="big"
        v-model="searchTerm"
        class="input"
        @blur="toggleDropdown(false)"
        ref="gif-input"
      />
    </div>
    <!-- Drops the gifs -->
    <transition name="slide" @leave="onLeave">
      <div ref="dropdown" class="dropdown" v-show="controllers.dropSelector">
        <div class="gif-container">
            <div v-show="showGifs">
              <div class="row">
                <div ref="gif-carousel-selector" class="gif-carousel-selector"/>
              </div>
              <sui-loader/>
            </div>
            <div v-show="!showGifs && controllers.isLoading" class="loader" :style="{
              height: `${controllers.gifHeight}px`
            }">
              <sui-loader active centered inline />
            </div>
            <div v-show="!showGifs && !controllers.isLoading" class="loader">
              <div class="nothing-yet">
                Ops... nada aqui
              </div>
            </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- <div class="col col-auto">
      <sui-image class="giphy-logo" src="https://raw.githubusercontent.com/Zozman/TheGifOracleChrome/master/screenshots/giphyLogo.gif"/>
    </div> -->
</template>

<script>

import { renderCarousel  } from '@giphy/js-components'

import { getSearchGifs } from '@/services/giphy/gif'

export default {
  name: 'input-gif-component',
  data: () => ({
    searchTerm: null,
    minStringLen: 5,
    controllers: {
      selector: false,
      gifHeight: 200,
      dropSelector: false,
      isLoading: false
    }
  }),
  props: {
    'min-lenght': {
      type: [Number, String],
      default: 5
    },
    'gif-height': {
      type: Number,
      default: 200
    },
    search: {
      type: String
    },
    value: {}
  },
  methods: {
    async render () {
      if (!this.controllers.isLoading) {
        const target = this.$refs['gif-carousel-selector']
        if (target) {
          this.controllers.isLoading = true
          const fetchGifs = async (offset) => await getSearchGifs(this.searchTerm, { lang: 'pt', offset, limit: 10 })
          this.carousel = await renderCarousel({ gifHeight: this.controllers.gifHeight, fetchGifs, key: this.searchTerm, onGifClick: this.onGifClick, noLink: true }, target)
          this.controllers.isLoading = false
        }
      }
    },
    isSearchTermValid () {
      return this.searchTerm && this.searchTerm.length >= this.minStringLen
    },
    onLeave () {
      this.render()
    },
    toggleDropdown (val) {
      if (this.showGifs) {
        this.controllers.selector = val
        if (val) this.calculateDropdownWidth()
      }
    },
    calculateDropdownWidth () {
      this.$refs.dropdown.style.width = `${this.inputRef.$el.clientWidth}px`
    },
    onGifClick (gif, e) {
      e.preventDefault()
      this.$emit('input', gif)
      this.$emit('change', gif)
    }
  },
  watch: {
    searchTerm: {
      handler: function () {
        if (this.showGifs) {
          this.render()
        }
      }
    },
    showGifs: {
      handler: function (val) {
        if (val) {
          this.calculateDropdownWidth()
          this.controllers.dropSelector = true
        }
      }
    }
  },
  computed: {
    showGifs: function () {
      return this.searchTerm !== null && this.isSearchTermValid()
    },
    inputRef: function () {
      return this.$refs['gif-input']
    }
  }
}
</script>

<style>
  .gif-input-container {
    padding-bottom: 0;
    overflow: hidden;
  }
  .giphy-logo {
    display: flex;
    flex-direction: column;
    height: 45px;
  }
  .gif-container img {
    cursor: pointer;
  }
  .slide-enter-active, .slide-leave-active {
    transition: 1s;
  }
  .slide-enter {
    transform: translateY(100%, 0);
  }
  .slide-leave-to {
    transform: translateY(-100%, 0);
  }
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
