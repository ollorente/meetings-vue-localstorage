<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getProject.name }}</h1>
        <Task v-for='task in tasks' :key='task.id' :task='task' />
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
        title: 'Tareas proyecto',
        link: { name: 'Project', params: { project: this.$route.params.project } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
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
    ...mapActions(['fetchProjectTasks', 'fetchProject']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchProjectTasks({
        id: this.$route.params.project,
        limit: this.limit,
        page: this.page
      })

      let tasks = await this.getProjectTasks

      if (tasks.length) {
        this.tasks = this.tasks.concat(tasks)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getProjectTasks', 'getProject'])
  },
  watch: {
    $route: ['fetchProjectTasks', 'fetchProject']
  }
}
</script>