<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getMeeting.name }}</h1>
          <div class="navbar__search">
            <form @submit.prevent="search">
              <input
                type="text"
                class="navbar__search--input mb-3"
                placeholder="Buscar actividad..."
                v-model="q"
                @keyup="search"
                autofocus
              />
            </form>
          </div>
          <Task v-for='task in tasks' :key='task._id' :task='task' />
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
import Task from '@/components/gadgets/Task'

export default {
  name: 'SearchMeetingTasks',
  components: {
    TheNavbar,
    Task
  },
  data () {
    return {
      path: {
        title: 'Actividades encuentro',
        link: {
          name: 'MeetingTasks',
          params: { meeting: this.$route.params.meeting }
        },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Crear actividad',
              link: {
                name: 'NewMeetingTask',
                params: { meeting: this.$route.params.meeting }
              },
              icon: 'fas fa-tasks'
            }
          ]
        }
      ],
      show: true,
      tasks: [],
      limit: 10,
      page: 0,
      q: ''
    }
  },
  created () {
    this.fetchMeeting(this.$route.params.meeting)
  },
  methods: {
    ...mapActions(['fetchMeeting']),
    async search () {
      const res = await fetch(
        `${db}/meetings/${this.$route.params.meeting}/all-tasks`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      let tasksData = await res.json()

      const tasks = await tasksData.data
      const texto = this.q.toLowerCase()

      this.tasks = []

      for (let task of tasks) {
        let data = task.name.toLowerCase()

        if (data.indexOf(texto) !== -1) {
          this.tasks = this.tasks
            .concat(task)
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

        if (this.tasks.length === 0) {
          this.show = true
        } else {
          this.show = false
        }
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