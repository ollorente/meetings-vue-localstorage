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
              {{ getPerson.name }}
            </h1>
            <h3 class="main__body__section__person__subtitle">
              {{ getPerson.email }}
            </h3>
            <router-link
              v-for="(task, index) in getPersonTasks"
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
            <div v-if="getPersonTasks.length < 1">
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
  name: "PersonTasks",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Tareas",
      icon: "fas fa-arrow-left",
      link: `/usuario/${this.$route.params.person}`,
      options: [],
    };
  },
  created() {
    this.fetchPerson(this.$route.params.person);
    this.fetchPersonTasks({
      id: this.$route.params.person,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllPersonTasks({ id: this.$route.params.person });
  },
  methods: {
    ...mapActions(["fetchPerson", "fetchPersonTasks", "fetchAllPersonTasks"]),
  },
  computed: {
    ...mapGetters(["getPerson", "getPersonTasks", "getAllPersonTasks"]),
  },
  watch: {
    $route: ["fetchPerson", "fetchPersonTasks", "fetchAllPersonTasks"],
  },
};
</script>

<style scoped></style>
