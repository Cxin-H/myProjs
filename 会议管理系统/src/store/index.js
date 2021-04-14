import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogined:false,
    loginInfo:'游客',
  },
  mutations: {
    setLoginInfo(state,v){
      state.loginInfo=v;
    },
    setLogin(state,v){
      state.isLogined=v;
    },
  },
  actions: {
    setLoginState(context,v){
      context.commit('setLogin',v)
    },
    setLoginInfo(context,v){
      context.commit('setLoginInfo',v)
    }
  },
  modules: {
  }
})
