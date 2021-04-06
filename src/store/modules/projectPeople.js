import { db } from "@/main";

const state = {
  projectsPeople: [],
};

const getters = {
  getAllProjectPeople: (state) => state.projectsPeople,
  getProjectPeople: (state) => state.projectsPeople,
};

const actions = {
  async fetchProjectPeople({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const people = Object.values(db.projectPeople[data.id])
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
            email: e.email,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_PROJECT_PEEOPLE", people);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllProjectPeople({ commit }, id) {
    try {
      const people = Object.values(db.projectPeople[id])
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
            email: e.email,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_ALL_PROJECT_PEEOPLE", people);
    } catch (error) {
      if (error) return;
    }
  },

  async updateProjectPeople({ commit }, data) {
    try {
      delete db.projectPeople[data.id];
      const peopleProject = await db.projectPeople[data.id];

      if (!peopleProject) {
        db.projectPeople[data.id] = {};
      }

      const people = await data.collaborators;

      for (let i = 0; i < people.length; i++) {
        const person = await db.people[person[i]];

        db.projectPeople[data.id][person.id] = {
          id: person[i].id,
          name: person[i].name,
          email: person[i].email,
          isActive: person[i].isActive,
          isLock: person[i].isLock,
        };
      }

      commit("SET_UPDATE_PROJECT_PEOPLE", people);
    } catch (error) {
      if (error) return;
    }
  },
};

const mutations = {
  SET_ALL_PROJECT_PEEOPLE: (state, project) => (state.projectsPeople = project),
  SET_PROJECT_PEEOPLE: (state, project) => (state.projectsPeople = project),
  SET_UPDATE_PROJECT_PEOPLE: (state, project) =>
    (state.projectsPeople = project),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
