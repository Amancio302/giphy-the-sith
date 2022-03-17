<template>
  <div id="app">
    <div class="universe"/>
    <div class="stars"/>
    <div class="twinkling"/>
    <div class="ui grid main">
      <div class="two wide column stretch">
        <router-link class="hoverable navigator star-text text-center" :to="left.fullPath">
          <div class="nav-text left">
            {{ left.name }}
          </div>
        </router-link>
      </div>
      <div class="twelve wide column">
        <div class="ui grid container">
          <div class="row logo">
            <div class="column">
              <h2 class="logo mt-4 star-text text-center">
                Giphy the Sith
              </h2>
            </div>
          </div>
          <div class="row ">
            <div class="column">
              <transition :name="transitionName" @beforeEnter="toggleNav(true)" @afterLeave="toggleNav(false)">
                <div :key="$route.name">
                  <router-view/>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <router-link class="two wide column stretch hoverable navigator right star-text text-center" :to="right.fullPath">
        <div class="nav-text right">
          {{ right.name }}
        </div>
      </router-link>
    </div>
    <Toast class="pb-3 pe-3" />
    <Alert class="pt-3 pe-3" />
  </div>
</template>

<script>

import Toast from '@/components/UI/Toast.vue'
import Alert from '@/components/UI/Alert.vue'
 
export default {
  name: 'app',
  components: {
    Toast,
    Alert
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

<style lang="less" scoped>

  @import url('/src/assets/styles/colors.less');

  @star-height: 100vh;
  @star-width: 100vw;
  @twinkling-height: 80%;

  #app {
    height: 100vh;
  }
  .logo {
    font-size: 2em;
    height: fit-content;
  }
  .universe {
    position: absolute;
    top: 0;
    left: 0;
    height: @star-height;
    max-height: @star-height;
    width: @star-width;
    background: linear-gradient(to bottom, #000000 80%, @dark-color 90%, @bottom-color 100%);
  }
  .stars {
    position: absolute;
    top: 0;
    left: 0;
    height: @star-height;
    width: @star-width;
    background: url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center ;
  }
  .twinkling {
    position: absolute;
    top: 0;
    left: 0;
    height: @twinkling-height;
    width: @star-width;
    background:transparent url(http://www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
    animation:move-twink-back 500s linear infinite;
  }
  .main {
    position: relative;
    overflow: auto;
    margin: 0;
  }
  .content {
    overflow-y: auto;
    max-height: 80vh;
  }
  .nav-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .navigator {
    min-height: @star-height !important;
    text-decoration: none !important;
    color: @light-color !important;
    z-index: 3;
  }
  a:-webkit-any-link {
    color: @light-color !important;
    text-decoration: none !important;
  }

  @media only screen and (max-width: 700px) {
    .logo {
      font-size: 1.5em;
    }
    // .nav-text.left {
    //   transform: rotate(270deg);
    // }
    // .nav-text.right {
    //   transform: rotate(90deg);
    // }
    .nav-text {
      // word-break: break-all;
      overflow-wrap: anywhere;
      width: min-content;
    }
  }
</style>
