<template>
  <div class="new-meeting">
    <h1 style="margin: 0">Nueva reunión</h1>
    <p>
      <router-link
        :to="{
          name: 'ProjectMeetings',
          params: { project: $route.params.project },
        }"
        class="link"
        >Volver</router-link
      >
    </p>
    <form @submit.prevent="newMeeting">
      <div>
        <input
          type="text"
          v-model="meeting.name"
          id="name"
          placeholder="Nombre de proyecto"
          autofocus
          required
        />
      </div>
      <div>
        <textarea v-model="meeting.description" id="description" rows="10">
          Agregue una descripción</textarea
        >
      </div>
      <div>
        <input
          type="datetime-local"
          v-model="meeting.dateInt"
          id="dateInt"
          name="trip-start"
          value="2018-07-22"
          min="2018-01-01"
          max="2018-12-31"
        />
      </div>
      <div>
        <input
          type="datetime-local"
          v-model="meeting.dateEnd"
          id="dateEnd"
          name="trip-start"
          value="2018-07-22"
          min="2018-01-01"
          max="2018-12-31"
        />
      </div>
      <div>
        <select multiple v-model="meeting.collaborators" id="collaborators">
          <option
            v-for="person in getProjectPeople"
            :key="person.id"
            :value="person.id"
          >
            {{ person.name }} - {{ person.email }}
          </option>
        </select>
      </div>
      <button type="submit">Agregar</button>
    </form>
    <pre class="container" hidden style="text-align: left">{{ $data }}</pre>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
    <pre class="container" hidden style="text-align: left">{{ $data }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewProjectMeeting",
  components: {},
  data() {
    return {
      meeting: {
        name: "",
        description: "",
        dateInt: null,
        dateEnd: null,
        collaborators: [],
      },
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.fetchAllProjectPeople(this.$route.params.project);
  },
  methods: {
    ...mapActions(["addMeeting", "fetchAllProjectPeople"]),
    async newMeeting() {
      if (
        this.meeting.name.trim() === "" ||
        this.meeting.description.trim() === "" ||
        this.meeting.dateInt === null ||
        this.meeting.dateEnd === null
      ) {
        this.alert.error = true;
        this.alert.msg = `Ni el nombre ni la descripción pueden estar vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const meeting = {
          name: await this.meeting.name,
          description: await this.meeting.description,
          collaborators: await this.meeting.collaborators,
          project: this.$route.params.project,
          dateInt: await this.meeting.dateInt,
          dateEnd: await this.meeting.dateEnd,
        };

        await this.addMeeting(meeting);

        this.meeting.name = "";
        this.meeting.description = "";
        this.meeting.collaborators = "";
        this.meeting.dateInt = "";
        this.meeting.dateEnd = "";

        await this.$router.replace({
          name: "ProjectMeetings",
          params: { project: this.$route.params.project },
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getProjectPeople"]),
  },
  watch: {
    $route: ["fetchAllProjectPeople"],
  },
};
</script>
