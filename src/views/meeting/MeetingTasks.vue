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
            <h1 class="main__body__section__person__title">
              {{ getMeeting.name }}
            </h1>
            <h3 class="main__body__section__person__subtitle"></h3>
            <router-link
              v-for="(task, index) in getMeetingTasks"
              :key="index"
              :to="{ name: 'Task', params: { task: task.id } }"
              class="main__body__section__task"
            >
              <span class="main__body__section__task__text">
                <i class="fas fa-clipboard-check"></i>
                <div class="main__body__section__task__body">
                  <span class="main__body__section__task__title">{{
                    task.name
                  }}</span>
                  <span class="main__body__section__task__content"
                    >OVA Toxomasmosis</span
                  >
                </div>
              </span>
              <span class="main__body__section__task__icon">
                <i class="fas fa-circle"></i>
                <i class="far fa-circle"></i>
              </span>
            </router-link>
            <div v-if="getMeetingTasks.length < 1">
              No tiene tareas programadas 😊
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
  name: "Tasks",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Tareas de reunión",
      icon: "fas fa-arrow-left",
      link: `/reunion/${this.$route.params.meeting}`,
      options: [
        {
          menus: [
            {
              title: "Agregar tarea",
              link: `/reunion/${this.$route.params.meeting}/tarea/nueva`,
              icon: "fas fa-tasks",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.fetchMeetingTasks({
      id: this.$route.params.meeting,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllMeetingTasks(this.$route.params.meeting);
    this.fetchMeeting(this.$route.params.meeting);
  },
  methods: {
    ...mapActions([
      "fetchMeetingTasks",
      "fetchAllMeetingTasks",
      "fetchMeeting",
    ]),
  },
  computed: {
    ...mapGetters(["getMeetingTasks", "getAllMeetingTasks", "getMeeting"]),
  },
  watch: {
    $route: ["fetchMeetingTasks", "fetchAllMeetingTasks", "fetchMeeting"],
  },
};
</script>
