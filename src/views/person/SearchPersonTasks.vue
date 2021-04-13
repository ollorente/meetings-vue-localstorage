<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getPerson.name }}</h1>
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
  name: 'SearchPersonTasks',
  components: {
    TheNavbar,
    Task
  },
  data () {
    return {
      path: {
        title: 'Buscar actividad usuario',
        link: { name: 'PersonTasks', params: { person: this.$route.params.person } },
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
    this.fetchPerson(this.$route.params.person)
  },
  methods: {
    ...mapActions(['fetchPersonTasks', 'fetchPerson']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchPersonTasks({
        id: this.$route.params.person,
        limit: this.limit,
        page: this.page
      })

      let tasks = await this.getPersonTasks

      if (tasks.length) {
        this.tasks = this.tasks.concat(tasks)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getPersonTasks', 'getPerson'])
  },
  watch: {
    $route: ['fetchPersonTasks', 'fetchPerson']
  }
}
</script>