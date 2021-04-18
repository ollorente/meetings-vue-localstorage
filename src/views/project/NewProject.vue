<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">Crear proyecto</h1>
          <form @submit.prevent="newProject">
            <div>
              <input
                type="text"
                v-model="project.name"
                placeholder="Nombre de proyecto"
                autofocus
                required
              />
            </div>
            <div>
              <textarea v-model="project.description" rows="10"></textarea>
            </div>
            <div>
              <select multiple v-model="project.collaborators">
                <option
                  v-for="person in getAllPeople"
                  :key="person._id"
                  :value="person._id"
                >
                  {{ person.name }} - {{ person.email }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn-p-light">Agregar</button>
          </form>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Alert from '@/components/gadgets/Alert'

export default {
  name: 'NewProject',
  components: {
    TheNavbar,
    Alert
  },
  data () {
    return {
      path: {
        title: 'Crear proyecto',
        link: { name: 'Projects' },
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
      project: {
        name: '',
        description: '',
        collaborators: []
      }
    }
  },
  created () {
    this.fetchAllPeople()
  },
  methods: {
    ...mapActions(['addProject', 'fetchAllPeople']),
    async newProject () {
      try {
        if (this.project.name.trim() === '') {
          this.alert.error = true
          this.alert.msg = `Los campos no pueden estar vacíos.`

          setTimeout(() => {
            this.alert.error = false
          }, 4000)
        } else {
          await this.addProject(this.project)

          await this.$router.replace({ name: 'Projects' })
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  },
  computed: {
    ...mapGetters(['getAllPeople'])
  },
  watch: {
    $route: ['fetchAllPeople']
  }
}
</script>