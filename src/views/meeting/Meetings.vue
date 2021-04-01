<template>
  <div class="meetings">
    <h1 style="margin: 0">
      {{ getAllMeetings.length }}
      {{ getAllMeetings.length === 1 ? "Reunión" : "Reuniones" }}
    </h1>
    <p v-for="(meeting, index) in getMeetings" :key="index" class="parrafo">
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
  name: "Meetings",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchMeetings();
    this.fetchAllMeetings();
  },
  methods: {
    ...mapActions(["fetchMeetings", "fetchAllMeetings"]),
  },
  computed: {
    ...mapGetters(["getMeetings", "getAllMeetings"]),
  },
  watch: {
    $route: ["fetchMeetings", "fetchAllMeetings"],
  },
};
</script>
