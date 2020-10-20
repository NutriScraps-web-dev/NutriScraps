import { Api } from '@/Api'
import auth from '../auth'

const state = {
  roles: null,
  role: null
}

const getters = {
  roleItems: state => {
    return state.roles
  },
  roleInfo: state => {
    return state.role
  }
}

const actions = {
  createRole({ commit, dispatch }, payload) {
    Api.post('/roles', payload, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(result => {
        commit('createRole', result)
        dispatch('getAllRoles')
      })
  },
  getAllRoles: ({ commit }) => {
    if (!auth.state.authToken) {
      return
    }
    Api.get('/roles', {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(result => {
        commit('storeRoles', result.data)
      })
  },
  updateRole({ commit, state }, payload) {
    Api.patch(`roles/${state.role._id}`, payload, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        if (res.state === 200) {
          // commit('storeUser')
        }
      })
  },
  deleteRole({ commit, state }) {
    Api.delete(`roles/${state.role._id}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        commit('DeleteRole', state.role._id)
      })
  }
}

const mutations = {
  storeRoles: (state, roles) => {
    state.roles = roles
  },
  storeRole: (state, role) => {
    state.role = role
  },
  DeleteRole: (state, roleId) => {
    // eslint-disable-next-line eqeqeq
    const index = state.roles.findIndex(r => r._id == roleId)
    state.roles.splice(index, 1)
    // state.roles = state.roles.filter(r => r._id != roleId)
  },
  createRole: (state, role) => {
    state.roles = [...state.roles, role]
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
