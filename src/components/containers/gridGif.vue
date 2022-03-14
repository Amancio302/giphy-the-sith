<template>
  <div id="grid-gif" class="hoverable">
    <div class="row justify-center grid">
        <div ref="grid-gif"/>
    </div>
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
    removed: [],
    controllers: {
      offsetGrid: 0,
      gridCount: 4,
      gifWidth: 400
    }
  }),
  methods: {
    onClick (i) {
      // remove icon
      this.removed.push(this.gifs[i].id)
    },
    async render () {
      const grid = this.$refs['grid-gif']
      if (grid) {
        const width = grid.parentElement.clientWidth
        const amount = Math.round(width / this.controllers.gifWidth)
        const fetchGifs  = async () => await getManyGifsById(this.parsedGifs)
        await renderGrid(
          {
            gifWidth: this.controllers.gifWidth,
            width: width,
            columns: amount,
            noLink: true,
            fetchGifs,
            onGifClick: (data) => {
              this.$emit('click', data.id)
            },
            className: 'clickable'
          },
          grid
        )
      }
    }
  },
  watch: {
    parseGif: {
      handler: function () {
        this.render()
      },
      deep: true
    }
  },
  computed: {
    parsedGifs: function () {
      return this.gifs.filter(el => this.removed.indexOf(el) === -1).map(el => el.id)
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
    max-height: 60vh;
    overflow-y: auto;
  }

</style>
