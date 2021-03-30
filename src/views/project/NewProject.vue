<template>
  <div class="new-project">
    <h1 style="margin: 0">Nuevo proyecto</h1>
    <p>
      <router-link :to="{ name: 'Projects' }" class="link">Volver</router-link>
    </p>
    <form @submit.prevent="newProject">
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
          <option
            v-for="person in getAllPeople"
            :key="person.id"
            :value="person.id"
          >
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
import { mapActions, mapGetters } from "vuex";

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
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.fetchAllPeople();
  },
  methods: {
    ...mapActions(["addProject", "fetchAllPeople"]),
    async newProject() {
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
        const project = {
          name: await this.project.name,
          description: await this.project.description,
          collaborators: await this.project.collaborators,
        };

        await this.addProject(project);

        this.project.name = "";
        this.project.description = "";
        this.project.collaborators = "";

        await this.$router.replace({ name: "Projects" });
      }
    },
  },
  computed: {
    ...mapGetters(["getAllPeople"]),
  },
  watch: {
    $route: ["fetchAllPeople"],
  },
};
</script>
