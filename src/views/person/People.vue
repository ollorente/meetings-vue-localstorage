<template>
  <div class='content'>
    <TheNavbar :path='path' :options='options' />
    <main>
      <TheSecondNavbar />

      <transition name="bounce">
        <section class='section pt-3'>
          <User v-for='person in people' :key='person._id' :person='person' />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { db } from '@/main'
import InfiniteLoading from 'vue-infinite-loading'

import TheNavbar from '@/components/TheNavbar'
import TheSecondNavbar from '@/components/TheSecondNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'People',
  components: {
    TheNavbar,
    TheSecondNavbar,
    InfiniteLoading,
    User
  },
  data () {
    return {
      path: {
        title: 'Contactos',
        link: { name: 'People' },
        icon: 'fas fa-users',
        status: true,
        search: true,
        linkSearch: { name: 'SearchPeople' }
      },
      options: [
        {
          menus: [
            {
              title: 'Crear usuario',
              link: { name: 'NewPerson' },
              icon: 'fas fa-users',
              status: false
            }
          ]
        }
      ],
      people: [],
      limit: 10,
      page: 0
    }
  },
  methods: {
    async infiniteHandler ($state) {
      try {
        this.page++

        const res = await fetch(`${db}/people?limit=${this.limit}&page=${this.page}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })

        const person = await res.json()

        if (person.data.length) {
          this.people = this.people.concat(person.data)
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