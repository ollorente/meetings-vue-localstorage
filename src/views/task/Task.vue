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
            <h1 class="main__body__section__nav--title">Tarea</h1>
            <h2 class="main__body__section__nav--subtitle">
              {{ task.name }}
            </h2>
            <p>
              <span>{{ meeting.name }}</span
              ><br /><span
                ><router-link
                  :to="{ name: 'Project', params: { project: project.id } }"
                  class="link"
                  >{{ project.name }}</router-link
                ></span
              >
            </p>
            <div v-html="task.description"></div>
            <p>
              <span v-for="person in people" :key="person.id"
                ><router-link
                  :to="{ name: 'Person', params: { person: person.id } }"
                  class="link"
                  >{{ person.name }}</router-link
                ><br
              /></span>
            </p>
            <p>
              <span>{{ task.start ? "Iniciado" : "Sin iniciar" }}</span
              ><br />
              <span>{{ task.check ? "Terminado" : "Sin terminar" }}</span
              ><br />
              <span>{{ task.isActive ? "Activo" : "Inactivo" }}</span
              ><br />
              <span>{{ task.isLock ? "Bloqueado" : "público" }}</span
              ><br />
            </p>
            <p>
              <span
                ><span>Asignada:</span>
                <span>{{
                  new Date(task.createdAt).toLocaleString()
                }}</span></span
              >
              <span v-if="task.createdAt !== task.updatedAt"
                ><br /><span>Actualizda:</span>
                <span>{{
                  new Date(task.updatedAt).toLocaleString()
                }}</span></span
              >
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
  name: "Task",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      meeting: "",
      people: [],
      project: "",
      task: "",
      titleApp: "Tarea",
      icon: "fas fa-arrow-left",
      link: `/tarea/${this.$route.params.task}`,
      options: [
        {
          menus: [
            {
              title: "Editar",
              link: `/tarea/${this.$route.params.task}/editar`,
              icon: "fas fa-user-edit",
            },
            {
              title: "Usuarios",
              link: `/tarea/${this.$route.params.task}/usuarios`,
              icon: "fas fa-users",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.getTask();
    this.getPeople();
  },
  methods: {
    async getTask() {
      this.task = await db.tasks[this.$route.params.task];

      await this.getProject(this.task.projectId);
      await this.getMeeting(this.task.meetingId);
    },
    async getProject(id) {
      this.project = await db.projects[id];
    },
    async getMeeting(id) {
      this.meeting = await db.meetings[id];
    },
    async getPeople() {
      this.people = await db.taskPeople[this.$route.params.task];
    },
  },
  watch: {
    $route: ["getTask"],
  },
};
</script>
