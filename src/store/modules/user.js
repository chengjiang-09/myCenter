const state = () => {
  return {
    userInfo: {
      status: '',
      id: '',
      mobile: '',
      token: '',
      character: ''
    }
  }
}
const mutations = {
  setUserInfo (state, layout) {
    state.userInfo = layout
  }
}

const actions = {

}

const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}