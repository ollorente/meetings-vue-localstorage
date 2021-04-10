<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getMeeting.name }}</h1>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'EditMeeting',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Editar reunión',
        link: { name: 'Meeting', params: { meeting: this.$route.params.meeting } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: []
        }
      ]
    }
  },
  created () {
    this.fetchMeeting(this.$route.params.meeting)
  },
  methods: {
    ...mapActions(['fetchMeeting'])
  },
  computed: {
    ...mapGetters(['getMeeting'])
  },
  watch: {
    $route: ['fetchMeeting']
  }
}
</script>