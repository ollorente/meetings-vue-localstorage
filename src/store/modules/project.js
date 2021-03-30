import { db, dbName } from "@/main";

const state = {
  project: "",
  projects: [],
};

const getters = {
  getAllProjects: (state) => state.projects,
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

      const colllaborators = await project.collaborators;

      // ------- Usuarios por projecto -------
      for (let i = 0; i < colllaborators.length; i++) {
        const peopleProject = await db.projectPeople[project.id];

        if (!peopleProject) {
          db.projectPeople[project.id] = {};
        }

        const person = await db.people[colllaborators[i]];

        if (person) {
          db.projectPeople[project.id][person.id] = {
            id: person.id,
            name: person.name,
            email: person.email,
            isActive: person.isActive,
            isLock: person.isLock,
          };
        }
      }
      // ---X--- Usuarios por projecto ---X---

      // ------- Agregar a projectos por usuario -------
      for (let i = 0; i < colllaborators.length; i++) {
        const personProjects = await db.peopleProjects[colllaborators[i]];

        if (!personProjects) {
          db.peopleProjects[colllaborators[i]] = {};
        }

        db.peopleProjects[colllaborators[i]][project.id] = {
          id: project.id,
          name: await project.name,
          isActive: project.isActive,
          isLock: project.isLock,
        };
      }
      // ---X--- Agregar a projectos por usuario ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PROJECT", project);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchProject({ commit }, id) {
    try {
      const project = db.projects[id];

      commit("SET_PROJECT", project);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchProjects({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const projects = Object.values(db.projects)
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

      commit("SET_PROJECTS", projects);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllProjects({ commit }) {
    try {
      const projects = Object.values(db.projects)
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

      commit("SET_ALL_PROJECTS", projects);
    } catch (error) {
      if (error) return;
    }
  },

  async updateProject({ commit }, data) {
    try {
      const date = Date.now();

      const project = {
        id: await data.id,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        isActive: await data.isActive,
        isLock: await data.isLock,
        createdAt: await data.createdAt,
        updatedAt: date,
      };

      db.projects[project.id] = project;

      const collaborators = await project.collaborators;

      // ------- Editar usuarios por proyecto -------
      delete db.projectPeople[project.id];

      for (let i = 0; i < collaborators.length; i++) {
        const peopleProject = await db.projectPeople[project.id];

        if (!peopleProject) {
          db.projectPeople[project.id] = {};
        }

        const person = await db.people[collaborators[i]];

        if (person) {
          db.projectPeople[project.id][person.id] = {
            id: person.id,
            name: person.name,
            email: person.email,
            isActive: person.isActive,
            isLock: person.isLock,
          };
        }
      }
      // ---X--- Editar usuarios por proyecto ---X---

      // ------- Editar proyectos por usuario -------
      // ------- Borrar proyecto del usuario -------
      const users = Object.values(db.people);

      users.forEach(async (user) => {
        const u = await db.peopleProjects[user.id];

        if (u) {
          delete db.peopleProjects[user.id][project.id];
        }
      });
      // ---X--- Borrar proyecto del usuario ---X---

      for (let i = 0; i < collaborators.length; i++) {
        const personProjects = await db.peopleProjects[collaborators[i]];

        if (!personProjects) {
          db.peopleProjects[collaborators[i]] = {};
        }

        db.peopleProjects[collaborators[i]][project.id] = {
          id: project.id,
          name: await project.name,
          isActive: project.isActive,
          isLock: project.isLock,
        };
      }
      // ---X--- Editar proyectos por usuario ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PROJECT", project);
    } catch (error) {
      if (error) return;
    }
  },

  async removeProject({ commit }, id) {
    // ------- Eliminar proyecto por usuarios -------
    const Users = Object.values(db.people);

    Users.forEach(async (user) => {
      const t = Object.values(db.peopleProjects[user.id]);

      if (t) {
        delete db.peopleProjects[user.id][id];
      }
    });
    // ---X--- Eliminar proyecto por usuarios ---X---

    // ------- Eliminar proyecto y referencias -------
    delete db.projectMeetings[id];
    delete db.projectPeople[id];
    delete db.projectTasks[id];
    delete db.projects[id];
    // ---X--- Eliminar proyecto y referencias ---X---

    localStorage.setItem(dbName, JSON.stringify(db));

    commit("SET_PROJECT", true);
  },
};

const mutations = {
  SET_ALL_PROJECTS: (state, projects) => (state.projects = projects),
  SET_PROJECT: (state, project) => (state.project = project),
  SET_PROJECTS: (state, projects) => (state.projects = projects),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
