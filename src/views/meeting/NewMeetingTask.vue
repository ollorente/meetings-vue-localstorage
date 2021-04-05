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
            <h1 class="main__body__section__person__title">Nueva tarea</h1>
            <h3 class="main__body__section__person__subtitle"></h3>
            <form @submit.prevent="newTask">
              <div>
                <input
                  type="text"
                  v-model="task.name"
                  id="name"
                  placeholder="Nombre de tarea"
                  autofocus
                  required
                />
              </div>
              <div>
                <textarea
                  v-model="task.description"
                  id="description"
                  rows="10"
                  placeholder="Agregue una descripción"
                ></textarea>
              </div>
              <div>
                <select
                  multiple
                  v-model="task.collaborators"
                  id="collaborators"
                >
                  <option
                    v-for="person in getAllMeetingPeople"
                    :key="person.id"
                    :value="person.id"
                  >
                    {{ person.name }} - {{ person.email }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn-p-light">Agregar</button>
            </form>
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
  name: "NewMeetingTask",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      task: {
        name: "",
        description: "",
        collaborators: [],
        project: "",
      },
      meeting: "",
      alert: {
        error: true,
        msg: null,
      },
      titleApp: "Agregar tarea a reunión",
      icon: "fas fa-arrow-left",
      link: `/reunion/${this.$route.params.meeting}`,
      options: [],
    };
  },
  mounted() {
    this.meeting = this.getMeeting;
    this.task.project = this.getMeeting.project;
  },
  created() {
    this.fetchMeeting(this.$route.params.meeting);
    this.fetchAllMeetingPeople(this.$route.params.meeting);
  },
  methods: {
    ...mapActions(["addTask", "fetchMeeting", "fetchAllMeetingPeople"]),
    async newTask() {
      if (this.task.name.trim() === "" || this.task.description.trim() === "") {
        this.alert.error = true;
        this.alert.msg = `Ni el nombre ni la descripción pueden estar vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        await this.addTask({
          name: await this.task.name,
          description: await this.task.description,
          collaborators: await this.task.collaborators,
          project: parseInt(await this.task.project),
          meeting: parseInt(this.$route.params.meeting),
        });

        this.task.name = "";
        this.task.description = "";
        this.task.collaborators = "";

        await this.$router.replace({
          name: "MeetingTasks",
          params: { meeting: this.$route.params.meeting },
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getMeeting", "getAllMeetingPeople"]),
  },
  watch: {
    $route: ["fetchMeeting", "fetchAllMeetingPeople"],
  },
};
</script>
