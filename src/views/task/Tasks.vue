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
            <h1 style="margin: 0">
              {{ total }}
              {{ total === 1 ? "Tarea del proyecto" : "Tareas del proyecto" }}
            </h1>
            <p v-for="(task, index) in tasks" :key="index" class="parrafo">
              <span class="parrafo__info">
                <span class="parrafo__info__number">{{ index + 1 }}</span>
                <span class="parrafo__info__name"
                  ><router-link
                    :to="{ name: 'Task', params: { task: task.id } }"
                    class="link"
                    >{{ task.name }}</router-link
                  ></span
                ></span
              >
              <span class="parrafo__status">{{
                task.isActive ? "Activo" : "Inactivo"
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { db } from "@/main";

import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "MeetingTasks",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      total: 0,
      tasks: [],
      titleApp: "Tareas",
      icon: "fas fa-arrow-left",
      link: `/tarea/${this.$route.params.meeting}`,
      options: [],
    };
  },
  created() {
    this.getTasks();
    this.getTotalTasks();
  },
  methods: {
    async getTasks() {
      const limit = this.limit;
      const page = (this.page - 1) * this.limit || 0;

      const data = Object.values(db.tasks)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        .splice(page, limit)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            isActive: e.isActive,
          };
        });

      this.tasks = data;
    },
    async getTotalTasks() {
      this.total = Object.values(db.tasks)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true).length;
    },
  },
  watch: {
    $route: ["getTasks", "getTotalTasks"],
  },
};
</script>
