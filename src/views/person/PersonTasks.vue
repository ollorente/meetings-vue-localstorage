<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getPerson.name }}</h1>
        <Task v-for='task in getPersonTasks' :key='task.id' :task='task' />
        <div class='card-alert' v-if='getPersonTasks.length < 1'>
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
  name: 'PersonTasks',
  components: {
    TheNavbar,
    Task
  },
  data () {
    return {
      path: {
        title: 'Tareas usuario',
        link: { name: 'Person', params: { person: this.$route.params.person } },
        icon: 'fas fa-arrow-left',
        status: false,
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
    this.fetchPerson(this.$route.params.person)
    this.fetchPersonTasks({
      id: this.$route.params.person,
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchPersonTasks', 'fetchPerson'])
  },
  computed: {
    ...mapGetters(['getPersonTasks', 'getPerson'])
  },
  watch: {
    $route: ['fetchPersonTasks', 'fetchPerson']
  }
}
</script>