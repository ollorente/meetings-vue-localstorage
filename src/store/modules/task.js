import { db } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

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
  async addTask ({ commit }, data) {
    try {
      const res = await fetch(`${db}/meetings/${data.meeting}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      })

      const task = await res.json()

      commit('SET_TASK', task.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchTask ({ commit }, id) {
    try {
      const res = await fetch(`${db}/tasks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const info = await res.json()

      const task = {
        _id: await info.data._id,
        _collaborators: await info.data._collaborators,
        _collaboratorsCount: await info.data._collaboratorsCount,
        isActive: await info.data.isActive,
        isLock: await info.data.isLock,
        name: await info.data.name,
        description: await info.data.description,
        meetingId: await info.data.meeting._id,
        meetingName: await info.data.meeting.name,
        meetingDateEnd: await info.data.meeting.dateEnd,
        meetingDateInt: await info.data.meeting.dateInt,
        projectId: await info.data.project._id,
        projectName: await info.data.project.name,
        createdAt: await info.data.createdAt,
        updatedAt: await info.data.updatedAt
      }

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

      const res = await fetch(`${db}/tasks?limit?${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const tasks = await res.json()

      commit('SET_TASKS', tasks.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllTasks ({ commit }) {
    try {
      const res = await fetch(`${db}/all-tasks`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const tasks = await res.json()

      commit('SET_TASKS', tasks.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async updateTask ({ commit }, data) {
    try {
      const res = await fetch(`${db}/tasks/${data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      })

      const task = await res.json()

      commit('SET_TASK', task.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deleteTask ({ commit }, id) {
    try {
      const res = await fetch(`${db}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const task = await res.json()

      commit('SET_TASK', task.data)
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
