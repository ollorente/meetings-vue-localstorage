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
