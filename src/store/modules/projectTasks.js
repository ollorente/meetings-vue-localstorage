import { db } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

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

      const res = fetch(`${db}/projects/${data._id}/tasks?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const tasks = await (await res).json()

      commit('SET_PROJECT_TASKS', tasks.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllProjectTasks ({ commit }, id) {
    try {
      const res = fetch(`${db}/projects/${id}/all-tasks`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const tasks = await (await res).json()

      commit('SET_PROJECT_TASKS', tasks.data)
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
