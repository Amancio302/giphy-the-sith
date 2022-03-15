<template>
  <div class="input-container gif-input-container">
    <div class="row justify-center">
      <div class="ui big icon input fluid">
        <input
          placeholder="Começe a digitar algo..."
          v-model="searchTerm"
          @focus="toggleFocus(true)"
          @blur="toggleFocus(false)"
          ref="gif-input"
          @keypress.enter="this.$emit('submit')"
        />
        <i class="search icon"/>
      </div>
    </div>
    <!-- Drops the gifs -->
    <transition name="drop">
      <div ref="dropdown" class="dropdown" v-show="showDropdown">
        <div class="gif-container">
            <div v-show="showGifs">
              <div class="row">
                <div ref="gif-carousel-selector" class="gif-carousel-selector"/>
              </div>
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
      dropSelector: false,
      isLoading: false,
      isFocused: false,
      firstValidTerm: false
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
          this.carousel = await renderCarousel({ gifHeight: this.gifHeight, fetchGifs, key: this.searchTerm, onGifClick: this.onGifClick, noLink: true }, target)
          this.controllers.isLoading = false
        }
      }
    },
    isSearchTermValid () {
      const isValid = !!(this.searchTerm && this.searchTerm.length >= this.minStringLen)
      if (!this.controllers.firstValidTerm && isValid) this.controllers.firstValidTerm = true
      return isValid
    },
    closeDropdown () {
      this.inputRef.blur()
    },
    toggleFocus (val) {
      this.controllers.isFocused = val
    },
    calculateDropdownWidth () {
      this.$refs.dropdown.style.width = `${this.inputRef.clientWidth}px`
    },
    onGifClick (gif, e) {
      e.preventDefault()
      this.$emit('input', gif)
      this.$emit('change', gif)
      this.closeDropdown()
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
        }
      }
    }
  },
  computed: {
    inputRef: function () {
      return this.$refs['gif-input']
    },
    showDropdown: function () {
      return this.controllers.isFocused && this.controllers.firstValidTerm
    },
    showGifs: function () {
      return this.isSearchTermValid()
    },
  }
}
</script>

<style scoped>
  .gif-input-container {
    padding-bottom: 0;
    overflow: hidden;
    width: 100%;
  }
  .gif-container img {
    cursor: pointer;
  }
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
