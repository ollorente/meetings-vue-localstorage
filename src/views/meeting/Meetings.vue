<template>
  <main class="main">
    <TheNavbar :titleApp="titleApp" :icon="icon" />
    <div class="main__body">
      <TheSecondNavbar />

      <div class="main__body__content">
        <div class="main__body__section">
          <div class="main__body__section__nav">
            <div
              v-for="(meeting, index) in getMeetings"
              :key="index"
              class="main__body__section__card"
            >
              <div class="main__body__section__card__date">
                <span class="main__body__section__card__month">{{
                  new Date(meeting.dateInt).getMonth() + 1
                }}</span>
                <span class="main__body__section__card__day">{{
                  new Date(meeting.dateInt).toString().split(" ")[2]
                }}</span>
              </div>
              <router-link
                :to="{ name: 'Meeting', params: { meeting: meeting.id } }"
                class="main__body__section__card__body"
              >
                <span class="main__body__section__link__text__content">
                  <span class="text-title">{{ meeting.name }}</span>
                  <span class="text-content"
                    >{{ new Date(meeting.dateInt).toString().split(" ")[4] }} -
                    {{
                      new Date(meeting.dateEnd).toString().split(" ")[4]
                    }}</span
                  >
                </span>
                <span class="main__body__section__link__icon">
                  <i
                    :class="meeting.isActive ? 'fas' : 'far'"
                    class="fa-circle"
                  ></i>
                  <i
                    :class="meeting.isLock ? 'fas' : 'far'"
                    class="fa-circle"
                  ></i>
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TheNavbar from "@/components/TheNavbar";
import TheSecondNavbar from "@/components/TheSecondNavbar";

export default {
  name: "Meetings",
  components: {
    TheNavbar,
    TheSecondNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Reuniones",
      icon: "fas fa-handshake",
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
