<template>
  <div id="app">
    <div class="absolute">
      <div class="row justify-center">
        <div class="col cols-auto">
          <h2 class="logo mt-4">
            Giphy the Sith
          </h2>
        </div>
      </div>
    </div>
    <div class="universe"/>
    <div class="stars"/>
    <div class="twinkling"/>
    <transition :name="transitionName" @beforeEnter="toggleNav(true)" @afterLeave="toggleNav(false)">
      <div class="absolute" :key="$route.name">
        <div class="row justify-space-between fill-height">
          <div class="col cols-1">
            <router-link :to="left.fullPath" v-if="!controllers.onTransition">
              {{ left.name }}
            </router-link>
          </div>
          <div class="col">
            <router-view/>
          </div>
          <div class="col cols-1 text-right">
            <router-link :to="right.fullPath" v-if="!controllers.onTransition">
              {{ right.name }}
            </router-link>
          </div>
        </div>
      </div>
    </transition>
    <Menu/>
  </div>
</template>

<script>

import Menu from '@/components/layout/Menu.vue'
 
export default {
  name: 'app',
  components: {
    Menu
  },
  computed: {
    route: function () {
      return this.$route
    },
    transitionName: function () {
      return this.route.meta.transitionName
    },
    left: function () {
      return this.route.meta.nav.left
    },
    right: function () {
      return this.route.meta.nav.right
    }
  },
  data: () => ({
    controllers: {
      onTransition: false
    }
  }),
  methods: {
    toggleNav (val) {
      this.controllers.onTransition = val
    }
  }
}
</script>

<style>

  #app {
    height: 100%;
  }
  .logo {
    color: #FFE81F;
    font-family: StarJedi;
    font-size: 3em;
    z-index: 10;
    margin: 0;
  }
  .universe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    max-height: 100vh;
    width: 100vw;
    background: linear-gradient(to bottom, #000000 80%, #0f0f0f 90%, #2E67F8 100%);
  }
  .stars {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center ;
  }
  .twinkling {
    position: absolute;
    top: 0;
    left: 0;
    height: 80vh;
    width: 100vw;
    background:transparent url(http://www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
    animation:move-twink-back 500s linear infinite;
  }
  .config {
    margin: 32px;
  }
  .icon {
    z-index: 1;
  }
  .input-container {
    width: 100%;
    min-height: 45px;
  }
  .input {
    height: 45px;
    width: 100%;
  }
  .input-container-rounded {
    border-radius: 0 0 32px 32px;
    min-height: 77px;
  }
  .dropdown {
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
  }
</style>
