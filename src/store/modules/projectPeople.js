import { db } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

const state = {
  people: []
}

const getters = {
  getAllProjectPeople: state => state.people,
  getProjectPeople: state => state.people
}

const actions = {
  async fetchProjectPeople ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 1

      const res = await fetch(`${db}/projects/${data._id}/people?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const people = await res.json()

      commit('SET_PROJECT_PEOPLE', people.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllProjectPeople ({ commit }, id) {
    try {
      const res = await fetch(`${db}/projects/${id}/all-people`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const people = await res.json()

      commit('SET_PROJECT_PEOPLE', people.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_PROJECT_PEOPLE: (state, people) => (state.people = people),
  SET_PROJECT_PEOPLE: (state, people) => (state.people = people)
}

export default {
  state,
  getters,
  actions,
  mutations
}
