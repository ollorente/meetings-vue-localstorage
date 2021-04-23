<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <div class="main__section__person">
            <h1 class="title">{{ getMeeting.name }}</h1>
            <p>
              {{ new Date(getMeeting.dateInt).toDateString('es') }} &bull;
              {{ new Date(getMeeting.dateInt).getUTCHours() }}:{{ new Date(getMeeting.dateInt).getUTCMinutes() }}
              -
              {{ new Date(getMeeting.dateEnd).getUTCHours() }}:{{ new Date(getMeeting.dateEnd).getUTCMinutes() }}
            </p>
            <div v-html="getMeeting.description"></div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content">
                <b>{{ getMeeting._collaboratorsCount }}</b>
                {{
                  getMeeting._collaboratorsCount === 1 ? "Invitado" : "Invitados"
                }}
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label">Proyecto:</span
              ><br />
              <span class="main__section__person__block__content">
                <router-link
                  :to="{ name: 'Project', params: { project: getMeeting.projectId } }"
                  class="text-p-light text-500"
                  >{{ getMeeting.projectName }}</router-link
                >
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Programada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(getMeeting.createdAt).toDateString()
              }}</span>
            </p>
            <p
              v-if="getMeeting.createdAt !== getMeeting.updatedAt"
              class="main__section__person__block"
            >
              <span class="main__section__person__block__label"
                >Actualizada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(getMeeting.updatedAt).toDateString()
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content"
                ><i
                  :class="getMeeting.isActive ? 'fas' : 'far'"
                  class="fa-circle"
                ></i>
                {{ getMeeting.isActive ? "Activa" : "Cancelada" }}</span
              ><br />
              <span class="main__section__person__block__content">
                <i
                  class="fas"
                  :class="getMeeting.isLock ? 'fa-lock' : 'fa-lock-open'"
                ></i>
                {{ getMeeting.isLock ? "Oculta" : "Pública" }}</span
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
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
      meeting: ''
    }
  },
  created () {
    this.fetchMeeting(this.$route.params.meeting)
  },
  methods: {
    ...mapActions(['deleteMeeting', 'fetchMeeting']),
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
  computed: {
    ...mapGetters(['getMeeting'])
  },
  watch: {
    $route: ['fetchMeeting']
  }
}
</script>