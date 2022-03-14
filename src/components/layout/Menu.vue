<template>
  <div id="menu">
    <div class="row justify-end">
      <div class="col cols-auto config">
        <div class="row">
          <Icon
            name="cog"
            size="big"
            inverted
            @hover="toggleMenu"
          />
        </div>
        <div class="row">
          <div class="col cols-1">
            <transition name="drop">
              <div class="dropdown dropdown-menu" v-show="controllers.showMenu">
                Ratinhooo
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Icon from '@/components/UI/Icon.vue'

export default {
  name: 'GTS-menu',
  components: {
    Icon
  },
  data : () => ({
    controllers: {
      showMenu: false
    }
  }),
  methods: {
    toggleMenu () {
      this.controllers.showMenu = !this.controllers.showMenu
    }
  }
}
</script>

<style>
  .dropdown-menu {
    /* margin-top: auto; */
  }
</style>