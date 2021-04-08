<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getProject.name }}</h1>
        <Task v-for='task in getProjectTasks' :key='task.id' :task='task' />
        <div class='card-alert' v-if='getProjectTasks.length < 1'>
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
  name: 'ProjectTasks',
  components: {
    TheNavbar,
    Task
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
      limit: 10,
      page: 1
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
    this.fetchProjectTasks({
      id: this.$route.params.project,
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchProjectTasks', 'fetchProject'])
  },
  computed: {
    ...mapGetters(['getProjectTasks', 'getProject'])
  },
  watch: {
    $route: ['fetchProjectTasks', 'fetchProject']
  }
}
</script>