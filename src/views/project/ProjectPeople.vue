<template>
  <div class="project-people">
    <h1 style="margin: 0">
      {{ total }}
      {{ total === 1 ? "Usuario en el proyecto" : "Usuarios en el proyectos" }}
    </h1>
    <p>
      <router-link
        :to="{ name: 'Project', params: { project: $route.params.project } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p v-for="(person, index) in people" :key="index" class="parrafo">
      <span class="parrafo__info">
        <span class="parrafo__info__number">{{ index + 1 }}</span>
        <span class="parrafo__info__name"
          ><router-link
            :to="{ name: 'Person', params: { person: person.id } }"
            class="link"
            >{{ person.name }}</router-link
          ></span
        ></span
      >
      <span class="parrafo__status">{{
        person.isActive ? "Activo" : "Inactivo"
      }}</span>
    </p>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "ProjectPeople",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      total: 0,
      people: [],
    };
  },
  created() {
    this.getProjectPeople();
    this.getTotalProjectPeople();
  },
  methods: {
    async getProjectPeople() {
      const limit = this.limit;
      const page = (this.page - 1) * this.limit || 0;
      const project = await db.projectPeople[this.$route.params.project];

      const data = Object.values(project)
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
            email: e.email,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      this.people = data;
    },
    async getTotalProjectPeople() {
      this.total = Object.values(db.projectPeople[this.$route.params.project])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true).length;
    },
  },
  watch: {
    $route: ["getProjectPeople", "getTotalProjectPeople"],
  },
};
</script>

<style scoped></style>
