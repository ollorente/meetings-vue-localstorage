<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getProject.name }}</h1>
          <div class="navbar__search">
            <form @submit.prevent="search">
              <input
                type="text"
                class="navbar__search--input mb-3"
                placeholder="Buscar encuentro..."
                v-model="q"
                @keyup="search"
                autofocus
              />
            </form>
          </div>
          <Meeting
            v-for="meeting in meetings"
            :key="meeting._id"
            :meeting="meeting"
          />
          <div class="my-3" v-if="show">No hay resultados</div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '@/main'

import TheNavbar from '@/components/TheNavbar'
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'SearchProjectMeetings',
  components: {
    TheNavbar,
    Meeting
  },
  data () {
    return {
      path: {
        title: 'Buscar encuentro proyecto',
        link: {
          name: 'ProjectMeetings',
          params: { project: this.$route.params.project }
        },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: []
        }
      ],
      show: true,
      meetings: [],
      limit: 10,
      page: 1,
      q: ''
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
  },
  methods: {
    ...mapActions(['fetchProject']),
    async search () {
      const res = await fetch(
        `${db}/projects/${this.$route.params.project}/all-meetings`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      const meetings = await res.json()
      const texto = this.q.toLowerCase()

      this.meetings = []

      for (let meeting of meetings.data) {
        let data = meeting.name.toLowerCase()

        if (data.indexOf(texto) !== -1) {
          this.meetings = this.meetings
            .concat(meeting)
            .filter((e) => e.isActive === true)
            .sort(function (a, b) {
              if (a.name > b.name) {
                return 1
              }
              if (a.name < b.name) {
                return -1
              }
              return 0
            })
        }

        if (this.meetings.length === 0) {
          this.show = true
        } else {
          this.show = false
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getProject'])
  },
  watch: {
    $route: ['fetchProject']
  }
}
</script>