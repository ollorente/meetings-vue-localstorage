import {
  db
} from '@/main'

const state = {
  tasks: []
}

const getters = {
  getAllProjectTasks: state => state.tasks,
  getProjectTasks: state => state.tasks
}

const actions = {
  async fetchProjectTasks ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const tasks = Object.values(db.projectTasks[data.id])
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
            projectId: e.projectId,
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_PROJECT_TASKS', tasks)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllProjectTasks ({ commit }, id) {
    try {
      const tasks = Object.values(db.projectTasks[id])
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
            projectId: e.projectId,
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_PROJECT_TASKS', tasks)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_PROJECT_TASKS: (state, tasks) => (state.tasks = tasks),
  SET_PROJECT_TASKS: (state, tasks) => (state.tasks = tasks)
}

export default {
  state,
  getters,
  actions,
  mutations
}
