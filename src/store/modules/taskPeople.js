import { db } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

const state = {
  people: []
}

const getters = {
  getAllTaskPeople: state => state.people,
  getTaskPeople: state => state.people
}

const actions = {
  async fetchTaskPeople ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const res = fetch(`${db}/tasks/${data._id}/people?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const people = await (await res).json()

      commit('SET_TASK_PEOPLE', people.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllTaskPeople ({ commit }, id) {
    try {
      const res = fetch(`${db}/tasks/${id}/all-people`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const people = await (await res).json()

      commit('SET_TASK_PEOPLE', people.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_TASK_PEOPLE: (state, people) => (state.people = people),
  SET_TASK_PEOPLE: (state, people) => (state.people = people)
}

export default {
  state,
  getters,
  actions,
  mutations
}
