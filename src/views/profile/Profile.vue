<template>
  <div class="content">
    <MainNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1>Perfil</h1>
          <p></p>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar'

export default {
  name: 'Profile',
  components: {
    MainNavbar
  },
  data () {
    return {
      path: {
        title: 'Perfil',
        link: { name: 'Tasks' },
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
  }
}
</script>