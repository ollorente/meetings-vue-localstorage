import {
  DB
} from '@/main'

const state = {
  user: '',
  users: []
}

const getters = {
  getUser: state => state.user,
  getUsers: state => state.users
}

const actions = {
  async addUser ({
    commit
  }, data) {
    try {
      const res = await fetch(`${DB}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const user = await res.json()

      commit('SET_USER', user)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchUser ({
    commit
  }) {
    const user = ''

    commit('SET_USER', user)
  },

  async fetchUsers ({
    commit
  }) {
    const users = ''

    commit('SET_USERS', users)
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
