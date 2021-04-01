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
          <option v-for="person in people" :key="person.id" :value="person.id">
            {{ person.name }} - {{ person.email }}
          </option>
        </select>
      </div>
      <button type="submit">Agregar</button>
    </form>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
    <pre class="container" hidden style="text-align: left">{{ $data }}</pre>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { db } from "@/main";

export default {
  name: "NewMeetingTask",
  components: {},
  data() {
    return {
      task: {
        name: "",
        description: "",
        collaborators: [],
        meeting: parseInt(this.$route.params.meeting),
      },
      people: [],
      meeting: "",
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.getMeeting();
    this.getMeetingPeople();
  },
  methods: {
    ...mapActions(["addTask"]),
    async getMeeting() {
      this.meeting = await db.meetings[this.$route.params.meeting];
    },
    async getMeetingPeople() {
      const data = Object.values(db.meetingPeople[this.$route.params.meeting])
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
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            email: e.email,
            isActive: e.isActive,
          };
        });

      this.people = data;
    },
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
          projectId: await this.meeting.project,
          meetingId: await this.task.meeting,
        };

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
  watch: {
    $route: ["getMeetingPeople"],
  },
};
</script>
