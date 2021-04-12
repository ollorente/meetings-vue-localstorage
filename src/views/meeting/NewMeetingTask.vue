<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">{{ getMeeting.name }}</h1>          
          <form @submit.prevent="newTask">
            <div>
              <input
                type="text"
                v-model="task.name"
                placeholder="Nombre de proyecto"
                autofocus
                required
              />
            </div>
            <div>
              <textarea v-model="task.description" rows="10"></textarea>
            </div>
            <div>
              <select multiple v-model="task.collaborators">
                <option
                  v-for="person in getAllMeetingPeople"
                  :key="person.id"
                  :value="person.id"
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
  name: 'NewMeetingTask',
  components: {
    Alert,
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Crear actividad',
        link: {
          name: 'MeetingTasks',
          params: { meeting: this.$route.params.meeting }
        },
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
        name: '',
        description: '',
        collaborators: [],
        project: ''
      }
    }
  },
  mounted () {
    this.task.project = this.getMeeting.project
  },
  created () {
    this.fetchMeeting(this.$route.params.meeting)
    this.fetchAllMeetingPeople(this.$route.params.meeting)
  },
  methods: {
    ...mapActions(['addTask', 'fetchMeeting', 'fetchAllMeetingPeople']),
    async newTask () {
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

        // eslint-disable-next-line no-useless-return
        return
      } else {
        const task = {
          name: await this.task.name,
          description: await this.task.description,
          collaborators: await this.task.collaborators,
          project: await this.task.project,
          meeting: parseInt(this.$route.params.meeting)
        }

        await this.addTask(task)

        this.task.name = ''
        this.task.description = ''
        this.task.collaborators = ''

        await this.$router.replace({
          name: 'MeetingTasks',
          params: { meeting: this.$route.params.meeting }
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getMeeting', 'getAllMeetingPeople'])
  },
  watch: {
    $route: ['fetchMeeting', 'fetchAllMeetingPeople']
  }
}
</script>