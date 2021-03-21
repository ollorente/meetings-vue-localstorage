import Vue from "vue";
import Vuex from "vuex";
import personProjects from "./modules/personProjects";
import project from "./modules/project";
import projectPeople from "./modules/projectPeople";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    personProjects,
    project,
    projectPeople,
    user,
  },
});
