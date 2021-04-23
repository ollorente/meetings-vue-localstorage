import {
  db
} from '@/main'

const state = {
  tasks: []
}

const getters = {
  getAllPersonTasks: state => state.tasks,
  getPersonTasks: state => state.tasks
}

const actions = {
  async fetchPersonTasks ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const tasks = Object.values(db.peopleTasks[data.id])
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

      commit('SET_PERSON_TASKS', tasks)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllPersonTasks ({ commit }, id) {
    try {
      const tasks = Object.values(db.peopleTasks[id])
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

      commit('SET_PERSON_TASKS', tasks)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deletePeopleTasks ({ commit }, id) {
    try {
      // ------- Eliminando usuario -------
      delete db.peopleTasks[id]
      // ---X--- Eliminando usuario ---X---

      // localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_PEOPLE_TASKS', true)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_PERSON_TASKS: (state, tasks) => (state.tasks = tasks),
  SET_PERSON_TASKS: (state, tasks) => (state.tasks = tasks)
}

export default {
  state,
  getters,
  actions,
  mutations
}
