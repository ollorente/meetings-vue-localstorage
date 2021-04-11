<template>
  <div class="content">
    <MainNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">Registro</h1>
          <form @submit.prevent="newPerson">
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
            <div>
              <input
                type="text"
                v-model="person.role"
                id="role"
                placeholder="Cargo"
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
import { db } from '@/main'

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
      person: {
        name: '',
        emali: '',
        role: ''
      }
    }
  },
  methods: {
    ...mapActions(['addPerson']),
    async newPerson () {
      try {
        const userEmail = Object.values(db.people).filter(
          (e) => e.email === this.person.email.trim()
        )

        if (userEmail.length > 0) {
          this.alert.error = true
          this.alert.msg = `El correo ya existe.`

          setTimeout(() => {
            this.alert.error = false
          }, 4000)
        } else {
          if (
            this.person.name.trim() === '' ||
            this.person.email.trim() === ''
          ) {
            this.alert.error = true
            this.alert.msg = `Los campos no pueden estar vacíos.`

            setTimeout(() => {
              this.alert.error = false
            }, 4000)
          } else {
            await this.addPerson(this.person)

            this.person.name = ''
            this.person.email = ''
            this.person.role = ''

            await this.$router.replace({ name: 'Login' })
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  }
}
</script>