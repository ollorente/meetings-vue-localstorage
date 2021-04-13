<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getProject.name }}</h1>
          <div class="navbar__search">
            <form @submit.prevent="search">
              <input type="text" class="navbar__search--input mb-3" placeholder="Buscar...">
            </form>
          </div>
          <Task v-for='task in tasks' :key='task.id' :task='task' />
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Task from '@/components/gadgets/Task'

export default {
  name: 'SearchProjectTasks',
  components: {
    TheNavbar,
    Task
  },
  data () {
    return {
      path: {
        title: 'Actividades proyecto',
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