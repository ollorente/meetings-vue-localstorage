import Vue from "vue";
import Vuex from "vuex";
import person from "./modules/person";
import personMeetings from "./modules/personMeetings";
import personProjects from "./modules/personProjects";
import personTasks from "./modules/personTasks";
import project from "./modules/project";
import projectMeetings from "./modules/projectMeetings";
import projectPeople from "./modules/projectPeople";
import projectTasks from "./modules/projectTasks";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    person,
    personMeetings,
    personProjects,
    personTasks,
    project,
    projectPeople,
    projectMeetings,
    projectTasks,
  },
});
