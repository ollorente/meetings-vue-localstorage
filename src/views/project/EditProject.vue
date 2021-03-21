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
      <button type="submit">Agregar</button>
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

        const collaborators = await project.collaborators;

        if (collaborators.length > 0) {
          await collaborators.forEach(async (e) => {
            delete db.peopleProjects[e][project.id];
            const person = await db.peopleProjects[e];

            if (!person) {
              db.peopleProjects[e] = {};
            }

            db.peopleProjects[e][project.id] = {
              id: project.id,
              name: project.name,
              isActive: project.isActive,
              isLock: project.isLock,
            };
          });

          delete db.projectPeople[project.id];
          const projectData = await db.projectPeople[project.id];

          if (!projectData) {
            db.projectPeople[project.id] = {};
          }

          await collaborators.forEach(async (e) => {
            const person = await db.people[e];

            db.projectPeople[project.id][person.id] = {
              id: person.id,
              name: person.name,
              email: person.email,
              isActive: person.isActive,
              isLock: person.isLock,
            };
          });
        }

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
        delete db.projects[this.$route.params.project];
        delete db.projectPeople[this.$route.params.project];

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
