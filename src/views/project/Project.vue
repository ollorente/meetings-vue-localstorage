<template>
  <main class="main">
    <TheSectionNavbar
      :titleApp="titleApp"
      :icon="icon"
      :link="link"
      :options="options"
    />
    <div class="main__body">
      <div class="main__body__content">
        <div class="main__body__section">
          <div class="main__body__section__nav">
            <h1 style="margin: 0">{{ getProject.name }}</h1>
            <div v-html="getProject.description"></div>
            <p style="text-align: left; padding: 0 1rem">
              <b>{{ getProject.isActive ? "Activo" : "Inactivo" }}</b
              ><br />
              <b>{{ getProject.isLock ? "Bloqueado" : "Público" }}</b
              ><br />
              <span
                ><b>Creado: </b
                ><span>{{
                  new Date(getProject.createdAt).toLocaleDateString()
                }}</span>
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
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "Project",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      titleApp: "Proyecto",
      icon: "fas fa-arrow-left",
      link: `/proyectos`,
      options: [
        {
          menus: [
            {
              title: "Editar",
              link: `/proyecto/${this.$route.params.project}/editar`,
              icon: "fas fa-user-edit",
            },
            {
              title: "Reuniones",
              link: `/proyecto/${this.$route.params.project}/reuniones`,
              icon: "fas fa-handshake",
            },
            {
              title: "Tareas",
              link: `/proyecto/${this.$route.params.project}/tareas`,
              icon: "fas fa-tasks",
            },
            {
              title: "Usuarios",
              link: `/proyecto/${this.$route.params.project}/usuarios`,
              icon: "fas fa-user-tie",
            },
          ],
        },
      ],
    };
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
