<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <div class="navbar__search">
            <form @submit.prevent="search">
              <form @submit.prevent="search">
              <input
                type="text"
                class="navbar__search--input mb-3"
                placeholder="Buscar..."
                v-model="q"
                @keyup="search"
                autofocus
              />
            </form>
            </form>
          </div>
          <Meeting v-for='meeting in meetings' :key='meeting.id' :meeting='meeting' />
          <div class="card" v-if="show">No hay resultados</div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { db } from '@/main'

import TheNavbar from '@/components/TheNavbar'
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'SearchMeetings',
  components: {
    TheNavbar,
    Meeting
  },
  data () {
    return {
      path: {
        title: 'Buscar encuentro',
        link: { name: 'Meetings' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: []
        }
      ],
      meetings: [],
      limit: 10,
      page: 0,
      show: true,
      q: ''
    }
  },
  methods: {
    async search () {
      this.meetings = await db.meetings
    }
  }
}
</script>