import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  const store = new Vuex.Store({
    state: {
      name: ''
    },
    mutations: {
      changeName (state) {
        state.name = 'hewnelin'
      }
    },
    actions: {
      changeName ({commit}) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('changeName')
            resolve()
          }, 1000)
        })
      }
    }
  })
  // 如果浏览器执行的时候，需要将服务端最新的状态替换掉客户端的
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  return store
}