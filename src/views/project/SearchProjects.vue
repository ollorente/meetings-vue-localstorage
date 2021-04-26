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
                placeholder="Buscar proyecto..."
                v-model="q"
                @keyup="search"
                autofocus
              />
            </form>
          </div>
          <Project
            v-for="project in projects"
            :key="project._id"
            :project="project"
          />
          <div class="my-3" v-if="show">No hay resultados</div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { DB } from '@/main'

import TheNavbar from '@/components/TheNavbar'
import Project from '@/components/gadgets/Project'

export default {
  name: 'SearchProjects',
  components: {
    TheNavbar,
    Project
  },
  data () {
    return {
      path: {
        title: 'Buscar proyecto',
        link: { name: 'Projects' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Crear proyecto',
              link: { name: 'NewProject' },
              icon: 'fas fa-user-tie',
              status: false
            }
          ]
        }
      ],
      show: true,
      projects: [],
      limit: 10,
      page: 1,
      q: ''
    }
  },
  methods: {
    async search () {
      const res = await fetch(
        `${DB}/users/all-projects`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      const projectsData = await res.json()

      const projects = projectsData.data
      const texto = this.q.toLowerCase()

      this.projects = []

      for (let project of projects) {
        let data = project.name.toLowerCase()

        if (data.indexOf(texto) !== -1) {
          this.projects = this.projects
            .concat(project)
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

        if (this.projects.length === 0) {
          this.show = true
        } else {
          this.show = false
        }
      }
    }
  }
}
</script>