<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getPerson.name }}</h1>
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
    </main><pre class="container">{{ $data }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '@/main'

import TheNavbar from '@/components/TheNavbar'
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'SearchPersonMeetings',
  components: {
    TheNavbar,
    Meeting
  },
  data () {
    return {
      path: {
        title: 'Buscar encuentro contacto',
        link: { name: 'PersonMeetings', params: { person: this.$route.params.person } },
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
      page: 0,
      q: ''
    }
  },
  created () {
    this.fetchPerson(this.$route.params.person)
  },
  methods: {
    ...mapActions(['fetchPerson']),
    async search () {
      const res = await fetch(
        `${db}/people/${this.$route.params.person}/meetings`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      const meetingsData = await res.json()

      const meetings = meetingsData.data
      const texto = this.q.toLowerCase()

      this.meetings = []

      for (let meeting of meetings) {
        let data = meeting.name.toLowerCase()

        if (data.indexOf(texto) !== -1) {
          this.meetings = this.meetings
            .concat(meeting)
            .sort(function (a, b) {
              if (a.name > b.name) {
                return 1
              }
              if (a.name < b.name) {
                return -1
              }
              return 0
            })
            .splice(this.page, this.limit)
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
    ...mapGetters(['getPerson'])
  },
  watch: {
    $route: ['fetchPerson']
  }
}
</script>