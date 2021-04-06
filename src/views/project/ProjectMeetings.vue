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
            <h1 class="main__body__section__nav--title">
              {{ getProject.name }}
            </h1>
            <h3 class="main__body__section__person__subtitle"></h3>
            <div
              v-for="(meeting, index) in getProjectMeetings"
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
            <div v-if="getProjectMeetings.length < 1">
              No tiene reuniones programadas 😊
            </div>
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
  name: "ProjectMeetings",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Reuniones del proyecto",
      icon: "fas fa-arrow-left",
      link: `/proyecto/${this.$route.params.project}`,
      options: [
        {
          menus: [
            {
              title: "Agregar reunión",
              link: `/proyecto/${this.$route.params.project}/reunion/nueva`,
              icon: "fas fa-hand-paper",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.fetchProjectMeetings({
      id: this.$route.params.project,
      limit: this.limit,
      page: this.page,
    });
    this.fetchProject(this.$route.params.project);
  },
  methods: {
    ...mapActions(["fetchProjectMeetings", "fetchProject"]),
  },
  computed: {
    ...mapGetters(["getProjectMeetings", "getProject"]),
  },
  watch: {
    $route: ["fetchProjectMeetings", "fetchProject"],
  },
};
</script>

<style scoped></style>
