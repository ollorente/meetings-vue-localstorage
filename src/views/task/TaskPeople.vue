<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getTask.name }}</h1>
        <User v-for='person in getTaskPeople' :key='person.id' :person='person' />
        <div class='card-alert' v-if='getTaskPeople.length < 1'>
          No hay usuarios 😒
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'TaskPeople',
  components: {
    TheNavbar,
    User
  },
  data () {
    return {
      path: {
        title: 'Usuarios tarea',
        link: { name: 'Task', params: { task: this.$route.params.task } },
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
    this.fetchTask(this.$route.params.task)
    this.fetchTaskPeople({
      id: this.$route.params.task,
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchTaskPeople', 'fetchTask'])
  },
  computed: {
    ...mapGetters(['getTaskPeople', 'getTask'])
  },
  watch: {
    $route: ['fetchTaskPeople', 'fetchTask']
  }
}
</script>