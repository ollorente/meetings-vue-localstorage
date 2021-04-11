<template>
  <div class="content">
    <div class="navbar">
      <span class="navbar__brand" @click="goToBack"><i :class="path.icon"></i> {{ path.title }}</span>
    </div>
    <main>
      <transition name="fade">
        <section class="section error">
          <i class="fas fa-exclamation-triangle"></i>
          <h1 class="title"><span class="title--first">404</span><br /><span class="title--second">!Página no encontrada!</span></h1>
          <router-link :to="{ name: 'Home' }">Volver al Home</router-link>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'Error',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Error',
        link: { name: 'Home' },
        icon: 'fas fa-arrow-left',
        status: true
      },
      options: [
        {
          menus: []
        }
      ]
    }
  },
  methods: {
    async goToBack () {
      this.$router.go(-1)
    }
  }
}
</script>