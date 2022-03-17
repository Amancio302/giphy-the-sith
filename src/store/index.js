import Vue from 'vue'
import Vuex from 'vuex'

import { createOneGif, getAllGifs, updateOneGif, deleteOneGif, deleteAllGifs, sendAllGifsToWar } from '@/services/api/gif'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gifs: [],
    lastGif: undefined,
    lastMessage: undefined,
    numMessages: 0
  },
  getters: {
    gifs (state) {
      let res
      if (state.gifs.length === 0) res = JSON.parse(localStorage.getItem('gifs'))
      else res = state.gifs
      return res || []
    },
    lastGif (state) {
      const gifs = Array.from(JSON.parse(localStorage.getItem('gifs')) || [])
      return gifs.filter(el => el.id === state.lastGif)[0] || undefined
    },
    lastMessage (state) {
      return state.lastMessage
    }
  },
  mutations: {
    syncGifs (state) {
      const gifs = Array.from(JSON.parse(localStorage.getItem('gifs')) || [])
      if (state.gifs.length !== gifs.length) {
        state.gifs = gifs
      }
    },
    sendMessage (state, payload) {
      state.lastMessage = { ...payload, id: state.numMessages++ }
    }
  },
  actions: {
    async fetchGifsFromServer ({ state }) {
      const res = await getAllGifs()
      if (res.status !== 200) {
        return res.data.error
      }
      state.gifs = Array.from(res.data)
      localStorage.setItem('gifs', JSON.stringify(state.gifs))
    },
    async addGif ({ state, commit }, payload) {
      commit('syncGifs')
      const data = { ...payload, sent: false }
      if (state.gifs.filter(el => el.id === payload.id).length === 0) {
        const res = await createOneGif(payload)
        if (res.status !== 201) {
          return res.data.error
        }
        state.gifs.push(data)
        localStorage.setItem('gifs', JSON.stringify(state.gifs))
        state.lastGif = payload.id
        return true
      }
      return 'Item já consta no arsenal!'
    },
    async updateGif({ state, commit }, data) {
      commit('syncGifs')
      let index
      state.gifs.map((el, i) => {
        if (el.id === data.id) index = i
      })
      if (index || index === 0) {
        const res = await updateOneGif(data.id, { ...data, id: undefined })
        if (res.status !== 200 && res.status !== 204) {
          return res.data.error
        }
        state.gifs.splice(index, 1, data)
        localStorage.setItem('gifs', JSON.stringify(state.gifs))
        return true
      }
      return 'Item não consta no arsenal'
    },
    async deleteGif ({ state, commit }, id) {
      commit('syncGifs')
      let index
      state.gifs.map((el, i) => {
        if (el.id === id) index = i
      })
      if (index || index === 0) {
        const res = await deleteOneGif(id)
        if (res.status !== 200 && res.status !== 204) {
          return res.data.error
        }
        state.gifs.splice(index, 1)
        localStorage.setItem('gifs', JSON.stringify(state.gifs))
        return true
      }
      return 'Item não consta no arsenal'
    },
    async clearGifs ({ state }) {
      const res = await deleteAllGifs()
      if (res.status !== 200 && res.status !== 204) {
        return res.data.error
      }
      localStorage.setItem('gifs', JSON.stringify([]))
      state.gifs = []
      state.lastGif = undefined
      return true
    },
    async sendGifs ({ state, commit }) {
      commit('syncGifs')
      const res = await sendAllGifsToWar()
      if (res.status !== 200 && res.status !== 204) {
        return res.data.error
      }
      state.gifs.forEach(el => {
        if (!el.sent) {
          el.sent = true
        }
      })
      localStorage.setItem('gifs', JSON.stringify(state.gifs))
      return true
    }
  },
  modules: {
  }
})
