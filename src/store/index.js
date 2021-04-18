import Vue from 'vue'
import Vuex from 'vuex'
import { DB } from '@/main'
import meeting from './modules/meeting'
import meetingPeople from './modules/meetingPeople'
import meetingTasks from './modules/meetingTasks'
import peopleMeetings from './modules/peopleMeetings'
import peopleProjects from './modules/peopleProjects'
import peopleTasks from './modules/peopleTasks'
import person from './modules/person'
import project from './modules/project'
import projectMeetings from './modules/projectMeetings'
import projectPeople from './modules/projectPeople'
import projectTasks from './modules/projectTasks'
import task from './modules/task'
import taskPeople from './modules/taskPeople'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null
  },
  getters: {},
  mutations: {
    SET_TOKEN: (state, payload) => (state.token = payload)
  },
  actions: {
    async auth ({ commit }, payload) {
      try {
        const res = await fetch(`${DB}/users/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        const user = await res.json()

        localStorage.setItem('token', user.jwt)
        localStorage.setItem('currentUser', JSON.stringify(user.data))

        commit('SET_TOKEN', user.data.token)
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },

    async fetchToken ({ commit }) {
      if (localStorage.getItem('token')) {
        commit('SET_TOKEN', localStorage.getItem('token'))
      } else {
        commit('SET_TOKEN', null)
      }
    },

    async logout ({ commit }) {
      commit('SET_TOKEN', null)
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
    }
  },
  modules: {
    meeting,
    meetingPeople,
    meetingTasks,
    peopleMeetings,
    peopleProjects,
    peopleTasks,
    person,
    project,
    projectMeetings,
    projectPeople,
    projectTasks,
    task,
    taskPeople,
    user
  }
})
