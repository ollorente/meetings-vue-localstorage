<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getMeeting.name }}</h1>
          <Task v-for='task in tasks' :key='task.id' :task='task' />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

import TheNavbar from '@/components/TheNavbar'
import Task from '@/components/gadgets/Task'

export default {
  name: 'MeetingTasks',
  components: {
    TheNavbar,
    Task,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Actividades encuentro',
        link: {
          name: 'Meeting',
          params: { meeting: this.$route.params.meeting }
        },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true,
        linkSearch: {
          name: 'SearchMeetingTasks',
          params: { meeting: this.$route.params.meeting }
        }
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
      tasks: [],
      limit: 10,
      page: 0
    }
  },
  created () {
    this.fetchMeeting(this.$route.params.meeting)
  },
  methods: {
    ...mapActions(['fetchMeetingTasks', 'fetchMeeting']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchMeetingTasks({
        id: this.$route.params.meeting,
        limit: this.limit,
        page: this.page
      })

      let tasks = await this.getMeetingTasks

      if (tasks.length) {
        this.tasks = this.tasks.concat(tasks)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getMeetingTasks', 'getMeeting'])
  },
  watch: {
    $route: ['fetchMeetingTasks', 'fetchMeeting']
  }
}
</script>