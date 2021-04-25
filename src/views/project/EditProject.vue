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
                  :key="person._id"
                  :value="person._id"
                >
                  {{ person.name }} - {{ person.email }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn-secondary">Editar</button>
          </form>
        </section>
      </transition>
      <pre class="container" hidden>{{ getProject }}</pre>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
        name: '',
        description: '',
        collaborators: [],
        isLock: '',
        isActive: ''
      },
      collaborators: []
    }
  },
  mounted () {
    this.project = {
      name: this.getProject.name,
      description: this.getProject.description,
      collaborators: this.getProject._collaborators,
      isLock: this.getProject.isLock,
      isActive: this.getProject.isActive
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
    this.fetchAllPeople()
  },
  methods: {
    ...mapActions(['updateProject', 'fetchAllPeople', 'fetchProject']),
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
    ...mapGetters(['getAllPeople', 'getProject'])
  },
  watch: {
    $route: ['fetchAllPeople', 'fetchProject']
  }
}
</script>