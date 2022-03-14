import api from './api'

export function getTrendingGifs (offset, limit = 10)  {
  return api.trending({ offset, limit })
}

export function getSearchGifs (term, options)  {
  return api.search(term, options)
}

export function getOneGifById (gif) {
  return api.gif(gif)
}

export function getManyGifsById (gifs) {
  return api.gifs(gifs)
}