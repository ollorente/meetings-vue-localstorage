<template>
  <div class="content">
    <MainNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">Registro</h1>
          <form @submit.prevent="newUser">
            <div>
              <input
                type="text"
                v-model="user.name"
                id="name"
                placeholder="Nombre completo"
                autofocus
              />
            </div>
            <div>
              <input
                type="text"
                v-model="user.username"
                id="username"
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div>
              <input
                type="email"
                v-model="user.email"
                id="email"
                placeholder="email@email.com"
                required
              />
            </div>
            <div>
              <input
                type="password"
                v-model="user.password"
                id="password"
                placeholder="Contraseña"
                required
              />
            </div>
            <button type="submit" class="btn-p-light">Registrame</button>
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
  name: 'Logup',
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
      ],
      alert: {
        error: false,
        msg: null
      },
      user: {
        name: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['addUser']),
    async newUser () {
      try {
        if (
          this.user.username.trim() === '' ||
          this.user.email.trim() === '' ||
          this.user.password.trim() === ''
        ) {
          this.alert.error = true
          this.alert.msg = `Los campos no pueden estar vacíos.`

          setTimeout(() => {
            this.alert.error = false
          }, 4000)
        } else {
          await this.addUser(this.user)

          await this.$router.replace({ name: 'Login' })
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  }
}
</script>