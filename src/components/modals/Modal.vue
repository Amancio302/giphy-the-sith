<template>
  <div id="modal">
    <transition name="scale-fade">
      <div class="overlay" :class="{ 'overlay-fixed': fixed }" v-if="value">
        <div class="modal-container">
          <div class="card pa-3 ma-3 baa-3 rounded-3" :class="{ 'dark-card': dark }">
            <slot/>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'GTS-modal-component',
  props: {
    value: {
      type: Boolean
    },
    fixed: {
      type: Boolean
    },
    dark: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
</style>
