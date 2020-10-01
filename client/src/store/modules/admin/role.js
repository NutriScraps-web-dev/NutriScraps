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
    console.log('roleInfo')
    console.log(state.role)
    return state.role
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
        commit('storeRoles', result.data)
      })
      .catch(err => console.log(err))
  },
  // getRoleInfo({ commit }) {
  //   if (!auth.state.authToken) {
  //     return
  //   }
  //   Api.get(`admins/roles/${this.role.role}`, {
  //     headers: {
  //       Authorization: `Bearer ${auth.state.authToken}`
  //     }
  //   })
  //     .then(res => {
  //       console.log(res)
  //       console.log(res.data)
  //       // commit('storeUser', res.data)
  //     })
  //     .catch(err => console.log(err))
  // }
  updateRole({ commit, state }, payload) {
    console.log('updateRole')
    console.log(payload)
    console.log(state.role._id)
    Api.patch(`admins/roles/${state.role._id}`, payload, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        if (res.state === 200) {
          console.log(res)
          // commit('storeUser')
        }
      })
      .catch(err => console.log(err))
  }
  // deleteRole({ commit }) {
  //   Api.delete(`admins/roles/${this.state.roleType}`, {
  //     headers: {
  //       Authorization: `Bearer ${auth.state.authToken}`
  //     }
  //   })
  //     .then(res => {
  //       console.log(res)
  //       commit('DeleteRole')
  //     })
  //     .catch(err => console.log(err))
  // }
}

const mutations = {
  storeRoles: (state, roles) => {
    state.roles = roles
  },
  storeRole: (state, role) => {
    state.role = role
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
