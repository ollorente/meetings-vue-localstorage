import { db } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

const state = {
  meetings: []
}

const getters = {
  getAllProjectMeetings: state => state.meetings,
  getProjectMeetings: state => state.meetings
}

const actions = {
  async fetchProjectMeetings ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const res = fetch(`${db}/projects/${data._id}/meetings?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const meetings = await (await res).json()

      commit('SET_PROJECT_MEETINGS', meetings.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllProjectMeetings ({ commit }, id) {
    try {
      const res = fetch(`${db}/projects/${id}/all-meetings`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const meetings = await (await res).json()

      commit('SET_PROJECT_MEETINGS', meetings.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_PROJECT_MEETINGS: (state, meetings) => (state.meetings = meetings),
  SET_PROJECT_MEETINGS: (state, meetings) => (state.meetings = meetings)
}

export default {
  state,
  getters,
  actions,
  mutations
}
