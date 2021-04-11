<template>
  <div class="content">
    <MainNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">Login</h1>
          <form @submit.prevent="login">
            <div>
              <input
                type="text"
                v-model="person.name"
                id="name"
                placeholder="Nombre de usuario"
                autofocus
                required
              />
            </div>
            <div>
              <input
                type="email"
                v-model="person.email"
                id="email"
                placeholder="email@email.com"
                required
              />
            </div>
            <button type="submit" class="btn-p-light">Entrar</button>
          </form>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import MainNavbar from '@/components/MainNavbar'
import Alert from '@/components/gadgets/Alert'

export default {
  name: 'Login',
  components: {
    Alert,
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
              status: false
            },
            {
              title: 'Login',
              link: { name: 'Login' },
              icon: '',
              status: true
            }
          ]
        }
      ],
      alert: {
        error: false,
        msg: null
      },
      person: {
        name: '',
        emali: ''
      }
    }
  },
  methods: {
    ...mapActions(['addPerson']),
    async login () {
      try {} catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  }
}
</script>