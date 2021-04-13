<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getPerson.name }}</h1>
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
  name: 'PersonTasks',
  components: {
    TheNavbar,
    Task,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Actividades usuario',
        link: { name: 'Person', params: { person: this.$route.params.person } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true,
        linkSearch: { name: 'SearchPersonTasks', params: { person: this.$route.params.person } }
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