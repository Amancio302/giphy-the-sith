import axios from 'axios'
import { API_URL } from '@/config/api'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
    // Token viria aqui
  },
  timeout: 30000
})