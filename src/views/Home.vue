<template>
  <main class="main">
    <TheNavbar :titleApp="titleApp" :icon="icon" />
    <div class="main__body">
      <TheSecondNavbar />

      <div class="main__body__content">
        <div class="main__body__section">
          <div class="main__body__section__nav" id="main__body__section__nav">
            <router-link
              v-for="(task, index) in tasks"
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
import { db } from "@/main";

import TheNavbar from "@/components/TheNavbar";
import TheSecondNavbar from "@/components/TheSecondNavbar";

export default {
  name: "Home",
  components: {
    TheNavbar,
    TheSecondNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "MeetingsApp",
      icon: "fas fa-tasks",
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
        .filter((e) => e.check === false)
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
            check: e.check,
            start: e.start,
            isActive: e.isActive,
          };
        });

      this.tasks = data;
    },
    async getTotalTasks() {
      this.total = Object.values(db.tasks)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .filter((e) => e.check === false).length;
    },
  },
  watch: {
    $route: ["getTasks", "getTotalTasks"],
  },
};
</script>
