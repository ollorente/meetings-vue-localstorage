<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <TheSecondNavbar />

      <transition name="fade">
        <section class="section pt-3">
          <Task v-for='task in tasks' :key='task._id' :task='task' />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { DB } from '@/main'
import InfiniteLoading from 'vue-infinite-loading'

import TheNavbar from '@/components/TheNavbar'
import TheSecondNavbar from '@/components/TheSecondNavbar'
import Task from '@/components/gadgets/Task'

export default {
  name: 'Tasks',
  components: {
    TheNavbar,
    TheSecondNavbar,
    InfiniteLoading,
    Task
  },
  data () {
    return {
      path: {
        title: 'Actividades',
        link: { name: 'Tasks' },
        icon: 'fas fa-tasks',
        status: true,
        search: true,
        linkSearch: { name: 'SearchTasks' }
      },
      options: [
        {
          menus: [],
          database: `tasks`
        }
      ],
      tasks: [],
      limit: 10,
      page: 0
    }
  },
  methods: {
    async infiniteHandler ($state) {
      this.page++

      const res = await fetch(
        `${DB}/users/tasks?limit=${this.limit}&page=${this.page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      const tasks = await res.json()

      if (tasks.data.length) {
        this.tasks = this.tasks.concat(tasks.data)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  }
}
</script>