import { db, dbName } from "@/main";

const state = {
  personProjects: [],
};

const getters = {
  getPersonProjects: (state) => state.personProjects,
  getAllPersonProjects: (state) => state.personProjects,
};

const actions = {
  async fetchPersonProjects({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const projects = Object.values(db.peopleProjects[data.id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        .splice(page, limit)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_PERSON_PROJECTS", projects);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllPersonProjects({ commit }, id) {
    try {
      const projects = Object.values(db.peopleProjects[id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_PERSON_PROJECTS", projects);
    } catch (error) {
      if (error) return;
    }
  },

  async removePersonProject({ commit }, id) {
    delete db.peopleProjects[id];

    localStorage.setItem(dbName, JSON.stringify(db));

    commit("REMOVE_PERSON_PROJECT", true);
  },
};

const mutations = {
  SET_PERSON_PROJECTS: (state, projects) => (state.personProjects = projects),
  SET_ALL_PERSON_PROJECTS: (state, projects) =>
    (state.personProjects = projects),
  REMOVE_PERSON_PROJECT: (state, project) => (state.personProjects = project),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
