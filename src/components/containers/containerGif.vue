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
      type: String
    },
    width: {
      type: String
    },
    id: {
      type: String
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
    }
  },
  methods: {
    async render () {
      if (this.id) {
        const gifElement = this.$refs.gif
        const height = gifElement.parentElement.parentElement.clientHeight
          console.log(height, {gifElement})
        if (gifElement) {
          const { data } = await getOneGifById(this.id)
          console.log(data)
          renderGif(
            {
              height: height,
              gif: data,
              noLink: true
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
