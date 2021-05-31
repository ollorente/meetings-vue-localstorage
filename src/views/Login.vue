<template>
  <div class="content">
    <MainNavbar :path="path" :options="options" />
    <main class="full flex bg-p-light">
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">Login</h1>
          <form @submit.prevent="login">
            <div>
              <input
                type="email"
                v-model="user.email"
                id="email"
                placeholder="email@email.com"
                autofocus
                required
              />
            </div>
            <div>
              <input
                type="password"
                v-model="user.password"
                id="password"
                placeholder="********"
                required
              />
            </div>
            <button type="submit" class="btn-p-light">Entrar</button>
          </form>
        </section>
      </transition>
    </main>
    <pre class="container" hiddens>{{ $data }}</pre>
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
      user: {
        password: '',
        email: ''
      }
    }
  },
  methods: {
    ...mapActions(['auth']),
    async login () {
      try {
        if (
          this.user.email.trim() === '' ||
          this.user.password.trim() === ''
        ) {
          this.alert.error = true
          this.alert.msg = `Los campos no pueden estar vacíos.`

          setTimeout(() => {
            this.alert.error = false
          }, 4000)
        } else {
          await this.auth(this.user)

          await this.$router.replace({ name: 'Tasks' })
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  }
}
</script>