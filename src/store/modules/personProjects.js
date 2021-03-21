import { db, dbName } from "@/main";

const state = {
  personProjects: [],
};

const getters = {
  getPersonProjects: (state) => state.personProjects,
};

const actions = {
  async addPersonProject({ commit }, data) {
    try {
      const collaborators = await data.collaborators;

      if (collaborators.length > 0) {
        await collaborators.forEach(async (e) => {
          const person = await db.peopleProjects[e];

          if (!person) {
            db.peopleProjects[e] = {};
          }

          db.peopleProjects[e][data.id] = {
            id: data.id,
            name: data.name,
            isActive: data.isActive,
            isLock: data.isLock,
          };
        });
      }

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PERSON_PROJECT", true);
    } catch (error) {
      if (error) {
        return;
      }
    }
  },
  async removePersonProject({ commit }, id) {
    delete db.peopleProjects[id];

    localStorage.setItem(dbName, JSON.stringify(db));

    commit("REMOVE_PERSON_PROJECT", true);
  },
};

const mutations = {
  SET_PERSON_PROJECT: (state, person) => (state.personProjects = person),
  REMOVE_PERSON_PROJECT: (state, person) => (state.personProjects = person),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
