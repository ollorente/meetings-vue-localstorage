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
              {{ getProject.name }}
            </h1>
            <h3 class="main__body__section__person__subtitle"></h3>
            <router-link
              v-for="(task, index) in getProjectTasks"
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
  name: "ProjectTasks",
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
      options: [
        {
          menus: [
            {
              title: "Agregar tarea",
              link: `/proyecto/${this.$route.params.project}/tarea/nueva`,
              icon: "fas fa-user-edit",
            },
          ],
        },
      ],
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
