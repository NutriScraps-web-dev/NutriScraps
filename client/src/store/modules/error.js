const state = {
  hasError: false
}

const getters = {
  getError: state => {
    return state.hasError
  }
}

const mutations = {
  hasError: state => {
    console.log('error mutations')
    state.hasError = !state.hasError
  }
}

export default {
  state,
  mutations,
  getters
}
