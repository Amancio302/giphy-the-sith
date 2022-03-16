<template>
  <div id="container-gif">
    <div ref="gif"/>
  </div>
</template>

<script>

import { renderGif } from '@giphy/js-components'

import { getOneGifById } from '@/services/giphy/gif'

export default {
  name: 'gif-container-component',
  props: {
    src: {
      type: String
    },
    height: {
      type: [String, Number]
    },
    width: {
      type: [String, Number]
    },
    id: {
      type: String
    },
    'link': {
      type: Boolean
    },
    'show-attribution': {
      type: Boolean
    }
  },
  data: () => ({
    controllers: {
      isImageHovered: false,
      isIconHovered: false
    }
  }),
  watch: {
    id: function () {
      this.render()
    },
    width: function () {
      this.render()
    },
    height: function () {
      this.render()
    },
    link: function () {
      this.render()
    },
    showAttribution: function () {
      this.render()
    }
  },
  methods: {
    async render () {
      if (this.id) {
        const gifElement = this.$refs.gif
        const height = this.height ? isNaN(this.height) ? parseInt(this.height.match(/(\d+)/)) : this.height : undefined
        const width = this.width ? isNaN(this.width) ? parseInt(this.width.match(/(\d+)/)) : this.width : undefined
        if (gifElement) {
          const { data } = await getOneGifById(this.id)
          renderGif(
            {
              height,
              width,
              gif: data,
              noLink: !this.link,
              hideAttribution: !this.showAttribution
            },
            gifElement
          )
        }
      }
    }
  },
  created () {
    window.addEventListener("resize", () => {
      this.render()
    })
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  mounted () {
    this.render()
  }
}
</script>

<style scoped>
  .star-icon {
    cursor: pointer;
    margin: 8px;
  }
  .image {
    background-color: white;
  }
</style>
