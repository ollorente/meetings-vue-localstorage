import { DB } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

const state = {
  user: '',
  users: []
}

const getters = {
  getAllUsers: state => state.users,
  getUser: state => state.user,
  getUsers: state => state.users
}

const actions = {
  async addUser ({ commit }, payload) {
    try {
      const res = await fetch(`${DB}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const user = await res.json()

      commit('SET_USER', user)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchUser ({ commit }) {
    try {
      const user = ''

      commit('SET_USER', user)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchUsers ({ commit }) {
    try {
      const res = await fetch(`${DB}/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const users = await res.json()

      commit('SET_USERS', users.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllUsers ({ commit }) {
    try {
      const res = await fetch(`${DB}/users/all-people`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const users = await res.json()

      commit('SET_USERS', users.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_USER: (state, user) => (state.user = user),
  SET_USERS: (state, users) => (state.users = users)
}

export default {
  state,
  getters,
  actions,
  mutations
}
