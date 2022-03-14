<template>
  <div class="row justify-center">
    <div 
      :style="{
        height,
        width,
        background: `url(${src})`,
      }"
      @mouseenter="toggleImageHover"
      @mouseleave="toggleImageHover"
    >
      <div class="row justify-end" v-if="favorited && controllers.isImageHovered">
        <div class="col cols-auto">
          <sui-icon
            name="star"
            size="big"
            class="star-icon"
            :color="favorited ? 'yellow' : 'white'"
            :outline="controllers.isIconHovered"
            @mouseenter="toggleIconHover"
            @mouseleave="toggleIconHover"
            @click="onClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    favorited: {
      type: Boolean
    }
  },
  data: () => ({
    controllers: {
      isImageHovered: false,
      isIconHovered: false
    }
  }),
  methods: {
    toggleImageHover () {
      this.controllers.isImageHovered = !this.controllers.isImageHovered
    },
    toggleIconHover () {
      this.controllers.isIconHovered = !this.controllers.isIconHovered
    },
    onClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>
  .star-icon {
    cursor: pointer;
    margin: 8px;
  }
</style>
