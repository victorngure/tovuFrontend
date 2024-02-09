import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customerDetails: null,
    loggedinUser: null,
    authenticationStatus: false
  },

  getters: {
    getCustomerDetails: state => state.customerDetails,
    getLoggedinUser: state => state.loggedinUser,
    getAuthenticationStatus: state => state.authenticationStatus
  },

  mutations: {
    setCustomerDetails(state, value) {
      state.customerDetails = value
    },
    setLoggedinUser(state, value) {
      state.loggedinUser = value
    },

    setAuthenticationStatus(state, value) {
      state.authenticationStatus = value
    },
  },

  actions: {
  },
  
  modules: {
  }
})
