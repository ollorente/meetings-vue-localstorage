<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <TheSecondNavbar />

      <transition name="fade">
        <section class="section pt-3">
          <Project
            v-for="project in projects"
            :key="project._id"
            :project="project"
          />
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
import Project from '@/components/gadgets/Project'

export default {
  name: 'Projects',
  components: {
    TheNavbar,
    TheSecondNavbar,
    InfiniteLoading,
    Project
  },
  data () {
    return {
      path: {
        title: 'Proyectos',
        link: { name: 'Projects' },
        icon: 'fas fa-user-tie',
        status: true,
        search: true,
        linkSearch: { name: 'SearchProjects' }
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
      projects: [],
      limit: 10,
      page: 0
    }
  },
  methods: {
    async infiniteHandler ($state) {
      try {
        this.page++

        const res = await fetch(
          `${DB}/users/projects?limit=${this.limit}&page=${this.page}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }
        )

        const projectsData = await res.json()

        const projects = await projectsData.data
          .filter(e => e.isLock === false)
          .filter(e => e.isActive === true)

        if (projects.length) {
          this.projects = this.projects.concat(projects)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  }
}
</script>