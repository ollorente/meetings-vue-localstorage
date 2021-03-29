<template>
  <div class="project-projects">
    <h1 style="margin: 0">
      {{ getAllPersonProjects.length }}
      {{
        getAllPersonProjects.length === 1
          ? "Proyecto del usuario"
          : "Proyectos del usuario"
      }}
    </h1>
    <p>
      <router-link
        :to="{ name: 'Person', params: { project: $route.params.person } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p
      v-for="(project, index) in getPersonProjects"
      :key="index"
      class="parrafo"
    >
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PersonProjects",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchPersonProjects({
      id: this.$route.params.person,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllPersonProjects({ id: this.$route.params.person });
  },
  methods: {
    ...mapActions(["fetchPersonProjects", "fetchAllPersonProjects"]),
  },
  computed: {
    ...mapGetters(["getPersonProjects", "getAllPersonProjects"]),
  },
  watch: {
    $route: ["fetchPersonProjects", "fetchAllPersonProjects"],
  },
};
</script>

<style scoped></style>
