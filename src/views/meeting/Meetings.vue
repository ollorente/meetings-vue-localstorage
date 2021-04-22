<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <TheSecondNavbar />

      <transition name="fade">
        <section class="section">
          <Meeting
            v-for="meeting in meetings"
            :key="meeting._id"
            :meeting="meeting"
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
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'Meetings',
  components: {
    TheNavbar,
    TheSecondNavbar,
    InfiniteLoading,
    Meeting
  },
  data () {
    return {
      path: {
        title: 'Encuentros',
        link: { name: 'Meetings' },
        icon: 'fas fa-handshake',
        status: true,
        search: true,
        linkSearch: { name: 'SearchMeetings' }
      },
      options: [
        {
          menus: []
        }
      ],
      meetings: [],
      limit: 10,
      page: 0
    }
  },
  methods: {
    async infiniteHandler ($state) {
      this.page++

      const res = await fetch(
        `${DB}/users/meetings?limit=${this.limit}&page=${this.page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      let meetings = await res.json()

      if (meetings.data.length) {
        this.meetings = this.meetings.concat(meetings.data)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  }
}
</script>