import {
  db,
  dbName
} from '@/main'

const state = {
  meeting: '',
  meetings: []
}

const getters = {
  getAllMeetings: state => state.meetings,
  getMeeting: state => state.meeting,
  getMeetings: state => state.meetings
}

const actions = {
  async addMeeting ({ commit }, data) {
    try {
      const date = Date.now()

      const meeting = {
        id: date,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        project: parseInt(data.project),
        dateInt: Date.parse(data.dateInt),
        dateEnd: Date.parse(data.dateEnd),
        isActive: true,
        isLock: false,
        createdAt: date,
        updatedAt: date
      }

      db.meetings[meeting.id] = meeting

      // ------- Agregar a reuniones por proyecto -------
      const meetingsProject = await db.projectMeetings[meeting.project]

      if (!meetingsProject) {
        db.projectMeetings[meeting.project] = {}
      }

      db.projectMeetings[meeting.project][meeting.id] = {
        id: meeting.id,
        name: await meeting.name,
        dateInt: meeting.dateInt,
        dateEnd: meeting.dateEnd,
        isActive: meeting.isActive,
        isLock: meeting.isLock
      }
      // ---X--- Agregar a reuniones por proyecto ---X---

      const collaborators = await meeting.collaborators

      // ------- Agregar a reuniones por usuario -------
      for (let i = 0; i < collaborators.length; i++) {
        const personMeetings = await db.peopleMeetings[collaborators[i]]

        if (!personMeetings) {
          db.peopleMeetings[collaborators[i]] = {}
        }

        db.peopleMeetings[collaborators[i]][meeting.id] = {
          id: meeting.id,
          name: await meeting.name,
          dateInt: meeting.dateInt,
          dateEnd: meeting.dateEnd,
          isActive: meeting.isActive,
          isLock: meeting.isLock
        }
      }
      // ---X--- Agregar a reuniones por usuario ---X---

      // ------- Usuarios por reunión -------
      for (let i = 0; i < collaborators.length; i++) {
        const peopleMeeting = await db.meetingPeople[meeting.id]

        if (!peopleMeeting) {
          db.meetingPeople[meeting.id] = {}
        }

        const person = await db.people[collaborators[i]]

        if (person) {
          db.meetingPeople[meeting.id][person.id] = {
            id: person.id,
            name: person.name,
            email: person.email,
            photoURL: person.photoURL,
            isActive: person.isActive,
            isLock: person.isLock
          }
        }
      }
      // ---X--- Usuarios por reunión ---X---

      localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_MEETING', meeting)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchMeeting ({ commit }, id) {
    try {
      const meeting = await db.meetings[id]

      commit('SET_MEETING', meeting)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchMeetings ({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20
      const page = (data.page - 1) * data.limit || 0

      const meetings = Object.values(db.meetings)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.dateInt > b.dateInt) {
            return 1
          }
          if (a.dateInt < b.dateInt) {
            return -1
          }
          return 0
        })
        .splice(page, limit)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            dateEnd: e.dateEnd,
            dateInt: e.dateInt,
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_MEETINGS', meetings)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async fetchAllMeetings ({ commit }) {
    try {
      const meetings = Object.values(db.meetings)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.dateInt > b.dateInt) {
            return 1
          }
          if (a.dateInt < b.dateInt) {
            return -1
          }
          return 0
        })
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            dateEnd: e.dateEnd,
            dateInt: e.dateInt,
            isActive: e.isActive,
            isLock: e.isLock
          }
        })

      commit('SET_MEETINGS', meetings)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async updateMeeting ({ commit }, data) {
    try {
      const meeting = {
        id: await data.id,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        project: parseInt(await data.project),
        dateInt: Date.parse(await data.dateInt),
        dateEnd: Date.parse(await data.dateEnd),
        isActive: await data.isActive,
        isLock: await data.isLock,
        createdAt: await data.createdAt,
        updatedAt: Date.now()
      }

      const meetingId = await meeting.id
      const projectId = meeting.project

      db.meetings[meetingId] = meeting

      // ------- Actualizando reunion en proyectos -------
      const meetingProject = await db.projectMeetings[projectId]

      if (!meetingProject) {
        db.projectMeetings[projectId] = {}
      }

      db.projectMeetings[projectId][meetingId] = {
        id: await meeting.id,
        name: await meeting.name,
        dateInt: meeting.dateInt,
        dateEnd: meeting.dateEnd,
        isActive: await meeting.isActive,
        isLock: await meeting.isLock
      }
      // ---X--- Actualizando reunion en proyectos ---X---

      // ------- Borrando reunión en usuarios del proyecto -------
      const peopleProject = Object.values(db.projectPeople[projectId])

      for (let i = 0; i < peopleProject.length; i++) {
        delete db.peopleMeetings[peopleProject[i].id][meetingId]
      }
      // ---X--- Borrando reunión en usuarios del proyecto ---X---

      const collaborators = await meeting.collaborators

      // ------- Actualizando reunión por usuario -------
      for (let i = 0; i < collaborators.length; i++) {
        const personMeetings = await db.peopleMeetings[collaborators[i]]

        if (!personMeetings) {
          db.peopleMeetings[collaborators[i]] = {}
        }

        db.peopleMeetings[collaborators[i]][meetingId] = {
          id: await meeting.id,
          name: await meeting.name,
          dateInt: meeting.dateInt,
          dateEnd: meeting.dateEnd,
          isActive: await meeting.isActive,
          isLock: await meeting.isLock
        }
      }
      // ---X--- Actualizando reunión por usuario ---X---

      delete db.meetingPeople[meetingId]

      // ------- Usuarios por reunión -------
      for (let i = 0; i < collaborators.length; i++) {
        const peopleMeeting = await db.meetingPeople[meetingId]

        if (!peopleMeeting) {
          db.meetingPeople[meetingId] = {}
        }

        const person = await db.people[collaborators[i]]

        if (person) {
          db.meetingPeople[meetingId][person.id] = {
            id: await person.id,
            name: await person.name,
            email: await person.email,
            photoURL: await person.photoURL,
            isActive: await person.isActive,
            isLock: await person.isLock
          }
        }
      }
      // ---X--- Usuarios por reunión ---X---

      localStorage.setItem(dbName, JSON.stringify(db))

      commit('SET_MEETING', meeting)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  },

  async deleteMeetings ({ commit }, id) {
    try {
      console.log('Meeting ID->', id)

      commit('SET_MEETINGS', true)
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      if (error) return
    }
  }
}

const mutations = {
  SET_ALL_MEETINGS: (state, meetings) => (state.meetings = meetings),
  SET_MEETING: (state, meeting) => (state.meeting = meeting),
  SET_MEETINGS: (state, meetings) => (state.meetings = meetings)
}

export default {
  state,
  getters,
  actions,
  mutations
}
