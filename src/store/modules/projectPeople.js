import { db, dbName } from "@/main";

const state = {
  projectsPeople: [],
};

const getters = {
  getProjectsPeople: (state) => state.projectsPeople,
};

const actions = {
  async addProjectsPeople({ commit }, data) {
    try {
      const projectData = await db.projectPeople[data.id];
      const collaborators = await data.collaborators;

      if (!projectData) {
        db.projectPeople[data.id] = {};
      }

      await collaborators.forEach(async (e) => {
        const person = await db.people[e];

        db.projectPeople[data.id][person.id] = {
          id: person.id,
          name: person.name,
          email: person.email,
          isActive: person.isActive,
          isLock: person.isLock,
        };
      });

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PROJECT_PERSON", true);
    } catch (error) {
      if (error) {
        return;
      }
    }
  },
};

const mutations = {
  SET_PROJECT_PERSON: (state, project) => (state.projectsPeople = project),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
