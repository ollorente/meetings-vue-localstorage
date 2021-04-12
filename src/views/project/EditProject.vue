<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">{{ project.name }}</h1>
          <form @submit.prevent="putProject">
            <div>
              <input
                type="text"
                v-model="project.name"
                id="name"
                placeholder="Nombre de usuario"
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
                  :key="person.id"
                  :value="person.id"
                >
                  {{ person.name }} - {{ person.email }}
                </option>
              </select>
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
import { db } from '@/main'

import TheNavbar from '@/components/TheNavbar'
import Alert from '@/components/gadgets/Alert'

export default {
  name: 'EditProject',
  components: {
    TheNavbar,
    Alert
  },
  data () {
    return {
      path: {
        title: 'Editar proyecto',
        link: { name: 'Project', params: { project: this.$route.params.project } },
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
        id: '',
        name: '',
        description: '',
        collaborators: [],
        isLock: '',
        isActive: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  created () {
    this.getProject()
    this.fetchAllPeople()
  },
  methods: {
    ...mapActions(['updateProject', 'fetchAllPeople']),
    async getProject () {
      try {
        const data = await db.projects[this.$route.params.project]

        if (data === undefined) {
          await this.$router.replace({ name: 'Error' })
        } else {
          this.project = {
            id: await data.id,
            name: await data.name,
            description: await data.description,
            collaborators: await data.collaborators,
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
    async putProject () {
      try {
        if (
          this.project.name.trim() === '' ||
          this.project.description.trim() === '' ||
          this.project.collaborators === ''
        ) {
          this.alert.error = true
          this.alert.msg = `Los campos no pueden estar vacíos.`

          setTimeout(() => {
            this.alert.error = false
          }, 4000)
        } else {
          await this.updateProject(this.project)

          this.name = ''
          this.description = ''
          this.collaborators = ''
          this.isLock = ''
          this.isActive = ''

          await this.$router.replace({
            name: 'Project',
            params: { project: this.$route.params.project }
          })
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
    $route: ['getProject', 'fetchAllPeople']
  }
}
</script>