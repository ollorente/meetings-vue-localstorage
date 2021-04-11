import {
  db
} from '@/main'

const state = {
  tasks: []
}

const getters = {
  getAllMeetingTasks: state => state.tasks,
  getMeetingTasks: state => state.tasks
}

const actions = {
  async fetchMeetingTasks ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const tasks = Object.values(db.meetingTasks[data.id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.id > b.id) {
            return 1
          }
          if (a.id < b.id) {
            return -1
          }
          return 0
        })
        .splice(page, limit)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            project: e.project,
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_MEETING_TASKS', tasks)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllMeetingTasks ({ commit }, id) {
    try {
      const tasks = Object.values(db.meetingTasks[id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.id > b.id) {
            return 1
          }
          if (a.id < b.id) {
            return -1
          }
          return 0
        })
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            project: e.project,
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_MEETING_TASKS', tasks)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_MEETING_TASKS: (state, tasks) => (state.tasks = tasks),
  SET_MEETING_TASKS: (state, tasks) => (state.tasks = tasks)
}

export default {
  state,
  getters,
  actions,
  mutations
}
