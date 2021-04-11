import {
  db,
  dbName
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
  async addTask ({ commit }, data) {
    try {
      const date = Date.now()

      const task = {
        id: date,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        project: await data.project,
        meeting: await data.meeting,
        isActive: true,
        isLock: false,
        createdAt: date,
        updatedAt: date
      }

      db.tasks[task.id] = task

      // ------- Agregando tarea a reunión -------
      const taskMeeting = await db.meetingTasks[task.meeting]

      if (!taskMeeting) {
        db.meetingTasks[task.meeting] = {}
      }

      db.meetingTasks[task.meeting][task.id] = {
        id: task.id,
        name: task.name,
        project: task.project,
        isActive: task.isActive,
        isLock: task.isLock
      }
      // ---X--- Agregando tarea a reunión ---X---

      // ------- Agregando usuarios a tarea -------
      const collaborators = task.collaborators

      for (let i = 0; i < collaborators.length; i++) {
        const person = await db.people[collaborators[i]]

        if (person) {
          const personTask = await db.taskPeople[task.id]

          if (!personTask) {
            db.taskPeople[task.id] = {}
          }

          db.taskPeople[task.id][person.id] = {
            id: person.id,
            name: person.name,
            email: person.email,
            photoURL: person.photoURL,
            isActive: person.isActive,
            isLock: person.isLock
          }

          // ------- Agregando tarea a usuario -------
          const taskpPerson = await db.peopleTasks[person.id]

          if (!taskpPerson) {
            db.peopleTasks[person.id] = {}
          }

          db.peopleTasks[person.id][task.id] = {
            id: task.id,
            name: task.name,
            project: task.project,
            isActive: task.isActive,
            isLock: task.isLock
          }
          // ---X--- Agregando tarea a usuarios ---X---
        }
      }
      // ---X--- Agregando usuarios a tarea ---X---

      // ------- Agregando tarea a proyecto -------
      const project = await db.projectTasks[task.project]

      if (!project) {
        db.projectTasks[task.project] = {}
      }

      db.projectTasks[task.project][task.id] = {
        id: task.id,
        name: task.name,
        project: task.project,
        isActive: task.isActive,
        isLock: task.isLock
      }
      // ---X--- Agregando tarea a proyecto ---X---

      localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_TASK', task)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

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

      commit('SET_TASKS', tasks)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deleteTask ({ commit }, id) {
    try {
      // ------- Eliminando tarea de reuniones -------
      const tasksMeeting = Object.values(db.meetingTasks)

      for (let i = 0; i < tasksMeeting.length; i++) {
        console.log('tasksMeeting->', tasksMeeting)
        console.log('tasksMeeting[i]->', tasksMeeting[i])
      }
      // ---X--- Eliminando tarea de reuniones ---X---

      // delete db.tasks[id]

      // localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_TASK', true)
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
