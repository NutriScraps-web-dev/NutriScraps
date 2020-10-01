import { Api } from '@/Api'
import auth from '../auth'

const state = {
  users: null,
  user: null
}

const getters = {
  allUsers: state => {
    return state.users
  },
  userInfo: state => {
    console.log('roleInfo')
    console.log(state.user)
    return state.user
  }
}

const actions = {
  // createRole({ commit }, payload) {
  //   Api.post('/admins/roles', payload)
  //     .then(result => {
  //       commit('createRole', result)
  //     })
  //     .catch(err => console.log(err))
  // },
  getAllUsers: ({ commit }) => {
    if (!auth.state.authToken) {
      return
    }
    Api.get('/admins/users', {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(result => {
        console.log(result.data)
        commit('storeUsers', result.data.userDocs)
      })
      .catch(err => console.log(err))
  }
  // updateRole({ commit, state }, payload) {
  //   console.log('updateRole')
  //   console.log(payload)
  //   console.log(state.role._id)
  //   Api.patch(`admins/roles/${state.role._id}`, payload, {
  //     headers: {
  //       Authorization: `Bearer ${auth.state.authToken}`
  //     }
  //   })
  //     .then(res => {
  //       if (res.state === 200) {
  //         console.log(res)
  //         // commit('storeUser')
  //       }
  //     })
  //     .catch(err => console.log(err))
  // },
  // deleteRole({ commit, state }) {
  //   Api.delete(`admins/roles/${state.role._id}`, {
  //     headers: {
  //       Authorization: `Bearer ${auth.state.authToken}`
  //     }
  //   })
  //     .then(res => {
  //       commit('DeleteRole', state.role._id)
  //     })
  //     .catch(err => console.log(err))
  // }
}

const mutations = {
  storeUsers: (state, users) => {
    state.users = users
  }
  // storeRole: (state, role) => {
  //   state.role = role
  // },
  // DeleteRole: (state, roleId) => {
  //   // eslint-disable-next-line eqeqeq
  //   const index = state.roles.findIndex(r => r._id == roleId)
  //   state.roles.splice(index, 1)
  //   // state.role = state.roles.filter(r => r._id != roleId)
  // },
  // createRole: (state, role) => {
  //   state.roles.push(role)
  // }
}

export default {
  actions,
  state,
  getters,
  mutations
}
