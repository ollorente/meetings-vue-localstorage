<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <div class="main__section__person">
            <h1 class="title">{{ task.name }}</h1>
            <div v-html="task.description"></div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content">
                <b>{{ task.collaborators.length }}</b> {{ task.collaborators.length === 1 ? 'Colaborador' : 'Colaboradores' }}
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label">Proyecto:</span
              ><br />
              <span class="main__section__person__block__content">
                <router-link :to="{ name: 'Project', params: { project: project.id } }">{{ project.name }}</router-link>
              </span>
            </p>
            <div class="main__section__person__block">
              <div class="main__section__card">
                <div class="main__section__card__date">
                  <span class="main__section__card__month">{{
                    new Date(meeting.dateInt).toString().split(" ")[1]
                  }}</span>
                  <span class="main__section__card__day">{{
                    new Date(meeting.dateInt).toString().split(" ")[2]
                  }}</span>
                </div>
                <router-link
                  :to="{ name: 'Meeting', params: { meeting: meeting.id } }"
                  class="main__section__card__body"
                >
                  <span class="main__section__link__text__content">
                    <span class="text-title">{{ meeting.name }}</span>
                    <span class="text-content"
                      >{{ new Date(meeting.dateInt).toString().split(" ")[4] }} -
                      {{ new Date(meeting.dateEnd).toString().split(" ")[4] }}</span
                    >
                  </span>
                </router-link>
              </div>
            </div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Creada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(task.createdAt).toLocaleDateString()
              }}</span>
            </p>
            <p
              v-if="task.createdAt !== task.updatedAt"
              class="main__section__person__block"
            >
              <span class="main__section__person__block__label"
                >Actualizada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(task.updatedAt).toLocaleDateString()
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content"
                ><i
                  :class="task.isActive ? 'fas' : 'far'"
                  class="fa-circle"
                ></i>
                {{ task.isActive ? "Activa" : "Inactiva" }}</span
              ><br />
              <span class="main__section__person__block__content">
                <i class="fas" :class="task.isLock ? 'fa-lock' : 'fa-lock-open'"></i>
                {{ task.isLock ? "Oculta" : "Pública" }}</span
              >
            </p>
            <p class="main__section__person__block"></p>
            <form class="main__section__person__block">
              <button @click="removeTask" class="btn-outline-s-dark">
                Eliminar
              </button>
            </form>
          </div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { db } from '@/main'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'Task',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Tarea',
        link: { name: 'Tasks' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Editar',
              link: { name: 'EditTask' },
              icon: 'fas fa-tasks',
              status: false
            },
            {
              title: 'Usuarios',
              link: { name: 'TaskPeople' },
              icon: 'fas fa-users',
              status: false
            }
          ]
        }
      ],
      meeting: '',
      project: '',
      task: {
        id: '',
        name: '',
        description: '',
        collaborators: [],
        meeting: '',
        project: '',
        isActive: '',
        isLock: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  created () {
    this.getTask()
  },
  methods: {
    ...mapActions(['deleteTask']),
    async getTask () {
      try {
        const data = await db.tasks[this.$route.params.task]

        this.task = {
          id: await data.id,
          name: await data.name,
          description: await data.description,
          collaborators: await data.collaborators,
          meeting: await data.meeting,
          project: await data.project,
          isActive: await data.isActive,
          isLock: await data.isLock,
          createdAt: await data.createdAt,
          updatedAt: await data.updatedAt
        }

        await this.getMeeting(this.task.meeting)
        await this.getProject(this.task.project)
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async getMeeting (id) {
      try {
        this.meeting = await db.meetings[id]
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async getProject (id) {
      try {
        this.project = await db.projects[id]
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async removeTask () {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        const task = await this.getTask

        await this.deleteTask(task.id)

        await this.$router.replace({
          name: 'Tasks'
        })
      }
    }
  },
  watch: {
    $route: ['getTask']
  }
}
</script>