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
  name: "NewMeetingPeople",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Tareas del proyecto",
      icon: "fas fa-arrow-left",
      link: `/proyecto/${this.$route.params.project}`,
      options: [],
    };
  },
  created() {
    this.fetchProject(this.$route.params.project);
    this.fetchProjectTasks({
      id: this.$route.params.project,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllProjectTasks();
  },
  methods: {
    ...mapActions([
      "fetchProject",
      "fetchProjectTasks",
      "fetchAllProjectTasks",
    ]),
  },
  computed: {
    ...mapGetters(["getProject", "getProjectTasks", "getAllProjectTasks"]),
  },
  watch: {
    $route: ["fetchProject", "fetchProjectTasks", "fetchAllProjectTasks"],
  },
};
</script>

<style scoped></style>
