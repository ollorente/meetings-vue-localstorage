import { db, DB } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

const state = {
  person: '',
  people: []
}

const getters = {
  getAllPeople: state => state.people,
  getPerson: state => state.person,
  getPeople: state => state.people
}

const actions = {
  async addPerson ({ commit }, payload) {
    try {
      const res = await fetch(`${db}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(payload)
      })

      const person = await res.json()

      commit('SET_PERSON', person.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchPerson ({ commit }, id) {
    try {
      const res = await fetch(`${db}/people/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const person = await res.json()

      commit('SET_PERSON', person.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchPeople ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 1

      const res = await fetch(`${db}/people?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const people = await res.json()

      commit('SET_PEOPLE', people.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllPeople ({ commit }) {
    try {
      const res = await fetch(`${DB}/users/all-people`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const people = await res.json()

      commit('SET_PEOPLE', people.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async updatePerson ({ commit }, payload) {
    try {
      const res = await fetch(`${db}/people/${payload._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(payload)
      })

      const person = await res.json()

      commit('SET_PERSON', person)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deletePerson ({ commit }, id) {
    try {
      const res = await fetch(`${db}/people/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const person = await res.json()

      commit('SET_PERSON', person)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_PEOPLE: (state, people) => (state.people = people),
  SET_PERSON: (state, person) => (state.person = person),
  SET_PEOPLE: (state, people) => (state.people = people)
}

export default {
  state,
  getters,
  actions,
  mutations
}
