<template>
  <div id="alert">
    <transition name="scale-fade">
      <div v-if="showOverlay" class="overlay star-text alert">
        {{ message.text }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'GTS-alert-component',
  data: () => ({
    controllers: {
      isCounting: false,
      text: '',
      duration: 0
    }
  }),
  methods: {
    count () {
      console.log('isCounting')
      this.controllers.isCounting = true
      setTimeout(() => {
        console.log('stopCounting')
        this.controllers.isCounting = false
        setTimeout(() => {
          this.$store.commit('removeMessage')
          }, 1000)
      }, this.message.duration)
    }
  },
  watch: {
    message: {
      handler (val, oldval) {
        console.log('message changed', oldval, val)
        if (val) {
          if (!oldval || (oldval && oldval.id !== val.id)) this.count()
        }
      }
    },
    showOverlay: function (val) {
      console.log('show', val)
    }
  },
  computed: {
    messages: function () {
      return this.$store.getters.messages
    },
    message: function () {
      return this.messages[0]
    },
    showOverlay: function () {
      return this.controllers.isCounting && !!this.message
    }
  },
  beforeDestroy () {
    let id = window.setTimeout(function() {}, 0)
    while (id--) {
      window.clearTimeout(id)
    }
  }

}
</script>

<style scoped>
  .alert {
    margin-top: -16px;
    margin-left: 16px;
    }
</style>