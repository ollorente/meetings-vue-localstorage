<template>
  <div class="projects">
    <h1 style="margin: 0">
      {{ total }} {{ total === 1 ? "Proyecto" : "Proyectos" }}
    </h1>
    <p>
      <router-link :to="{ name: 'NewProject' }" class="link"
        >Agregar</router-link
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
  name: "Projects",
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
    this.getProjects();
    this.getTotalProjects();
  },
  methods: {
    async getProjects() {
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
    async getTotalProjects() {
      this.total = Object.values(db.projects).length;
    },
  },
  watch: {
    $route: ["getProjects", "getTotalProjects"],
  },
};
</script>

<style scoped></style>
