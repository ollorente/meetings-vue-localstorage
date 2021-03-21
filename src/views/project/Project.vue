<template>
  <div class="project">
    <h1 style="margin: 0">{{ project.name }}</h1>
    <p>
      <router-link
        :to="{ name: 'ProjectTasks', params: { project: project.id } }"
        class="link"
        >Tareas</router-link
      >
      |
      <router-link
        :to="{ name: 'ProjectMeetings', params: { project: project.id } }"
        class="link"
        >Reuniones</router-link
      >
      |
      <router-link
        :to="{ name: 'ProjectPeople', params: { project: project.id } }"
        class="link"
        >Usuarios</router-link
      >
      |
      <router-link
        :to="{ name: 'EditProject', params: { project: project.id } }"
        class="link"
        >Editar</router-link
      >
      |
      <router-link :to="{ name: 'Projects' }" class="link">Volver</router-link>
    </p>
    <div v-html="project.description"></div>
    <p style="text-align: left; padding: 0 1rem">
      <b>{{ project.isActive ? "Activo" : "Inactivo" }}</b
      ><br />
      <span
        ><b>Creado: </b
        ><span>{{ new Date(project.createdAt).toLocaleDateString() }}</span>
      </span>
      <span v-if="project.createdAt !== project.updatedAt"
        ><br />
        <b>Actualizado: </b
        ><span>{{
          new Date(project.updatedAt).toLocaleDateString()
        }}</span></span
      >
    </p>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "Project",
  components: {},
  data() {
    return {
      project: "",
    };
  },
  created() {
    this.getProject();
  },
  methods: {
    async getProject() {
      const data = await db.projects[this.$route.params.project];

      if (data === undefined) {
        this.$router.replace({ name: "Error" });
      } else {
        this.project = await db.projects[this.$route.params.project];
      }
    },
  },
  watch: {
    $route: ["getProject"],
  },
};
</script>
