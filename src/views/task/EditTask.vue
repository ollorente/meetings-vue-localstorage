<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">{{ task.name }}</h1>
          <form @submit.prevent="putTask">
            <div>
              <input
                type="text"
                v-model="task.name"
                placeholder="Nombre de tarea"
                autofocus
                required
              />
            </div>
            <div>
              <textarea
                v-model="task.description"
                rows="10"
                placeholder="Descripción de la tarea"
              ></textarea>
            </div>
            <div>
              <select multiple v-model="task.collaborators">
                <option
                  v-for="person in people"
                  :key="person._id"
                  :value="person._id"
                >
                  {{ person.name }} - {{ person.email }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn-secondary">Editar</button>
          </form>
        </section>
      </transition>
      <pre class="container" hidden>{{ getTask }}</pre>
      <pre class="container" hidden>{{ $data }}</pre>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { db } from "@/main";

import TheNavbar from "@/components/TheNavbar";
import Alert from "@/components/gadgets/Alert";

export default {
  name: "EditTask",
  components: {
    Alert,
    TheNavbar,
  },
  data() {
    return {
      path: {
        title: "Editar actividad",
        link: { name: "Task", params: { task: this.$route.params.task } },
        icon: "fas fa-arrow-left",
        status: false,
        search: false,
      },
      options: [
        {
          menus: [],
        },
      ],
      alert: {
        error: false,
        msg: null,
      },
      task: {
        _id: "",
        name: "",
        description: "",
        collaborators: [],
        meeting: "",
        project: "",
        isActive: "",
        isLock: "",
      },
      people: [],
    };
  },
  mounted() {
    this.getMeetingPeople();
    this.task = {
      _id: this.getTask._id,
      name: this.getTask.name,
      description: this.getTask.description,
      collaborators: this.getTask._collaborators,
      meeting: this.getTask.meeting._id,
      project: this.getTask.project._id,
      isActive: this.getTask.isActive,
      isLock: this.getTask.isLock,
    };
  },
  created() {
    this.fetchTask(this.$route.params.task);
  },
  methods: {
    ...mapActions(["updateTask", "fetchTask"]),
    async getMeetingPeople() {
      const res = await fetch(
        `${db}/meetings/${this.getTask.meeting._id}/all-people`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const info = await res.json();

      this.people = info.data;
    },
    async putTask() {
      if (
        this.task.name.trim() === "" ||
        this.task.description.trim() === "" ||
        this.task.collaborators === ""
      ) {
        this.alert.error = true;
        this.alert.msg = `Los campos no pueden estar vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);
      } else {
        await this.updateTask(this.task);

        await this.$router.replace({
          name: "Task",
          params: { task: this.$route.params.task },
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getTask"]),
  },
  watch: {
    $route: ["fetchTask", "getMeetingPeople"],
  },
};
</script>
