<template>
  <div class="content">
    <MainNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">Home</h1>
        <p><router-link :to="{ name: 'Tasks' }" class="link">Tareas</router-link></p>
      </section>
    </main>
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar'

export default {
  name: 'Home',
  components: {
    MainNavbar
  },
  data () {
    return {
      path: {
        title: 'MeetingsApp',
        link: { name: 'Home' },
        icon: '',
        status: true
      },
      options: [
        {
          menus: [
            {
              title: 'Registro',
              link: { name: 'Logup' },
              icon: '',
              status: false
            },
            {
              title: 'Login',
              link: { name: 'Login' },
              icon: '',
              status: false
            }
          ]
        }
      ]
    }
  }
}
</script>