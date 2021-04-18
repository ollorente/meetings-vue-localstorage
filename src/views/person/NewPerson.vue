<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">Crear usuario</h1>
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
            <button type="submit" class="btn-p-light">Agregar</button>
          </form>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Alert from '@/components/gadgets/Alert'

export default {
  name: 'NewPerson',
  components: {
    Alert,
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Crear usuario',
        link: { name: 'People' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: []
        }
      ],
      alert: {
        error: false,
        msg: null
      },
      person: {
        name: '',
        email: '',
        role: ''
      }
    }
  },
  methods: {
    ...mapActions(['addPerson']),
    async newPerson () {
      try {
        if (this.person.name.trim() === '' || this.person.email.trim() === '') {
          this.alert.error = true
          this.alert.msg = `Los campos no pueden estar vacíos.`

          setTimeout(() => {
            this.alert.error = false
          }, 4000)
        } else {
          await this.addPerson(this.person)

          await this.$router.replace({ name: 'People' })
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  }
}
</script>