<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <div class="navbar__search">
            <form @submit.prevent="search">
              <input
                type="text"
                class="navbar__search--input mb-3"
                placeholder="Buscar actividad..."
                v-model="q"
                @keyup="search"
                autofocus
              />
            </form>
          </div>
          <Task v-for='task in tasks' :key='task.id' :task='task' />
          <div class="my-3" v-if="show">No hay resultados</div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { DB } from '@/main'

import TheNavbar from '@/components/TheNavbar'
import Task from '@/components/gadgets/Task'

export default {
  name: 'SearchTasks',
  components: {
    TheNavbar,
    Task
  },
  data () {
    return {
      path: {
        title: 'Buscar actividad',
        link: { name: 'Tasks' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [],
          database: `tasks`
        }
      ],
      show: true,
      tasks: [],
      limit: 10,
      page: 0,
      q: ''
    }
  },
  methods: {
    async search () {
      const res = await fetch(`${DB}/users/all-tasks`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })

      const tasksData = await res.json()

      const tasks = await tasksData.data
      const texto = this.q.toLowerCase()

      this.tasks = []

      for (let task of tasks) {
        let data = task.name.toLowerCase()

        if (data.indexOf(texto) !== -1) {
          this.tasks = this.tasks
            .concat(task)
            .filter((e) => e.isActive === true)
            .sort(function (a, b) {
              if (a.name > b.name) {
                return 1
              }
              if (a.name < b.name) {
                return -1
              }
              return 0
            })
        }

        if (this.tasks.length === 0) {
          this.show = true
        } else {
          this.show = false
        }
      }
    }
  }
}
</script>