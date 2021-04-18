import {
  db,
  dbName
} from '@/main'

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
      const res = await fetch(`${db}/projects/all`, {
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

  async updateProject ({ commit }, data) {
    try {
      const project = {
        id: await data.id,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        isActive: await data.isActive,
        isLock: await data.isLock,
        createdAt: await data.createdAt,
        updatedAt: Date.now()
      }

      const projectId = await project.id

      db.projects[projectId] = project

      // ------- Borrando usuarios del proyecto -------
      delete db.projectPeople[projectId]
      // ---X--- Borrando usuarios del proyecto ---X---

      // ------- Borrando proyecto del usuarios -------
      const people = Object.values(db.people)

      for (let i = 0; i < people.length; i++) {
        delete db.peopleProjects[people[i].id][projectId]
      }
      // ---X--- Borrando proyecto del usuarios ---X---

      // ------- Actualizando usuarios por proyecto -------
      const peopleProject = await db.projectPeople[projectId]

      if (!peopleProject) {
        db.projectPeople[project.id] = {}
      }

      const collaborators = await project.collaborators

      for (let i = 0; i < collaborators.length; i++) {
        const person = await db.people[collaborators[i]]

        if (person) {
          db.projectPeople[projectId][person.id] = {
            id: await person.id,
            name: await person.name,
            email: await person.email,
            photoURL: await person.photoURL,
            isActive: await person.isActive,
            isLock: await person.isLock
          }

          // ------- Actualizando proyecto al usuario -------
          const projectPeople = await db.peopleProjects[person.id]

          if (!projectPeople) {
            db.peopleProjects[person.id] = {}
          }

          db.peopleProjects[person.id][projectId] = {
            id: await project.id,
            name: await await project.name,
            isActive: await project.isActive,
            isLock: await project.isLock
          }
          // ---X--- Actualizando proyecto al usuario ---X---
        }
      }
      // ---X--- Actualizando usuarios por proyecto ---X---

      localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_PROJECT', project)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deleteProject ({ commit }, id) {
    try {
      const project = await db.projects[id]

      // ------- Eliminando proyecto de los usuarios -------
      const collaborators = project.collaborators

      for (let i = 0; i < collaborators.length; i++) {
        const person = await db.peopleProjects[collaborators[i]]

        if (person) {
          delete db.peopleProjects[collaborators[i]][project.id]
        }
      }
      // ---X--- Eliminando proyecto de los usuarios ---X---

      // ------- Eliminando proyecto y referencias -------
      delete db.projects[project.id]
      delete db.projectPeople[project.id]
      delete db.projectMeetings[project.id]
      delete db.projectTasks[project.id]
      // ---X--- Eliminando proyecto y referencias ---X---

      localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_PROJECT', true)
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
