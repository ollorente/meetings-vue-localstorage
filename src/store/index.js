import Vue from 'vue'
import Vuex from 'vuex'
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
  mutations: {},
  actions: {},
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
