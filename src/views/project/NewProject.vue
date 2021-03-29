<template>
  <div class="new-project">
    <h1 style="margin: 0">Nuevo proyecto</h1>
    <p>
      <router-link :to="{ name: 'Projects' }" class="link">Volver</router-link>
    </p>
    <form @submit.prevent="addProject">
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
      <button type="submit">Agregar</button>
    </form>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
  </div>
</template>

<script>
import { db, dbName } from "@/main";

export default {
  name: "NewProject",
  components: {},
  data() {
    return {
      project: {
        name: "",
        description: "",
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
  },
  methods: {
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
    async addProject() {
      if (
        this.project.name.trim() === "" ||
        this.project.description.trim() === ""
      ) {
        this.alert.error = true;
        this.alert.msg = `Ni el nombre ni la descripción pueden estar vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const date = Date.now();

        const project = {
          id: date,
          name: await this.project.name.trim(),
          description: await this.project.description.trim(),
          collaborators: await this.project.collaborators,
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

        this.project.name = "";
        this.project.description = "";
        this.project.collaborators = "";

        await this.$router.replace({ name: "Projects" });
      }
    },
  },
  watch: {
    $route: ["getPeople"],
  },
};
</script>
