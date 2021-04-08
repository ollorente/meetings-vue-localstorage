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

  async deletePerson ({ commit }, id) {
    try {
      // ------- Eliminando usuario -------
      delete db.people[id]
      // ---X--- Eliminando usuario ---X---

      localStorage.setItem(dbName, JSON.stringify(db))

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
