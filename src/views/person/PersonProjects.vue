<template>
  <div class="project-projects">
    <h1 style="margin: 0">
      {{ total }}
      {{ total === 1 ? "Proyecto del usuario" : "Proyectos del usuario" }}
    </h1>
    <p>
      <router-link
        :to="{ name: 'Project', params: { project: $route.params.project } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p v-for="(project, index) in projects" :key="index" class="parrafo">
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
    </p>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "PersonProjects",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      total: 0,
      projects: [],
    };
  },
  created() {
    this.getPersonProjects();
    this.getTotalPersonProjects();
  },
  methods: {
    async getPersonProjects() {
      const limit = this.limit;
      const page = (this.page - 1) * this.limit || 0;

      const data = Object.values(db.projects)
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
          };
        });

      this.projects = data;
    },
    async getTotalPersonProjects() {
      this.total = Object.values(db.projects)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true).length;
    },
  },
  watch: {
    $route: ["getPersonProjects", "getTotalPersonProjects"],
  },
};
</script>

<style scoped></style>
