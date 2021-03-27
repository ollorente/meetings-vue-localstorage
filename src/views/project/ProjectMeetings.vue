<template>
  <div class="projects">
    <h1 style="margin: 0">
      {{ total }}
      {{ total === 1 ? "Reunión del proyecto" : "Reuniones del proyecto" }}
    </h1>
    <p>
      <router-link :to="{ name: 'NewProject' }" class="link"
        >Agregar</router-link
      >
      |
      <router-link
        :to="{ name: 'Project', params: { project: $route.params.project } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p v-for="(meeting, index) in meetings" :key="index" class="parrafo">
      <span class="parrafo__info">
        <span class="parrafo__info__number">{{ index + 1 }}</span>
        <span class="parrafo__info__name"
          ><router-link
            :to="{ name: 'Meeting', params: { meeting: meeting.id } }"
            class="link"
            >{{ meeting.name }}</router-link
          ></span
        ></span
      >
      <span class="parrafo__status" style="display: flex">
        <span style="padding: 0 0.5rem; font-size: 0.8rem; font-weight: 600">{{
          new Date(meeting.dateInt).getMonth() + 1
        }}</span>
        <span style="padding: 0 0.5rem; font-size: 2rem; font-weight: 600">{{
          new Date(meeting.dateInt).toString().split(" ")[2]
        }}</span>
        <span
          >{{ new Date(meeting.dateInt).toString().split(" ")[4] }}<br />{{
            new Date(meeting.dateEnd).toString().split(" ")[4]
          }}</span
        >
      </span>
    </p>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "ProjectMeetings",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      total: 0,
      meetings: [],
    };
  },
  created() {
    this.getProjectMeetings();
    this.getTotalProjectMeetings();
  },
  methods: {
    async getProjectMeetings() {
      const limit = this.limit;
      const page = (this.page - 1) * this.limit || 0;

      const data = Object.values(db.projectMeetings[this.$route.params.project])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.dateInt > b.dateInt) {
            return 1;
          }
          if (a.dateInt < b.dateInt) {
            return -1;
          }
          return 0;
        })
        .splice(page, limit)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            dateInt: e.dateInt,
            dateEnd: e.dateEnd,
            isActive: e.isActive,
          };
        });

      this.meetings = data;
    },
    async getTotalProjectMeetings() {
      this.total = Object.values(db.projectMeetings[this.$route.params.project])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true).length;
    },
  },
  watch: {
    $route: ["getProjectMeetings", "getTotalProjectMeetings"],
  },
};
</script>

<style scoped></style>
