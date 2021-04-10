<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <div class="main__section__person">
            <h1 class="title">{{ getMeeting.name }}</h1>
            <p>{{ new Date(getMeeting.dateInt).toString().split(" ")[0] }} {{ new Date(getMeeting.dateInt).toString().split(" ")[1] }} {{ new Date(getMeeting.dateInt).toString().split(" ")[2] }} &bull; {{ new Date(getMeeting.dateInt).toString().split(" ")[4] }} -  {{ new Date(getMeeting.dateEnd).toString().split(" ")[4] }}</p>
            <div v-html="getMeeting.description"></div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Proyecto:</span
              ><br />
              <span class="main__section__person__block__content">
                <LinkProject :projectId="getMeeting.project" />
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Programada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(getMeeting.createdAt).toLocaleDateString()
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
                new Date(getMeeting.updatedAt).toLocaleDateString()
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
                <i class="fas" :class="getMeeting.isLock ? 'fa-lock' : 'fa-lock-open'"></i>
                {{ getMeeting.isLock ? "Oculta" : "Pública" }}</span
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
        title: 'Reunión',
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
              title: 'Tareas',
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
      ]
    }
  },
  created () {
    this.fetchMeeting(this.$route.params.meeting)
  },
  methods: {
    ...mapActions(['fetchMeeting', 'deleteMeeting']),
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