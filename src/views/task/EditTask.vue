<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">{{ task.name }}</h1>
          <form @submit.prevent="putTask">
            <div>
              <input
                type="text"
                v-model="getTask.name"
                placeholder="Nombre de tarea"
                autofocus
                required
              />
            </div>
            <div>
              <textarea v-model="getTask.description" rows="10" placeholder="Descripción de la tarea"></textarea>
            </div>
            <div>
              <select multiple v-model="getTask._collaborators">
                <option
                  v-for="person in people"
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
      <pre class="container">{{ getTask }}</pre>
      <pre class="container">{{ $data }}</pre>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Alert from '@/components/gadgets/Alert'

export default {
  name: 'EditTask',
  components: {
    Alert,
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Editar actividad',
        link: { name: 'Task', params: { task: this.$route.params.task } },
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
      task: {
        id: '',
        name: '',
        description: '',
        collaborators: [],
        meeting: '',
        project: '',
        isActive: '',
        isLock: '',
        createdAt: ''
      },
      people: []
    }
  },
  mounted () {
    this.fetchAllMeetingPeople(this.getTask.meeting)
    this.people = this.getAllMeetingPeople
    this.task.collaborators = this.getTaskPeople(this.getTask._collaborators)
  },
  created () {
    this.fetchTask(this.$route.params.task)
  },
  methods: {
    ...mapActions(['updateTask', 'fetchTask', 'fetchAllMeetingPeople']),
    async getTaskPeople (data) {
      try {
        const info = await data.map(async e => {
          console.log('E->', e._id)
          return [e._id]
        })

        return info
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async putTask () {
      if (
        this.task.name.trim() === '' ||
        this.task.description.trim() === '' ||
        this.task.collaborators === ''
      ) {
        this.alert.error = true
        this.alert.msg = `Los campos no pueden estar vacios.`

        setTimeout(() => {
          this.alert.error = false
        }, 4000)
      } else {
        await this.updateTask(this.task)

        await this.$router.replace({
          name: 'Task',
          params: { task: this.$route.params.task }
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getTask', 'getAllMeetingPeople'])
  },
  watch: {
    $route: ['fetchTask', 'fetchAllMeetingPeople']
  }
}
</script>