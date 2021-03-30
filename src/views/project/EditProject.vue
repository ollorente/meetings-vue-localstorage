<template>
  <div class="edit-project">
    <h1 style="margin: 0">Editar "{{ project.name }}"</h1>
    <p>
      <a href="#" @click="deleteProject" class="link">Eliminar</a>
      |
      <router-link
        :to="{ name: 'Project', params: { project: $route.params.project } }"
        class="link"
        >Volver</router-link
      >
    </p>

    <form @submit.prevent="putProject">
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
      <div>
        <label
          ><input type="checkbox" v-model="project.isActive" /> Estatus</label
        >
      </div>
      <button type="submit">Editar</button>
    </form>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditProject",
  components: {},
  data() {
    return {
      project: "",
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  mounted() {
    this.project = {
      id: this.getProject.id,
      name: this.getProject.name,
      description: this.getProject.description,
      collaborators: this.getProject.collaborators,
      isActive: this.getProject.isActive,
      isLock: this.getProject.isLock,
      createdAt: this.getProject.createdAt,
      updatedAt: this.getProject.updatedAt,
    };
  },
  created() {
    this.fetchAllPeople();
    this.fetchProject(this.$route.params.project);
  },
  methods: {
    ...mapActions([
      "fetchAllPeople",
      "fetchProject",
      "removeProject",
      "updateProject",
    ]),
    async putProject() {
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
          id: await this.project.id,
          name: await this.project.name,
          description: await this.project.description,
          collaborators: await this.project.collaborators,
          isActive: await this.project.isActive,
          isLock: await this.project.isLock,
          createdAt: await this.project.createdAt,
        };

        await this.updateProject(project);

        this.project.name = "";
        this.project.description = "";
        this.project.collaborators = "";

        await this.$router.replace({
          name: "Project",
          params: { project: this.$route.params.project },
        });
      }
    },
    async deleteProject() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.removeProject(this.$route.params.project);

        await this.$router.replace({ name: "Projects" });
      }
    },
  },
  computed: {
    ...mapGetters(["getAllPeople", "getProject"]),
  },
  watch: {
    $route: ["fetchAllPeople", "fetchProject"],
  },
};
</script>
