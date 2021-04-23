import {
  db
} from '@/main'

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

      const projects = Object.values(db.peopleProjects[data.id])
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
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_PEOPLE_PROJECTS', projects)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllPeopleProjects ({ commit }, id) {
    try {
      const projects = Object.values(db.peopleProjects[id])
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
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_PEOPLE_PROJECTS', projects)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deletePeopleProjects ({ commit }, id) {
    try {
      // ------- Eliminando usuario -------
      delete db.peopleProjects[id]
      // ---X--- Eliminando usuario ---X---

      // localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_PEOPLE_PROJECTS', true)
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
