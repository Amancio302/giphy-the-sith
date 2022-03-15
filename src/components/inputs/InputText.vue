<template>
  <div id="input-text">
    <div class="star-text">
      {{ label }}
    </div>
    <div class="ui big input fluid">
      <input
        :value="value"
        @input="onInput"
        ref="text-input"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'input-text-component',
  props: {
    value: {
      type: String,
      requeired: true
    },
    label: {
      type: String,
      requeired: true
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>

</style>