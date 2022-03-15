<template>
  <div id="app">
    <div class="universe"/>
    <div class="stars"/>
    <div class="twinkling"/>
    <div class="ui grid main">
      <router-link class="two wide column stretch hoverable navigator star-text text-center" :to="left.fullPath">
        <div class="nav-text">
          {{ left.name }}
        </div>
      </router-link>
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
      <router-link class="two wide column stretch hoverable navigator star-text text-center" :to="right.fullPath">
        <div class="nav-text">
          {{ right.name }}
        </div>
      </router-link>
    </div>
    <Toast/>
    <Alert/>
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

<style>

  #app {
    height: 100vh;
    background: blue;
  }
  .logo {
    font-size: 2em;
    height: fit-content;
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
    height: 80%;
    width: 100vw;
    background:transparent url(http://www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
    animation:move-twink-back 500s linear infinite;
  }
  .header {
    height: 10vh
  }
  .main {
    /* max-height: 100vh; */
    position: relative;
    overflow: auto;
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
  .config {
    margin: 32px;
  }
  .icon {
    z-index: 1;
  }
  .input-container-rounded {
    border-radius: 0 0 32px 32px;
    min-height: 77px;
  }
  .navigator {
    min-height: 100vh !important;
    text-decoration: none !important;
    color: #ffffff !important;
    z-index: 3;
  }

  a:-webkit-any-link {
    color: #ffffff !important;
    text-decoration: none !important;
  }
</style>
