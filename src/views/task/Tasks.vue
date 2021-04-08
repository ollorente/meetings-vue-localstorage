<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <TheSecondNavbar />

      <section class="section">
        <Task v-for='task in getTasks' :key='task.id' :task='task' />
        <div class='card-alert' v-if='getTasks.length < 1'>
          No hay tareas 😁
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import TheSecondNavbar from '@/components/TheSecondNavbar'
import Task from '@/components/gadgets/Task'

export default {
  name: 'Tasks',
  components: {
    TheNavbar,
    TheSecondNavbar,
    Task
  },
  data () {
    return {
      path: {
        title: 'Tareas',
        link: { name: 'Tasks' },
        icon: 'fas fa-tasks',
        status: true,
        search: true
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
    this.fetchTasks({
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchTasks'])
  },
  computed: {
    ...mapGetters(['getTasks'])
  },
  watch: {
    $route: ['fetchTasks']
  }
}
</script>