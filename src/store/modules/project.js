import { db, dbName } from "@/main";

const state = {
  project: "",
  projects: [],
};

const getters = {
  getProject: (state) => state.project,
  getProjects: (state) => state.projects,
};

const actions = {
  async addProject({ commit }, data) {
    try {
      const date = Date.now();

      const project = {
        id: date,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        isActive: true,
        isLock: false,
        createdAt: date,
        updatedAt: date,
      };

      db.projects[project.id] = project;

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PROJECT", project);
    } catch (error) {
      if (error) {
        return;
      }
    }
  },
  async getProject({ commit }, id) {
    try {
      const project = db.projects[id];

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PROJECT", project);
    } catch (error) {
      if (error) {
        return;
      }
    }
  },
  async getProjects({ commit }) {
    try {
      const projects = Object.values(db.projects);

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PROJECTS", projects);
    } catch (error) {
      if (error) {
        return;
      }
    }
  },
  async removeProject({ commit }, id) {
    delete db.projects[id];

    localStorage.setItem(dbName, JSON.stringify(db));

    commit("SET_PROJECT", true);
  },
};

const mutations = {
  SET_PROJECT: (state, project) => (state.project = project),
  SET_PROJECTS: (state, projects) => (state.projects = projects),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
