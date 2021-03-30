<template>
  <div class="project-people">
    <h1 style="margin: 0">
      {{ getAllProjectPeople.length }}
      {{
        getAllProjectPeople.length === 1
          ? "Usuario en el proyecto"
          : "Usuarios en el proyectos"
      }}
    </h1>
    <p>
      <router-link
        :to="{ name: 'Project', params: { project: $route.params.project } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p v-for="(person, index) in getProjectPeople" :key="index" class="parrafo">
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
      <span class="parrafo__status">{{
        person.isLock ? "Bloqueado" : "Público"
      }}</span>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProjectPeople",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchProjectPeople({
      id: this.$route.params.project,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllProjectPeople();
  },
  methods: {
    ...mapActions(["fetchProjectPeople", "fetchAllProjectPeople"]),
  },
  computed: {
    ...mapGetters(["getProjectPeople", "getAllProjectPeople"]),
  },
  watch: {
    $route: ["fetchProjectPeople", "fetchAllProjectPeople"],
  },
};
</script>

<style scoped></style>
