<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getProject.name }}</h1>
          <Task v-for='task in tasks' :key='task._id' :task='task' />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '@/main'
import InfiniteLoading from 'vue-infinite-loading'

import TheNavbar from '@/components/TheNavbar'
import Task from '@/components/gadgets/Task'

export default {
  name: 'ProjectTasks',
  components: {
    TheNavbar,
    Task,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Actividades proyecto',
        link: { name: 'Project', params: { project: this.$route.params.project } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true,
        linkSearch: { name: 'SearchProjectTasks', params: { project: this.$route.params.project } }
      },
      options: [
        {
          menus: []
        }
      ],
      tasks: [],
      limit: 10,
      page: 0
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
  },
  methods: {
    ...mapActions(['fetchProject']),
    async infiniteHandler ($state) {
      this.page++

      const res = await fetch(
        `${db}/projects/${this.$route.params.project}/tasks?limit=${this.limit}&page=${this.page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      let tasks = await res.json()

      if (tasks.data.length) {
        this.tasks = this.tasks.concat(tasks.data)
        $state.loaded()
      } else {
        $state.complete()
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