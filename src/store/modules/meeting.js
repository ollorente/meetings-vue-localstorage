import {
  db
} from '@/main'

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
  async fetchMeeting ({ commit }, id) {
    try {
      const meeting = await db.meetings[id]

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

      const meetings = Object.values(db.meetings)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.dateInt > b.dateInt) {
            return 1
          }
          if (a.dateInt < b.dateInt) {
            return -1
          }
          return 0
        })
        .splice(page, limit)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            dateEnd: e.dateEnd,
            dateInt: e.dateInt,
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_MEETINGS', meetings)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllMeetings ({ commit }) {
    try {
      const meetings = Object.values(db.meetings)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.dateInt > b.dateInt) {
            return 1
          }
          if (a.dateInt < b.dateInt) {
            return -1
          }
          return 0
        })
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            dateEnd: e.dateEnd,
            dateInt: e.dateInt,
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_MEETINGS', meetings)
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
