<template>
  <div class="edit-project">
    <h1 style="margin: 0">Editar "{{ project.name }}"</h1>
    <p>
      <a href="#" @click="deleteProject" class="link">Eliminar</a>
      |
      <router-link
        :to="{ name: 'Project', params: { project: project.id } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <form @submit.prevent="updateProject">
      <div>
        <input
          type="text"
          v-model="project.name"
          id="name"
          placeholder="Nombre de proyecto"
          autofocus
          required
        />
      </div>
      <div>
        <textarea v-model="project.description" id="description" rows="10">
          Agregue una descripción</textarea
        >
      </div>
      <div>
        <select multiple v-model="project.collaborators" id="collaborators">
          <option v-for="person in people" :key="person.id" :value="person.id">
            {{ person.name }} - {{ person.email }}
          </option>
        </select>
      </div>
      <button type="submit">Editar</button>
    </form>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { db, dbName } from "@/main";

export default {
  name: "EditProject",
  components: {},
  data() {
    return {
      project: {
        name: null,
        description: null,
        collaborators: [],
      },
      people: [],
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.getPeople();
    this.getProject();
  },
  methods: {
    ...mapActions(["addProject", "addProjectsPeople", "addPersonProject"]),
    async getProject() {
      const data = await db.projects[this.$route.params.project];

      if (data === undefined) {
        this.$router.replace({ name: "Error" });
      } else {
        this.project = await db.projects[this.$route.params.project];
      }
    },
    async getPeople() {
      const data = Object.values(db.people)
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
            photoURL: e.photoURL,
            isActive: e.isActive,
          };
        });

      this.people = data;
    },
    async updateProject() {
      if (this.project.name.trim() === "") {
        this.alert.error = true;
        this.alert.msg = `El nombre puede estar vacio.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const date = Date.now();

        const project = {
          id: await this.project.id,
          name: await this.project.name.trim(),
          description: await this.project.description.trim(),
          collaborators: await this.project.collaborators,
          isActive: await this.project.isActive,
          isLock: await this.project.isLock,
          createdAt: await this.project.createdAt,
          updatedAt: date,
        };

        db.projects[project.id] = project;

        const colllaborators = await project.collaborators;

        // ------- Editar usuarios por projecto -------
        delete db.projectPeople[project.id];

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
        // ---X--- Editar usuarios por projecto ---X---

        // ------- Editar projectos por usuario -------
        // ------- Borrar projecto del usuario -------
        const users = Object.values(db.people);

        users.forEach(async (user) => {
          const u = await db.peopleProjects[user.id];

          if (u) {
            delete db.peopleProjects[user.id][project.id];
          }
        });
        // ---X--- Borrar projecto del usuario ---X---

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
        // ---X--- Editar projectos por usuario ---X---

        localStorage.setItem(dbName, JSON.stringify(db));

        this.project.name = "";
        this.project.description = "";
        this.project.collaborators = "";

        await this.$router.replace({
          name: "Project",
          params: { project: project.id },
        });
      }
    },
    async deleteProject() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        const project = await db.projects[this.$route.params.project];
        const collaborators = await project.collaborators;

        delete db.projects[project.id];
        delete db.projectPeople[project.id];

        for (let i = 0; i < collaborators.length; i++) {
          delete db.peopleProjects[collaborators[i]][project.id];
        }

        localStorage.setItem(dbName, JSON.stringify(db));

        await this.$router.replace({ name: "Projects" });
      }
    },
  },
  computed: {},
  watch: {
    $route: ["getPeople", "getProject"],
  },
};
</script>
