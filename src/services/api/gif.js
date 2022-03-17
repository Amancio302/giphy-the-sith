/* eslint-disable no-unused-vars */
// import api from './api'

// CREATE

// Simula a criação de um gif
export async function createOneGif (data) {
  // return api.post('/gifs', data).catch(err => err.response)
  return { status: 201, data: [] }
}

// Simula um envio definitivo dos gifs para o Lord Sith
export async function sendAllGifsToWar (data) {
  // return api.post('/gifs', data).catch(err => err.response)
  return { status: 200, data: [] }
}

// READ

// Simula a leitura de todos os gifs
// Não utilizada
// Seria interessante chamá-la assim que o usuário fizesse login (no caso dessa ser uma ação do sistema)
// Ou quando uma nova sessão fosse instanciada (sessão do browser por exemplo)
// Seria uma regra simples
export async function getAllGifs () {
  // return api.get('/gifs').catch(err => err.response)
  return { status: 200, data: [] }
}

// Simula a leitura de um gif
// Não utilizada
// Seria interessante chamá-la numa tela à parte para visualizar o GIF
export async function getOneGif (id) {
  // return api.get(`/gifs/${id}`).catch(err => err.response)
  return { status: 200, data: [] }
}

// UPDATE

// Simula a atualização de um gif
export async function updateOneGif (id, data) {
  // return api.put(`/gifs/${id}`, data).catch(err => err.response)
  return { status: 200, data: [] }
}

// DELETE

// Simula a remoção de todos os gifs
export async function deleteAllGifs () {
  // return api.delete('/gifs').catch(err => err.response)
  return { status: 200, data: [] }
}

// Simula a remoção de um gif
export async function deleteOneGif (id) {
  // return api.delete(`/gifs/${id}`).catch(err => err.response)
  return { status: 200, data: [] }
}