<template>
  <div class="row justify-center">
    <sui-image :src="src"
      size="massive"
      @load="onLoad"
    />
  </div>
</template>

<script>
export default {
  name: 'gif-container-component',
  props: {
    src: {
      type: String
    }
  },
  methods: {
    onLoad () {
      console.log('image loaded...')
    }
  }
}
</script>

<style>

</style>
