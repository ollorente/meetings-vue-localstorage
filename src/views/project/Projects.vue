<template>
  <div class="projects">
    <h1 style="margin: 0">
      {{ getAllProjects.length }}
      {{ getAllProjects.length === 1 ? "Proyecto" : "Proyectos" }}
    </h1>
    <p>
      <router-link :to="{ name: 'NewProject' }" class="link"
        >Agregar</router-link
      >
    </p>
    <p v-for="(project, index) in getProjects" :key="index" class="parrafo">
      <span class="parrafo__info">
        <span class="parrafo__info__number">{{ index + 1 }}</span>
        <span class="parrafo__info__name"
          ><router-link
            :to="{ name: 'Project', params: { project: project.id } }"
            class="link"
            >{{ project.name }}</router-link
          ></span
        ></span
      >
      <span class="parrafo__status">{{
        project.isActive ? "Activo" : "Inactivo"
      }}</span>
      <span class="parrafo__status">{{
        project.isLock ? "Bloqueado" : "Público"
      }}</span>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Projects",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchProjects({ limit: this.limit, page: this.page });
    this.fetchAllProjects();
  },
  methods: {
    ...mapActions(["fetchProjects", "fetchAllProjects"]),
  },
  computed: {
    ...mapGetters(["getProjects", "getAllProjects"]),
  },
  watch: {
    $route: ["fetchProjects", "fetchAllProjects"],
  },
};
</script>

<style scoped></style>
