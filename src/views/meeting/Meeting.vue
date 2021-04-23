<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <div class="main__section__person">
            <h1 class="title">{{ meeting.name }}</h1>
            <p>
              {{ new Date(meeting.dateInt).toDateString().substr(0, 10) }} &bull;
              {{ meeting.dateInt.substr(11, 5) }}
              -
              {{ meeting.dateEnd.substr(11, 5) }}
            </p>
            <div v-html="meeting.description"></div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content">
                <b>{{ meeting._collaboratorsCount }}</b>
                {{
                  meeting._collaboratorsCount === 1 ? "Invitado" : "Invitados"
                }}
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label">Proyecto:</span
              ><br />
              <span class="main__section__person__block__content">
                <router-link
                  :to="{ name: 'Project', params: { project: meeting.project._id } }"
                  class="text-p-light text-500"
                  >{{ meeting.project.name }}</router-link
                >
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Programada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(meeting.createdAt).toDateString().substr(0, 10)
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
                new Date(meeting.updatedAt).toDateString().substr(0, 10)
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
                <i
                  class="fas"
                  :class="meeting.isLock ? 'fa-lock' : 'fa-lock-open'"
                ></i>
                {{ meeting.isLock ? "Oculta" : "Pública" }}</span
              >
            </p>
            <div class="main__section__person__block--flex">
              <button @click="removeMeeting" class="btn-outline-s-dark">
                <i class="fas fa-trash"></i>
              </button>
              <button @click="editMeeting" class="btn-secondary">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </section>
      </transition>
    </main>{{ project }}
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
              title: 'Contactos',
              link: { name: 'MeetingPeople' },
              icon: 'fas fa-users',
              status: false
            }
          ]
        }
      ],
      meeting: '',
      project: ''
    }
  },
  mounted () {
    this.project = this.meeting.project
  },
  created () {
    this.getMeeting()
  },
  methods: {
    ...mapActions(['deleteMeeting']),
    async getMeeting () {
      try {
        const res = await fetch(`${db}/meetings/${this.$route.params.meeting}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })

        let meetings = await res.json()

        this.meeting = await meetings.data
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async editMeeting () {
      await this.$router.replace({
        name: 'EditMeeting',
        params: { meeting: this.$route.params.meeting }
      })
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