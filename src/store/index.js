import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customerDetails: null,
    loggedinUser: null,
    authenticationStatus: false,

    personalDetails: false,
    residence: false,
    kin: false, 
    otherDetails: false,

  },

  getters: {
    getCustomerDetails: state => state.customerDetails,
    getLoggedinUser: state => state.loggedinUser,
    getAuthenticationStatus: state => state.authenticationStatus,

    getPersonalDetails: state => state.personalDetails,
    getResidence: state => state.residence,
    getKin: state => state.kin,
    getOtherDetails: state => state.otherDetails
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

    setPersonalDetails(state, value) {
      state.personalDetails = value
    },

    setResidence(state, value) {
      state.residence = value
    },

    setKin(state, value) {
      state.kin = value
    },

    setOtherDetails(state, value) {
      state.otherDetails = value
    },
  },

  actions: {
  },
  
  modules: {
  }
})
