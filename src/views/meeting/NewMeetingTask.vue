<template>
  <div class="new-project-task">
    <h1 style="margin: 0">Nueva tarea</h1>
    <p>
      <router-link
        :to="{
          name: 'MeetingTasks',
          params: { meeting: $route.params.meeting },
        }"
        class="link"
        >Volver</router-link
      >
    </p>
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
        <textarea v-model="task.description" id="description" rows="10">
          Agregue una descripción</textarea
        >
      </div>
      <div>
        <select multiple v-model="task.collaborators" id="collaborators">
          <option
            v-for="person in getAllMeetingPeople"
            :key="person.id"
            :value="person.id"
          >
            {{ person.name }} - {{ person.email }}
          </option>
        </select>
      </div>
      <button type="submit">Agregar</button>
    </form>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
    <pre class="container" hiddens style="text-align: left">{{ $data }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewMeetingTask",
  components: {},
  data() {
    return {
      task: {
        name: "",
        description: "",
        collaborators: [],
      },
      meeting: "",
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  mounted() {
    this.meeting = this.getMeeting;
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
        const task = {
          name: await this.task.name,
          description: await this.task.description,
          collaborators: await this.task.collaborators,
          project: await this.meeting.project,
          meeting: parseInt(this.$route.params.meeting),
        };
        console.log("task component->", task);

        await this.addTask(task);

        this.meeting.name = "";
        this.meeting.description = "";
        this.meeting.collaborators = "";
        this.meeting.project = "";

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
    $route: ["getMeetingPeople", "fetchMeeting", "fetchAllMeetingPeople"],
  },
};
</script>
