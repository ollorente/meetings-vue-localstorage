import {
  db
} from '@/main'

const state = {
  task: '',
  tasks: []
}

const getters = {
  getAllTasks: state => state.tasks,
  getTask: state => state.task,
  getTasks: state => state.tasks
}

const actions = {
  async fetchTask ({ commit }, id) {
    try {
      const task = await db.tasks[id]

      commit('SET_TASK', task)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchTasks ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const tasks = Object.values(db.tasks)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
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

      commit('SET_TASKS', tasks)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllTasks ({ commit }) {
    try {
      const tasks = Object.values(db.tasks)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
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

      commit('SET_TASKS', tasks)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_TASKS: (state, tasks) => (state.tasks = tasks),
  SET_TASK: (state, task) => (state.task = task),
  SET_TASKS: (state, tasks) => (state.tasks = tasks)
}

export default {
  state,
  getters,
  actions,
  mutations
}
