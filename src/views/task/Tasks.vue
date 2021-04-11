<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <TheSecondNavbar />

      <transition name="fade">
        <section class="section">
          <Task v-for='task in tasks' :key='task.id' :task='task' />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </section>{{ $data }}
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

import TheNavbar from '@/components/TheNavbar'
import TheSecondNavbar from '@/components/TheSecondNavbar'
import Task from '@/components/gadgets/Task'

export default {
  name: 'Tasks',
  components: {
    TheNavbar,
    TheSecondNavbar,
    Task,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Actividades',
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
      tasks: [],
      limit: 10,
      page: 0
    }
  },
  methods: {
    ...mapActions(['fetchTasks']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchTasks({
        limit: this.limit,
        page: this.page
      })

      let tasks = await this.getTasks

      if (tasks.length) {
        this.tasks = this.tasks.concat(tasks)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getTasks'])
  },
  watch: {
    $route: ['fetchTasks']
  }
}
</script>