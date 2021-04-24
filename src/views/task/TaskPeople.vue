<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getTask.name }}</h1>
          <User v-for='person in people' :key='person._id' :person='person' />
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
  name: 'TaskPeople',
  components: {
    TheNavbar,
    User,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Contactos actividad',
        link: { name: 'Task', params: { task: this.$route.params.task } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true,
        linkSearch: { name: 'SearchTaskPeople', params: { task: this.$route.params.task } }
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
    this.fetchTask(this.$route.params.task)
  },
  methods: {
    ...mapActions(['fetchTask']),
    async infiniteHandler ($state) {
      this.page++

      const res = await fetch(`${db}/tasks/${this.$route.params.task}/people?limit=${this.limit}&page=${this.page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })

      const peopleData = await res.json()

      let people = await peopleData.data

      if (people.length) {
        this.people = this.people.concat(people)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getTask'])
  },
  watch: {
    $route: ['fetchTask']
  }
}
</script>