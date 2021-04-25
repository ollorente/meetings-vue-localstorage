import { db } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

const state = {
  people: []
}

const getters = {
  getAllMeetingPeople: state => state.people,
  getMeetingPeople: state => state.people
}

const actions = {
  async fetchMeetingPeople ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const res = await fetch(`${db}/meetings/${data.meeting}/people?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const people = await res.json()

      commit('SET_MEETING_PEOPLE', people.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllMeetingPeople ({ commit }, id) {
    try {
      const res = await fetch(`${db}/meetings/${id}/all-people`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const people = await res.json()

      commit('SET_MEETING_PEOPLE', people.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_MEETING_PEOPLE: (state, people) => (state.people = people),
  SET_MEETING_PEOPLE: (state, people) => (state.people = people)
}

export default {
  state,
  getters,
  actions,
  mutations
}
