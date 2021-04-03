import Vue from "vue";
import Vuex from "vuex";
import meeting from "./modules/meeting";
import meetingPeople from "./modules/meetingPeople";
import meetingTasks from "./modules/meetingTasks";
import person from "./modules/person";
import personMeetings from "./modules/personMeetings";
import personProjects from "./modules/personProjects";
import personTasks from "./modules/personTasks";
import project from "./modules/project";
import projectMeetings from "./modules/projectMeetings";
import projectPeople from "./modules/projectPeople";
import projectTasks from "./modules/projectTasks";
import task from "./modules/task";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    meeting,
    meetingPeople,
    meetingTasks,
    person,
    personMeetings,
    personProjects,
    personTasks,
    project,
    projectPeople,
    projectMeetings,
    projectTasks,
    task,
  },
});
