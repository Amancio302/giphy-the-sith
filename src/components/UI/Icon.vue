<template>
  <sui-icon
    :color="color"
    :name="name"
    :inverted="inverted"
    :size="size"
    @mouseenter="toggleHover"
    @mouseleave="toggleHover"
    @click="onClick"
    class="clickable"
    :class="{
      'spin-in': animationIn,
      'spin-out': animationOut
    }"
  />
</template>

<script>
export default {
  name: 'GTS-icon',
  props: {
    color: {
      type: String
    },
    name: {
      type: String
    },
    inverted: {
      type: Boolean
    },
    size: {
      type: String
    },
    'hover-animation': {
      type: String
    },
    'click-animation': {
      type: String
    }
  },
  data: () => ({
    controllers: {
      isHovered: false,
      isClicked: false
    },
    animationIn: false,
    animationOut: false
  }),
  methods: {
    toggleHover () {
      this.controllers.isHovered = !this.controllers.isHovered
    },
    onClick () {

    }
  },
  watch: {
    'controllers.isHovered': function (val) {
      if (val) {
        this.animationOut = false
        setTimeout(() => {
          this.animationIn = true
        }, 1);
        this.$emit('hover', true)
      } else {
        this.animationIn = false
        setTimeout(() => {
          this.animationOut = true
        }, 1);
        this.$emit('hover', false)
      }
    }
  }
}
</script>

<style scoped>
  .spin-in {
    animation: spin 0.5s;
  }

  .spin-out {
    animation: spin 0.75s reverse;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }
</style>