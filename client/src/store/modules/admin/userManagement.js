import { Api } from '@/Api'
import auth from '../auth'

const state = {
  usersArray: null,
  selectedUser: null
}

const getters = {
  allUsers: state => {
    return state.usersArray
  },
  userInfo: state => {
    return state.selectedUser
  }
}

const actions = {
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
  },
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
  deleteUser({ commit, state }) {
    Api.delete(`admins/users/${state.selectedUser._id}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        commit('DeleteUser', state.selectedUser._id)
      })
      .catch(err => console.log(err))
  }
}

const mutations = {
  storeUsers: (state, users) => {
    state.usersArray = users
  },
  storeUser: (state, user) => {
    state.selectedUser = user
  },
  DeleteUser: (state, userId) => {
    // eslint-disable-next-line eqeqeq
    const index = state.usersArray.findIndex(r => r._id == userId)
    state.usersArray.splice(index, 1)
    // state.role = state.roles.filter(r => r._id != roleId)
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
