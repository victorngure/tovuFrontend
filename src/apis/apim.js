import axios from 'axios'
import { config } from '@/util/config.js'
import router from '../router';

let APIM = function() {
  let baseAPI  = axios.create({
    baseURL: config.backendURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    baseAPI.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  }

  baseAPI.interceptors.response.use(
    response => response,
    error => {
      console.log(error.response.status)

      if (error.response.status === 401) {  
        router.push('/login')
      }
      return Promise.reject(error)
    }
  )

  return baseAPI
}

export default APIM; 