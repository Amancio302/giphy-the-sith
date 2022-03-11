<template>
  <div id="app">
    <div class="universe"/>
    <div class="stars"/>
    <div class="twinkling"/>
    <transition :name="transitionName" @beforeEnter="toggleNav(true)" @afterLeave="toggleNav(false)">
      <div class="absolute" :key="$route.name">
        <div class="row justify-space-between">
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
  </div>
</template>

<script>
export default {
  name: 'app',
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
      console.log('toggle nav', val)
      this.controllers.onTransition = val
    }
  }
}
</script>

<style lang="less">

  @font-face {
    font-family: StarJedi;
    src: url('/src/assets/fonts/starjedi/Starjedi.ttf');
  }

  #app {
    height: 100%;
  }
  .universe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
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
  i.icon {
    display: inline;
  }
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .justify-space-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .col {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: content;
  }
  .cols-auto {
    flex-grow: 0;
  }
  .cols-8 {
    flex-grow: 0;
    flex-basis: calc(100vw/12*8);
  }
  .cols-1 {
    flex-grow: 0;
    flex-basis: calc(100vw/12*1);
  }
  .text-right {
    text-align: end;
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
  .absolute {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .red {
    background-color: red;
  }
  .green {
    background-color: green;
  }
  .blue {
    background-color: blue;
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

  @keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }

  @keyframes slideLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes slideRight {
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(0);
    }
  }

  .slide-right-enter-active {
    animation: slideLeft 1s;
  }

  .slide-right-leave-active {
    animation: slideRight 1s;
  }

  .slide-left-enter-active {
    animation: slideLeft 1s reverse;
  }

  .slide-left-leave-active {
    animation: slideRight 1s reverse;
  }



</style>
