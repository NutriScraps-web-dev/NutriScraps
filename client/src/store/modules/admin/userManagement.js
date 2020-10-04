import { Api } from '@/Api'
import auth from '../auth'

const state = {
  usersArray: [],
  selectedUser: null
}

const getters = {
  allUsers: state => {
    return state.usersArray
  },
  selectedUserInfo: state => {
    return state.selectedUser
  }
}

const actions = {
  getAllUsers: ({ commit }, payload) => {
    if (!auth.state.authToken) {
      return
    }
    Api.get(`/admins/users?page=${payload.page}&limit=${payload.limit}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(result => {
        console.log('get All USers')
        console.log(result.data.userDocs)
        commit('storeUsers', result.data.userDocs)
      })
      .catch(err => console.log(err))
  },
  updateUser({ commit, state }, payload) {
    console.log('updateRole')
    console.log(payload)
    console.log(state.selectedUser._id)
    Api.patch(`admins/users/${state.selectedUser._id}`, payload, {
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
  },
  deleteSelectedUser({ commit, state }) {
    Api.delete(`admins/users/${state.selectedUser._id}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        commit('DeleteSelectedUser', state.selectedUser._id)
      })
      .catch(err => console.log(err))
  }
}

const mutations = {
  storeUsers: (state, users) => {
    state.usersArray.push(...users)
  },
  lessUsers: (state) => {
    state.usersArray.splice(5, (state.usersArray.length - 5))
  },
  storeSelectedUser: (state, user) => {
    state.selectedUser = user
  },
  DeleteSelectedUser: (state, userId) => {
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
