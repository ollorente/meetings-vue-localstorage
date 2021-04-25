<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">{{ getProject.name }}</h1>          
          <form @submit.prevent="newMeeting">
            <div>
              <input
                type="text"
                v-model="meeting.name"
                placeholder="Nombre de proyecto"
                autofocus
                required
              />
            </div>
            <div>
              <textarea v-model="meeting.description" rows="10"></textarea>
            </div>
            <div>
              <input
                type="datetime-local"
                v-model="meeting.dateInt"
                value="today"
                min="today"
                required
              >
            </div>
            <div>
              <input
                type="datetime-local"
                v-model="meeting.dateEnd"
                value="today"
                min="today"
                required
              >
            </div>
            <div>
              <select multiple v-model="meeting.collaborators">
                <option
                  v-for="person in getAllProjectPeople"
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
  name: 'NewProjectMeeting',
  components: {
    Alert,
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Crear encuentro',
        link: {
          name: 'ProjectMeetings',
          params: { project: this.$route.params.project }
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
      meeting: {
        name: '',
        description: '',
        collaborators: [],
        dateInt: '',
        dateEnd: '',
        project: this.$route.params.project
      },
      today: new Date().toLocaleString()
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
    this.fetchAllProjectPeople(this.$route.params.project)
  },
  methods: {
    ...mapActions(['addMeeting', 'fetchProject', 'fetchAllProjectPeople']),
    async newMeeting () {
      if (
        this.meeting.name.trim() === '' ||
        this.meeting.description.trim() === '' ||
        this.meeting.dateInt === '' ||
        this.meeting.dateEnd === '' ||
        this.meeting.collaborators === ''
      ) {
        this.alert.error = true
        this.alert.msg = `Los campos no pueden estar vacios.`

        setTimeout(() => {
          this.alert.error = false
        }, 4000)
      } else {
        await this.addMeeting(this.meeting)

        await this.$router.replace({
          name: 'ProjectMeetings',
          params: { project: this.$route.params.project }
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getProject', 'getAllProjectPeople'])
  },
  watch: {
    $route: ['fetchProject', 'fetchAllProjectPeople']
  }
}
</script>