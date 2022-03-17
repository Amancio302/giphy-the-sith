<template>
<!-- Input with dropdown to select gifs -->
  <div class="input-container gif-input-container">
    <div class="ui big icon input fluid">
      <!-- Input -->
      <input
        placeholder="Começe a digitar algo..."
        v-model="searchTerm"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
        ref="gif-input"
        @keypress.enter="$emit('submit')"
      />
      <i class="search icon"/>
    </div>
    <transition name="drop">
      <!-- Dropdown -->
      <div ref="dropdown" class="dropdown" v-show="showDropdown">
        <div class="gif-container">
          <!-- Select -->
          <div ref="gif-carousel-selector" class="gif-carousel-selector"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

// Giphy Component for Carousel rendering
import { renderCarousel  } from '@giphy/js-components'

// Function to search for gifs
import { getSearchGifs } from '@/services/giphy/gif'

export default {
  name: 'input-gif-component',
  data: () => ({
    // search term
    searchTerm: null,
    // controllers object
    controllers: {
      // focus state
      isFocused: false,
      // controls first validation
      firstValidTerm: false
      }
  }),
  props: {
    'min-length': {
      type: [Number, String],
      default: 2
    },
    'gif-height': {
      type: Number,
      default: 200
    },
    search: {
      type: String
    },
    value: {
      type: Object
    }
  },
  methods: {
    // Renders the Carousel
    async render () {
      // Gets the element to inject
      const target = this.$refs['gif-carousel-selector']
      if (target) {
      const term = this.searchTerm
      // Generate the fetch function
      const fetchGifs = async (offset) => await getSearchGifs(term, { lang: 'pt', offset, limit: 10 })
      // Render
      renderCarousel({
          gifHeight: this.gifHeight,
          fetchGifs,
          key: this.searchTerm,
          onGifClick: this.onGifClick,
          noLink: true,
          onGifSeen: () => {
            if (term !== this.searchTerm) {
              this.render()
            }
          },
          noResultsMessage: 'Ops... nada aqui!'
        }, target)
      }
    },
    // Validates the term
    isSearchTermValid () {
      const isValid = !!(this.searchTerm && this.searchTerm.length >= this.minLength)
      if (!this.controllers.firstValidTerm) this.controllers.firstValidTerm = true
      return isValid || (this.controllers.firstValidTerm && this.searchTerm && this.searchTerm.length > 0)
    },
    // Trigger the input blur
    closeDropdown () {
      this.inputRef.blur()
    },
    // Change focus
    toggleFocus (val) {
      this.controllers.isFocused = val
    },
    // Calculate tje dropdown width based on parent element
    calculateDropdownWidth () {
      this.$refs.dropdown.style.width = `${this.inputRef.clientWidth}px`
    },
    // Selecting a gif
    onGifClick (gif, e) {
      e.preventDefault()
      this.$emit('input', gif)
      this.$emit('change', gif)
      this.closeDropdown()
    }
  },
  watch: {
    // Re-render after each change to term
    searchTerm: {
      handler: function () {
        if (this.showDropdown) {
          this.render()
        }
      }
    },
    // When toggling the carousel, ganerates it's width
    showDropdown: {
      handler: function (val) {
        if (val) {
          this.calculateDropdownWidth()
        }
      }
    }
  },
  computed: {
    // HTML elemement ref to input
    inputRef: function () {
      return this.$refs['gif-input']
    },
    // Controls the dropdown visibility
    showDropdown: function () {
      return this.controllers.isFocused && this.isSearchTermValid()
    }
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
