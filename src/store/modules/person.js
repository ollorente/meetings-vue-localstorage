import {
  db, dbName
} from '@/main'

const state = {
  person: '',
  people: []
}

const getters = {
  getAllPeople: state => state.people,
  getPerson: state => state.person,
  getPeople: state => state.people
}

const actions = {
  async addPerson ({ commit }, data) {
    try {
      const date = Date.now()

      const person = {
        id: date,
        name: await data.name.trim(),
        email: await data.email.trim(),
        photoURL: '',
        role: data.role ? await data.role.trim() : '',
        phone: '',
        isActive: true,
        isLock: false,
        createdAt: date,
        updatedAt: date
      }

      db.people[person.id] = person

      localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_PERSON', person)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchPerson ({ commit }, id) {
    try {
      const person = await db.people[id]

      commit('SET_PERSON', person)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchPeople ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const people = Object.values(db.people)
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
            email: e.email,
            photoURL: e.photoURL,
            isActive: e.isActive
          }
        })

      commit('SET_PEOPLE', people)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllPeople ({ commit }) {
    try {
      const people = Object.values(db.people)
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
            email: e.email,
            photoURL: e.photoURL,
            isActive: e.isActive
          }
        })

      commit('SET_PEOPLE', people)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async updatePerson ({ commit }, data) {
    try {
      const person = {
        id: await data.id,
        name: await data.name.trim(),
        email: await data.email.trim(),
        photoURL: data.photoURL ? await data.photoURL.trim() : '',
        role: data.role ? await data.role.trim() : '',
        phone: data.phone ? await data.phone.trim() : '',
        isActive: await data.isActive,
        isLock: await data.isLock,
        createdAt: await data.createdAt,
        updatedAt: Date.now()
      }

      const personId = person.id

      db.people[personId] = person

      // ------- Actualizando usuario en proyectos -------
      const projects = Object.values(db.projects)

      for (let i = 0; i < projects.length; i++) {
        const projectId = await projects[i].id
        const project = await db.projectPeople[projectId][personId]

        if (project) {
          db.projectPeople[projectId][personId] = {
            id: await person.d,
            name: await person.name,
            email: await person.email,
            photoURL: await person.photoURL,
            isActive: await person.isActive,
            isLock: await person.isLock
          }
        }
      }
      // ---X--- Actualizando usuario en proyectos ---X---

      // ------- Actualizando usuario en reuniones -------
      const meetings = Object.values(db.meetings)

      for (let i = 0; i < meetings.length; i++) {
        const meetingId = await meetings[i].id
        const meeting = await db.meetingPeople[meetingId][personId]

        if (meeting) {
          db.meetingPeople[meetingId][personId] = {
            id: await person.d,
            name: await person.name,
            email: await person.email,
            photoURL: await person.photoURL,
            isActive: await person.isActive,
            isLock: await person.isLock
          }
        }
      }
      // ---X--- Actualizando usuario en reuniones ---X---

      // ------- Actualizando usuario en tareas -------
      const tasks = Object.values(db.tasks)
      console.log('tasks->', tasks)

      for (let i = 0; i < tasks.length; i++) {
        const taskId = await tasks[i].id
        console.log('taskId->', taskId)
        const task = await db.taskPeople[taskId][personId]
        console.log('task->', task)

        if (task) {
          db.taskPeople[taskId][personId] = {
            id: await person.d,
            name: await person.name,
            email: await person.email,
            photoURL: await person.photoURL,
            isActive: await person.isActive,
            isLock: await person.isLock
          }
        }
      }
      // ---X--- Actualizando usuario en tareas ---X---

      localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_PERSON', person)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deletePerson ({ commit }, id) {
    try {
      // ------- Eliminando usuario de proyectos -------
      console.log('ID->', id)
      // const project = Object.values(db.peopleProjects[id])
      // console.log('project->', project)

      // for (let i = 0; i < project.length; i++) {
      //   const person = await db.projectPeople[project[i]]

      //   if (person) {
      //     delete db.projectPeople[project[i]][id]
      //   }
      // }
      // ---X--- Eliminando usuario de proyectos ---X---

      // ------- Eliminando usuario y referencias -------
      // delete db.people[id]
      // delete db.peopleMeetings[id]
      // delete db.peopleTasks[id]
      // ---X--- Eliminando usuario y referencias ---X---

      // localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_PERSON', true)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_PEOPLE: (state, people) => (state.people = people),
  SET_PERSON: (state, person) => (state.person = person),
  SET_PEOPLE: (state, people) => (state.people = people)
}

export default {
  state,
  getters,
  actions,
  mutations
}
