<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <Alert :msg="alert.msg" v-if="alert.error" />
          <h1 class="title">{{ meeting.name }}</h1>
          <form @submit.prevent="putMeeting">
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
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '@/main'

import TheNavbar from '@/components/TheNavbar'
import Alert from '@/components/gadgets/Alert'

export default {
  name: 'EditMeeting',
  components: {
    Alert,
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Editar encuentro',
        link: { name: 'Meeting', params: { meeting: this.$route.params.meeting } },
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
        _id: '',
        name: '',
        description: '',
        collaborators: [],
        dateInt: '',
        dateEnd: '',
        isActive: '',
        isLock: ''
      },
      people: []
    }
  },
  mounted () {
    this.getProjectPeople()
    this.meeting = {
      _id: this.getMeeting._id,
      name: this.getMeeting.name,
      description: this.getMeeting.description,
      collaborators: this.getMeeting._collaborators,
      dateInt: this.getMeeting.dateInt.slice(0, 19),
      dateEnd: this.getMeeting.dateEnd.slice(0, 19),
      isActive: this.getMeeting.isActive,
      isLock: this.getMeeting.isLock
    }
  },
  created () {
    this.fetchMeeting(this.$route.params.meeting)
  },
  methods: {
    ...mapActions(['updateMeeting', 'fetchMeeting']),
    async getProjectPeople () {
      const res = await fetch(`${db}/projects/${this.getMeeting.project._id}/all-people`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })

      const info = await res.json()

      this.people = info.data
    },
    async putMeeting () {
      if (
        this.meeting.name.trim() === '' ||
        this.meeting.description.trim() === '' ||
        this.meeting.collaborators === ''
      ) {
        this.alert.error = true
        this.alert.msg = `Los campos no pueden estar vacios.`

        setTimeout(() => {
          this.alert.error = false
        }, 4000)
      } else {
        await this.updateMeeting(this.meeting)

        await this.$router.replace({
          name: 'Meeting',
          params: { meeting: this.$route.params.meeting }
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getMeeting'])
  },
  watch: {
    $route: ['fetchMeeting', 'getProjectPeople']
  }
}
</script>