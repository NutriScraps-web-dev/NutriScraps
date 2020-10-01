import { Api } from '@/Api'
import auth from '../auth'

const state = {
  roles: null,
  roleType: ''
}

const getters = {
  roleItems: state => {
    return state.roles
  }
}

const actions = {
  getAllRoles: ({ commit }) => {
    if (!auth.state.authToken) {
      return
    }
    Api.get('/admins/roles', {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(result => {
        console.log(result.data)
        commit('storeRole', result.data)
      })
      .catch(err => console.log(err))
  }
}

const mutations = {
  storeRole: (state, roles) => {
    state.roles = roles
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
