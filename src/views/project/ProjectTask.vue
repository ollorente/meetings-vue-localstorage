<template>
  <div class="meeting">
    <h1 style="margin: 0">Reunión</h1>
    <p>
      <router-link
        :to="{
          name: 'MeetingTasks',
          params: { meeting: $route.params.meeting },
        }"
        class="link"
        >Tareas</router-link
      >
      |
      <router-link
        :to="{
          name: 'MeetingPeople',
          params: { meeting: $route.params.meeting },
        }"
        class="link"
        >Usuarios</router-link
      >
      |
      <router-link
        :to="{
          name: 'EditMeeting',
          params: { meeting: $route.params.meeting },
        }"
        class="link"
        >Editar</router-link
      >
      |
      <router-link :to="{ name: 'Meetings' }" class="link">Volver</router-link>
    </p>
    <h2 style="margin: 0 1rem; text-align: left">{{ meeting.name }}</h2>
    <div v-html="meeting.description"></div>
    <p>
      <span class="parrafo__status" style="display: flex">
        <span style="padding: 0 0.5rem; font-size: 2rem; font-weight: 600">{{
          new Date(meeting.dateInt).toString().split(" ")[2]
        }}</span>
        <span
          >{{ new Date(meeting.dateInt).toString().split(" ")[4] }}<br />{{
            new Date(meeting.dateEnd).toString().split(" ")[4]
          }}</span
        >
      </span>
    </p>
    <p style="text-align: left; padding: 0 1rem">
      <b>{{ meeting.isActive ? "Activo" : "Inactivo" }}</b
      ><br />
      <span
        ><b>Creado: </b
        ><span>{{ new Date(meeting.createdAt).toLocaleDateString() }}</span>
      </span>
      <span v-if="meeting.createdAt !== meeting.updatedAt"
        ><br />
        <b>Actualizado: </b
        ><span>{{
          new Date(meeting.updatedAt).toLocaleDateString()
        }}</span></span
      >
    </p>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "ProjectTask",
  components: {},
  data() {
    return {
      meeting: "",
    };
  },
  created() {
    this.getMeeting();
  },
  methods: {
    async getMeeting() {
      const data = await db.meetings[this.$route.params.meeting];

      if (data === undefined) {
        this.$router.replace({ name: "Error" });
      } else {
        this.meeting = await data;
      }
    },
  },
  watch: {
    $route: ["getMeeting"],
  },
};
</script>
