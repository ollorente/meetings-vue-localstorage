<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <TheSecondNavbar />

      <section class="section">
        <Project v-for='project in getProjects' :key='project.id' :project='project' />
        <div class='card-alert' v-if='getProjects.length < 1'>
          No hay proyectos 😒
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import TheSecondNavbar from '@/components/TheSecondNavbar'
import Project from '@/components/gadgets/Project'

export default {
  name: 'Projects',
  components: {
    TheNavbar,
    TheSecondNavbar,
    Project
  },
  data () {
    return {
      path: {
        title: 'Proyectos',
        link: { name: 'Projects' },
        icon: 'fas fa-user-tie',
        status: true,
        search: true
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
      limit: 10,
      page: 1
    }
  },
  created () {
    this.fetchProjects({
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchProjects'])
  },
  computed: {
    ...mapGetters(['getProjects'])
  },
  watch: {
    $route: ['fetchProjects']
  }
}
</script>