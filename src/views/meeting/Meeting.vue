<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <div class="main__section__person">
            <h1 class="title">{{ meeting.name }}</h1>
            <p>{{ new Date(meeting.dateInt).toString().split(" ")[0] }} {{ new Date(meeting.dateInt).toString().split(" ")[1] }} {{ new Date(meeting.dateInt).toString().split(" ")[2] }} &bull; {{ new Date(meeting.dateInt).toString().split(" ")[4] }} -  {{ new Date(meeting.dateEnd).toString().split(" ")[4] }}</p>
            <div v-html="meeting.description"></div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content">
                <b>{{ meeting.collaborators.length }}</b> {{ meeting.collaborators.length === 1 ? 'Invitado' : 'Invitados' }}
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Proyecto:</span
              ><br />
              <span class="main__section__person__block__content">
                <router-link :to="{ name: 'Project', params: { project: project.id } }" class="text-p-light text-500">{{ project.name }}</router-link>
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Programada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(meeting.createdAt).toLocaleDateString()
              }}</span>
            </p>
            <p
              v-if="meeting.createdAt !== meeting.updatedAt"
              class="main__section__person__block"
            >
              <span class="main__section__person__block__label"
                >Actualizada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(meeting.updatedAt).toLocaleDateString()
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content"
                ><i
                  :class="meeting.isActive ? 'fas' : 'far'"
                  class="fa-circle"
                ></i>
                {{ meeting.isActive ? "Activa" : "Cancelada" }}</span
              ><br />
              <span class="main__section__person__block__content">
                <i class="fas" :class="meeting.isLock ? 'fa-lock' : 'fa-lock-open'"></i>
                {{ meeting.isLock ? "Oculta" : "Pública" }}</span
              >
            </p>
            <p class="main__section__person__block"></p>
            <form class="main__section__person__block">
              <button @click="removeMeeting" class="btn-outline-s-dark">
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

import LinkProject from '@/components/gadgets/LinkProject'
import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'Meeting',
  components: {
    LinkProject,
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Encuentro',
        link: { name: 'Meetings' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Editar',
              link: { name: 'EditMeeting' },
              icon: 'fas fa-handshake',
              status: false
            },
            {
              title: 'Actividades',
              link: { name: 'MeetingTasks' },
              icon: 'fas fa-tasks',
              status: false
            },
            {
              title: 'Usuarios',
              link: { name: 'MeetingPeople' },
              icon: 'fas fa-users',
              status: false
            }
          ]
        }
      ],
      meeting: {
        id: '',
        name: '',
        description: '',
        collaborators: [],
        project: '',
        dateInt: '',
        dateEnd: '',
        isActive: '',
        isLock: '',
        createdAt: '',
        updatedAt: ''
      },
      project: ''
    }
  },
  created () {
    this.getMeeting()
  },
  methods: {
    ...mapActions(['deleteMeeting']),
    async getMeeting () {
      try {
        const data = await db.meetings[this.$route.params.meeting]

        this.meeting = {
          id: await data.id,
          name: await data.name,
          description: await data.description,
          collaborators: await data.collaborators,
          project: await data.project,
          dateInt: await data.dateInt,
          dateEnd: await data.dateEnd,
          isActive: await data.isActive,
          isLock: await data.isLock,
          createdAt: await data.createdAt,
          updatedAt: await data.updatedAt
        }

        await this.getProject(this.meeting.project)
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
    async removeMeeting () {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.deleteMeeting(this.$route.params.meeting)

        await this.$router.replace({ name: 'Meetings' })
      }
    }
  },
  watch: {
    $route: ['getMeeting']
  }
}
</script>