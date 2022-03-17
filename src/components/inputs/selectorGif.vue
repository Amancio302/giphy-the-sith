<template>
  <div id="gif-selector">
    <div class="ui two column centered  grid">
      <div class="row">
        <InputGif
          :value="value"
          @input="onInput"
          @submit="$emit('submit')"
          :height="controllers.gifHeight"
        />
      </div>
      <div class="row" :style="{
        height: `${controllers.gifHeight}px`
      }">
        <div class="column" style="flex: 0">
          <transition name="scaleX-fade" @after-leave="onAfterLeave">
            <ContainerGif
              :id="keepData.id"
              :height="controllers.gifHeight"
              v-show="showGif"
              :show-attribution="test"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InputGif from '@/components/inputs/InputGif.vue'

import ContainerGif from '@/components/containers/containerGif.vue'

import { parseGif } from '@/utils/gif'

export default {
  name: 'gif-selector-component',
  components: {
    InputGif,
    ContainerGif
  },
  props: {
    value: {},
    editable: {
      type: Boolean
    }
  },
  data: () => ({
    controllers: {
      isLoading: false,
      gifHeight: 200
    },
    keepData: {},
    test: false
  }),
  methods: {
    onInput (val) {
      this.$emit('input', parseGif(val))
    },
    onAfterLeave () {
      this.keepData = {}
    },
    setLoading (val) {
      this.controllers.isLoading = val
    }
  },
  computed: {
    gif: function () {
      return parseGif(this.value, 'fixed_height')
    },
    showGif: function () {
      return !!this.value
    }
  },
  watch: {
    gif: {
      handler (val) {
        if (val.id) this.keepData = val
      }
    }
  }
}
</script>

<style scoped>
  .gif {
    margin: 64px 0;
  }
</style>