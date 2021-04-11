import {
  db,
  dbName
} from '@/main'

const state = {
  meetings: []
}

const getters = {
  getAllPeopleMeetings: state => state.meetings,
  getPeopleMeetings: state => state.meetings
}

const actions = {
  async fetchPeopleMeetings ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const meetings = Object.values(db.peopleMeetings[data.id])
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

      commit('SET_PEOPLE_MEETINGS', meetings)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllPeopleMeetings ({ commit }, id) {
    try {
      const meetings = Object.values(db.peopleMeetings[id])
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

      commit('SET_PEOPLE_MEETINGS', meetings)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deletePeopleMeetings ({ commit }, id) {
    try {
      // ------- Eliminando usuario -------
      delete db.peopleMeetings[id]
      // ---X--- Eliminando usuario ---X---

      localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_PEOPLE_MEETINGS', true)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_PEOPLE_MEETINGS: (state, meetings) => (state.meetings = meetings),
  SET_PEOPLE_MEETINGS: (state, meetings) => (state.meetings = meetings)
}

export default {
  state,
  getters,
  actions,
  mutations
}
