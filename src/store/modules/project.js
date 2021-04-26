import { db, DB } from '@/main'

const token = 'Bearer ' + localStorage.getItem('token')

const state = {
  project: '',
  projects: []
}

const getters = {
  getAllProjects: state => state.projects,
  getProject: state => state.project,
  getProjects: state => state.projects
}

const actions = {
  async addProject ({ commit }, payload) {
    try {
      const res = await fetch(`${db}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(payload)
      })

      const project = await res.json()

      commit('SET_PROJECT', project)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchProject ({ commit }, id) {
    try {
      const res = await fetch(`${db}/projects/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const project = await res.json()

      commit('SET_PROJECT', project.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchProjects ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 1

      const res = await fetch(`${db}/projects?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const projects = await res.json()

      commit('SET_PROJECTS', projects.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllProjects ({ commit }) {
    try {
      const res = await fetch(`${DB}/users/all-projects`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const projects = await res.json()

      commit('SET_PROJECTS', projects.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async updateProject ({ commit }, payload) {
    try {
      const res = await fetch(`${db}/projects/${payload._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(payload)
      })

      const project = await res.json()

      commit('SET_PROJECT', project)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deleteProject ({ commit }, id) {
    try {
      const res = await fetch(`${db}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const project = await res.json()

      commit('SET_PROJECT', project)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_PROJECTS: (state, projects) => (state.projects = projects),
  SET_PROJECT: (state, project) => (state.project = project),
  SET_PROJECTS: (state, projects) => (state.projects = projects)
}

export default {
  state,
  getters,
  actions,
  mutations
}
