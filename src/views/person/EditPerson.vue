<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">{{ person.name }}</h1>
          <form @submit.prevent="putPerson">
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
                v-model="person.photoURL"
                id="role"
                placeholder="Imagen del usuario"
              />
            </div>
            <div>
              <input
                type="text"
                v-model="person.phone"
                id="role"
                placeholder="Teléfono"
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
            <button type="submit" class="btn-secondary">Editar</button>
          </form>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { db } from '@/main'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'EditPerson',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Editar usuario',
        link: { name: 'Person', params: { person: this.$route.params.person } },
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
        id: '',
        name: '',
        email: '',
        photoURL: '',
        phone: '',
        role: '',
        isLock: '',
        isActive: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  created () {
    this.getPerson()
  },
  methods: {
    ...mapActions(['getPerson', 'updatePerson']),
    async getPerson () {
      try {
        const data = await db.people[this.$route.params.person]

        if (data === undefined) {
          this.$router.replace({
            name: 'People'
          })
        } else {
          this.person = {
            id: await data.id,
            name: await data.name,
            email: await data.email,
            photoURL: await data.photoURL,
            phone: await data.phone,
            role: await data.role,
            isLock: await data.isLock,
            isActive: await data.isActive,
            createdAt: await data.createdAt,
            updatedAt: await data.updatedAt
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async putPerson () {
      try {
        if (this.person.name.trim() === '' || this.person.email.trim() === '') {
          this.alert.error = true
          this.alert.msg = `Los campos no pueden estar vacíos.`

          setTimeout(() => {
            this.alert.error = false
          }, 4000)
        } else {
          await this.updatePerson(this.person)

          this.person.name = ''
          this.person.email = ''
          this.person.photoURL = ''
          this.person.phone = ''
          this.person.role = ''

          await this.$router.replace({
            name: 'Person',
            params: { person: this.$route.params.person }
          })
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  },
  watch: {
    $route: ['getPerson']
  }
}
</script>