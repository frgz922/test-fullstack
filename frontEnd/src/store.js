import Vue from 'vue'
import Vuex from 'vuex'
import { axiosBase } from './api/axios-base'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token') || null, // makes sure the user is logged in even after
    // refreshing the page
    refreshToken: localStorage.getItem('refresh_token') || null,
    APIData: '' // received data from the backend API is stored here.
  },
  getters: {
    loggedIn (state) {
      return state.accessToken != null
    }
  },
  mutations: {
    updateLocalStorage (state, { access, refresh }) {
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      state.accessToken = access
      state.refreshToken = refresh
    },
    updateAccess (state, access) {
      state.accessToken = access
    },
    destroyToken (state) {
      state.accessToken = null
      state.refreshToken = null
    }
  },
  actions: {
    // run the below action to get a new access token on expiration
    refreshToken (context) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/api/v1/token/refresh/', {
          refresh: context.state.refreshToken
        }) // send the stored refresh token to the backend API
          .then(response => { // if API sends back new access and refresh token update the store
            console.log('New access successfully generated')
            context.commit('updateAccess', response.data.access)
            resolve(response.data.access)
          })
          .catch(err => {
            console.log('error in refreshToken Task')
            reject(err) // error generating new access and refresh token because refresh token has expired
          })
      })
    },
    registerUser (context, data) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/api/v1/users/', {
          email: data.email,
          country: data.country,
          password: data.password,
          confirm: data.confirm
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateUser (context, data) {
      return new Promise((resolve, reject) => {
        axiosBase.patch('/api/v1/users/' + data.id + '/', {
          email: data.email,
          country: data.country,
          password: data.password,
          confirm: data.confirm
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteUser (context, data) {
      return new Promise((resolve, reject) => {
        axiosBase.delete('/api/v1/users/' + data.id + '/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    loginUser (context, credentials) {
      return new Promise((resolve, reject) => {
        // send the username and password to the backend API:
        axiosBase.post('/api/v1/token/', {
          email: credentials.username,
          password: credentials.password
        })
        //if successful update local storage:
          .then(response => {
            context.commit('updateLocalStorage', { access: response.data.access, refresh: response.data.refresh }) // store the access and refresh token in localstorage
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
