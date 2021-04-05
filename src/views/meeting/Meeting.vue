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
            <h1 class="main__body__section__nav--title">Reunión</h1>
            <h2 class="main__body__section__nav--subtitle">
              {{ getMeeting.name }}
            </h2>
            <div v-html="getMeeting.description"></div>
            <p>
              <span class="parrafo__status" style="display: flex">
                <span
                  style="padding: 0 0.5rem; font-size: 2rem; font-weight: 600"
                  >{{
                    new Date(getMeeting.dateInt).toString().split(" ")[2]
                  }}</span
                >
                <span
                  >{{ new Date(getMeeting.dateInt).toString().split(" ")[4]
                  }}<br />{{
                    new Date(getMeeting.dateEnd).toString().split(" ")[4]
                  }}</span
                >
              </span>
            </p>
            <p style="text-align: left; padding: 0 1rem">
              <b>{{ getMeeting.isActive ? "Activo" : "Inactivo" }}</b
              ><br />
              <span
                ><b>Creado: </b
                ><span>{{
                  new Date(getMeeting.createdAt).toLocaleDateString()
                }}</span>
              </span>
              <span v-if="getMeeting.createdAt !== getMeeting.updatedAt"
                ><br />
                <b>Actualizado: </b
                ><span>{{
                  new Date(getMeeting.updatedAt).toLocaleDateString()
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
  name: "Meeting",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      titleApp: "Reunión",
      icon: "fas fa-arrow-left",
      link: `/reuniones`,
      options: [
        {
          menus: [
            {
              title: "Editar",
              link: `/reunion/${this.$route.params.meeting}/editar`,
              icon: "fas fa-user-edit",
            },
            {
              title: "Tareas",
              link: `/reunion/${this.$route.params.meeting}/tareas`,
              icon: "fas fa-tasks",
            },
            {
              title: "Usuarios",
              link: `/reunion/${this.$route.params.meeting}/usuarios`,
              icon: "fas fa-user-tie",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.fetchMeeting(this.$route.params.meeting);
  },
  methods: {
    ...mapActions(["fetchMeeting"]),
  },
  computed: {
    ...mapGetters(["getMeeting"]),
  },
  watch: {
    $route: ["fetchMeeting"],
  },
};
</script>
