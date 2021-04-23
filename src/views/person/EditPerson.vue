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
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'EditPerson',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Editar contacto',
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
        _id: '',
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
  mounted () {
    this.person = {
      _id: this.getPerson._id,
      name: this.getPerson.name,
      email: this.getPerson.email,
      photoURL: this.getPerson.photoURL,
      phone: this.getPerson.phone,
      role: this.getPerson.role,
      isLock: this.getPerson.isLock,
      isActive: this.getPerson.isActive,
      createdAt: this.getPerson.createdAt,
      updatedAt: this.getPerson.updatedAt
    }
  },
  created () {
    this.fetchPerson(this.$route.params.person)
  },
  methods: {
    ...mapActions(['fetchPerson', 'updatePerson']),
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
  computed: {
    ...mapGetters(['getPerson'])
  },
  watch: {
    $route: ['fetchPerson']
  }
}
</script>