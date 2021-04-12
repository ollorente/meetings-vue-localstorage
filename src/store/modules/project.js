import {
  db,
  dbName
} from '@/main'

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
  async addProject ({ commit }, data) {
    try {
      const date = Date.now()

      const project = {
        id: date,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        isActive: true,
        isLock: false,
        createdAt: date,
        updatedAt: date
      }

      db.projects[project.id] = project

      // ------- Creando usuarios por proyecto -------
      const peopleProject = await db.projectPeople[project.id]

      if (!peopleProject) {
        db.projectPeople[project.id] = {}
      }

      const collaborators = await project.collaborators

      for (let i = 0; i < collaborators.length; i++) {
        const person = await db.people[collaborators[i]]

        if (person) {
          db.projectPeople[project.id][person.id] = {
            id: await person.id,
            name: await person.name,
            email: await person.email,
            photoURL: await person.photoURL,
            isActive: await person.isActive,
            isLock: await person.isLock
          }

          // ------- agreegando proyecto al usuario -------
          const projectPeople = await db.peopleProjects[person.id]

          if (!projectPeople) {
            db.peopleProjects[person.id] = {}
          }

          db.peopleProjects[person.id][project.id] = {
            id: project.id,
            name: await project.name,
            isActive: project.isActive,
            isLock: project.isLock
          }
          // ---X--- agreegando proyecto al usuario ---X---
        }
      }
      // ---X--- Creando usuarios por proyecto ---X---

      localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_PROJECT', project)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchProject ({ commit }, id) {
    try {
      const project = await db.projects[id]

      commit('SET_PROJECT', project)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchProjects ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const projects = Object.values(db.projects)
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

      commit('SET_PROJECTS', projects)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllProjects ({ commit }) {
    try {
      const projects = Object.values(db.projects)
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

      commit('SET_PROJECTS', projects)
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
