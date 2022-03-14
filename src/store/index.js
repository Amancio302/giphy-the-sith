import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gifs: [],
    lastGif: undefined
  },
  getters: {
    gifs (state) {
      let res
      if (state.gifs.length === 0) res = JSON.parse(localStorage.getItem('gifs'))
      else res = state.gifs
      return res || []
    },
    lastGif (state) {
      return state.lastGif
    }
  },
  mutations: {
  },
  actions: {
    addGif ({ state }, payload) {
      const gifs = Array.from(JSON.parse(localStorage.getItem('gifs')) || [])
      if (gifs.filter(el => el.id === payload.id).length === 0) {
        gifs.push(payload)
        localStorage.setItem('gifs', JSON.stringify(gifs))
        if (state.gifs.length === 0) {
          state.gifs = gifs
        } else {
          state.gifs.push(payload)
        }
        state.lastGif = payload
        return true
      }
      return false
    }
  },
  modules: {
  }
})
