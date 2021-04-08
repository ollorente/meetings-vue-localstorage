<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getMeeting.name }}</h1>
        <Task v-for='task in getMeetingTasks' :key='task.id' :task='task' />
        <div class='card-alert' v-if='getMeetingTasks.length < 1'>
          No hay tareas 😁
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Task from '@/components/gadgets/Task'

export default {
  name: 'MeetingTasks',
  components: {
    TheNavbar,
    Task
  },
  data () {
    return {
      path: {
        title: 'Tareas reunión',
        link: {
          name: 'Meeting',
          params: { meeting: this.$route.params.meeting }
        },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true
      },
      options: [
        {
          menus: [
            {
              title: 'Crear tarea',
              link: {
                name: 'NewMeetingTask',
                params: { meeting: this.$route.params.meeting }
              },
              icon: 'fas fa-tasks'
            }
          ]
        }
      ],
      limit: 10,
      page: 1
    }
  },
  created () {
    this.fetchMeeting(this.$route.params.meeting)
    this.fetchMeetingTasks({
      id: this.$route.params.meeting,
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchMeetingTasks', 'fetchMeeting'])
  },
  computed: {
    ...mapGetters(['getMeetingTasks', 'getMeeting'])
  },
  watch: {
    $route: ['fetchMeetingTasks', 'fetchMeeting']
  }
}
</script>