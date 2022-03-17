<template>
  <div id="grid-gif" class="row justify-center hoverable">
    <div ref="grid-gif" class="grid"/>
  </div>
</template>

<script>

import { renderGrid } from '@giphy/js-components'

import { getManyGifsById } from '@/services/giphy/gif'

export default {
  name: 'grid-gif-component',
  props: {
    gifs: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    controllers: {
      gridCount: 4,
      gifWidth: 400,
      renders: 0
    }
  }),
  methods: {
    async render () {
      const grid = this.$refs['grid-gif']
      if (grid) {
        const width = Math.floor(grid.parentElement.clientWidth)
        const amount = Math.floor(width / this.controllers.gifWidth) || 1
        const gifWidth = Math.floor(width / amount)
        const fetchGifs  = async () => await getManyGifsById(this.parsedGifs)
        renderGrid(
          {
            gifWidth,
            width,
            columns: amount,
            noLink: true,
            fetchGifs,
            onGifClick: (data) => {
              this.$emit('click', data.id)
            },
            className: 'clickable',
            hideAttribution: true,
            key: this.controllers.renders
          },
          grid
        )
        this.controllers.renders++
      }
    }
  },
  watch: {
    parsedGifs: {
      handler: function () {
        this.render()
      },
      deep: true
    }
  },
  computed: {
    parsedGifs: function () {
      return this.gifs.map(el => el.id)
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

  #grid-gif {
    padding: 7px 0 7px 7px;
    border-radius: 10px;
  }
  .grid {
    max-height: 50vh;
    overflow-y: auto;
  }
</style>
