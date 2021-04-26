import { db } from '@/main'

const token = 'Beaer ' + localStorage.getItem('token')

const state = {
  projects: []
}

const getters = {
  getAllPeopleProjects: state => state.projects,
  getPeopleProjects: state => state.projects
}

const actions = {
  async fetchPeopleProjects ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const res = fetch(`${db}/people/${data._id}/projects?limit=${limit}&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const projects = await (await res).json()

      commit('SET_PEOPLE_PROJECTS', projects.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllPeopleProjects ({ commit }, id) {
    try {
      const res = fetch(`${db}/people/${id}/all-projects`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })

      const projects = await (await res).json()

      commit('SET_PEOPLE_PROJECTS', projects.data)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_PEOPLE_PROJECTS: (state, projects) => (state.projects = projects),
  SET_PEOPLE_PROJECTS: (state, projects) => (state.projects = projects)
}

export default {
  state,
  getters,
  actions,
  mutations
}
