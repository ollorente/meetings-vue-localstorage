<template>
  <div class="content">
    <MainNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">Logup</h1>
      </section>
    </main>
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar'

export default {
  name: 'Logup',
  components: {
    MainNavbar
  },
  data () {
    return {
      path: {
        title: 'MeetingsApp',
        link: { name: 'Home' },
        icon: '',
        status: false
      },
      options: [
        {
          menus: [
            {
              title: 'Registro',
              link: { name: 'Logup' },
              icon: '',
              status: true
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