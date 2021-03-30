<template>
  <div class="projects">
    <h1 style="margin: 0">
      {{ getAllProjectMeetings.length }}
      {{
        getAllProjectMeetings.length === 1
          ? "Reunión del proyecto"
          : "Reuniones del proyecto"
      }}
    </h1>
    <p>
      <router-link
        :to="{
          name: 'NewProjectMeeting',
          params: { project: $route.params.project },
        }"
        class="link"
        >Agregar</router-link
      >
      |
      <router-link
        :to="{ name: 'Project', params: { project: $route.params.project } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p
      v-for="(meeting, index) in getProjectMeetings"
      :key="index"
      class="parrafo"
    >
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProjectMeetings",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchProjectMeetings({
      id: this.$route.params.project,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllProjectMeetings();
  },
  methods: {
    ...mapActions(["fetchProjectMeetings", "fetchAllProjectMeetings"]),
  },
  computed: {
    ...mapGetters(["getProjectMeetings", "getAllProjectMeetings"]),
  },
  watch: {
    $route: ["fetchProjectMeetings", "fetchAllProjectMeetings"],
  },
};
</script>

<style scoped></style>
