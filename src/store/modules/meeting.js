import { db, DB } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

const state = {
  meeting: '',
  meetings: []
}

const getters = {
  getAllMeetings: state => state.meetings,
  getMeeting: state => state.meeting,
  getMeetings: state => state.meetings
}

const actions = {
  async addMeeting ({ commit }, data) {
    try {
      const res = await fetch(`${db}/projects/${data.project}/meetings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      })

      const meeting = await res.json()

      commit('SET_MEETING', meeting.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchMeeting ({ commit }, id) {
    try {
      const res = await fetch(`${db}/meetings/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const Data = await res.json()

      const meeting = {
        _id: await Data.data._id,
        name: await Data.data.name,
        description: await Data.data.description,
        project: await Data.data.project,
        projectId: await Data.data.project._id,
        projectName: await Data.data.project.name,
        dateEnd: await Data.data.dateEnd,
        dateInt: await Data.data.dateInt,
        _collaborators: await Data.data._collaborators,
        _collaboratorsCount: await Data.data._collaboratorsCount,
        _tasks: await Data.data._tasks,
        _tasksCount: await Data.data._tasksCount,
        isActive: await Data.data.isActive,
        isLock: await Data.data.isLock,
        createdAt: await Data.data.createdAt,
        updatedAt: await Data.data.updatedAt
      }

      commit('SET_MEETING', meeting)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchMeetings ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const res = await fetch(`${db}/meetings?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const meetings = await res.json()

      commit('SET_MEETINGS', meetings.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllMeetings ({ commit }) {
    try {
      const res = await fetch(`${DB}/users/all-meetings`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const meetings = await res.json()

      commit('SET_MEETINGS', meetings.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async updateMeeting ({ commit }, data) {
    try {
      const res = await fetch(`${db}/meetings/${data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      })

      const meeting = await res.json()

      commit('SET_MEETING', meeting.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deleteMeeting ({ commit }, id) {
    try {
      const res = await fetch(`${db}/meetings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const meeting = await res.json()

      commit('SET_MEETING', meeting.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_MEETINGS: (state, meetings) => (state.meetings = meetings),
  SET_MEETING: (state, meeting) => (state.meeting = meeting),
  SET_MEETINGS: (state, meetings) => (state.meetings = meetings)
}

export default {
  state,
  getters,
  actions,
  mutations
}
