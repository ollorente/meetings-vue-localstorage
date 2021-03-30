<template>
  <div class="project">
    <h1 style="margin: 0">{{ getProject.name }}</h1>
    <p>
      <router-link
        :to="{
          name: 'ProjectTasks',
          params: { project: $route.params.project },
        }"
        class="link"
        >Tareas</router-link
      >
      |
      <router-link
        :to="{
          name: 'ProjectMeetings',
          params: { project: $route.params.project },
        }"
        class="link"
        >Reuniones</router-link
      >
      |
      <router-link
        :to="{
          name: 'ProjectPeople',
          params: { project: $route.params.project },
        }"
        class="link"
        >Usuarios</router-link
      >
      |
      <router-link
        :to="{
          name: 'EditProject',
          params: { project: $route.params.project },
        }"
        class="link"
        >Editar</router-link
      >
      |
      <router-link :to="{ name: 'Projects' }" class="link">Volver</router-link>
    </p>
    <div v-html="getProject.description"></div>
    <p style="text-align: left; padding: 0 1rem">
      <b>{{ getProject.isActive ? "Activo" : "Inactivo" }}</b
      ><br />
      <b>{{ getProject.isLock ? "Bloqueado" : "Público" }}</b
      ><br />
      <span
        ><b>Creado: </b
        ><span>{{ new Date(getProject.createdAt).toLocaleDateString() }}</span>
      </span>
      <span v-if="getProject.createdAt !== getProject.updatedAt"
        ><br />
        <b>Actualizado: </b
        ><span>{{
          new Date(getProject.updatedAt).toLocaleDateString()
        }}</span></span
      >
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Project",
  components: {},
  data() {
    return {};
  },
  created() {
    this.fetchProject(this.$route.params.project);
  },
  methods: {
    ...mapActions(["fetchProject"]),
  },
  computed: {
    ...mapGetters(["getProject"]),
  },
  watch: {
    $route: ["fetchProject"],
  },
};
</script>
