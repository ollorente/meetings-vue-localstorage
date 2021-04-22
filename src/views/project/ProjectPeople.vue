<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getProject.name }}</h1>
          <User
            v-for="person in people"
            :key="person._id"
            :person="person"
          />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '@/main'
import InfiniteLoading from 'vue-infinite-loading'

import TheNavbar from '@/components/TheNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'ProjectProjectPeople',
  components: {
    TheNavbar,
    InfiniteLoading,
    User
  },
  data () {
    return {
      path: {
        title: 'Usuarios proyecto',
        link: {
          name: 'Project',
          params: { project: this.$route.params.project }
        },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true,
        linkSearch: {
          name: 'SearchProjectPeople',
          params: { project: this.$route.params.project }
        }
      },
      options: [
        {
          menus: []
        }
      ],
      people: [],
      limit: 10,
      page: 0
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
  },
  methods: {
    ...mapActions(['fetchProject']),
    async infiniteHandler ($state) {
      this.page++

      const res = await fetch(
        `${db}/projects/${this.$route.params.project}/people?limit=${this.limit}&page=${this.page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      let people = await res.json()

      if (people.data.length) {
        this.people = this.people.concat(people.data)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getProject'])
  },
  watch: {
    $route: ['fetchProject']
  }
}
</script>