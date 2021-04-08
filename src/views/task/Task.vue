<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getTask.name }}</h1>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'Task',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Tarea',
        link: { name: 'Tasks' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Editar',
              link: { name: 'EditTask' },
              icon: 'fas fa-tasks',
              status: false
            },
            {
              title: 'Usuarios',
              link: { name: 'TaskPeople' },
              icon: 'fas fa-users',
              status: false
            }
          ]
        }
      ]
    }
  },
  created () {
    this.fetchTask(this.$route.params.task)
  },
  methods: {
    ...mapActions(['fetchTask'])
  },
  computed: {
    ...mapGetters(['getTask'])
  },
  watch: {
    $route: ['fetchTask']
  }
}
</script>