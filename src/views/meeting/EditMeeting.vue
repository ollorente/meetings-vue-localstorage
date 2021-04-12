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
            <ckeditor
              :editor="editor"
              v-model="meeting.description"
              :config="editorConfig"
            ></ckeditor>
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
import { mapActions } from 'vuex'
import { db } from '@/main'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
        id: '',
        name: '',
        description: '',
        collaborators: [],
        project: '',
        dateInt: '',
        dateEnd: '',
        isActive: '',
        isLock: '',
        createdAt: ''
      },
      people: [],
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      }
    }
  },
  created () {
    this.getMeeting()
  },
  methods: {
    ...mapActions(['updateMeeting']),
    async getMeeting () {
      try {
        const data = await db.meetings[this.$route.params.meeting]

        if (data === undefined) {
          await this.$router.replace({ name: 'Error' })
        } else {
          this.meeting = {
            id: await data.id,
            name: await data.name,
            description: await data.description,
            collaborators: await data.collaborators,
            project: await data.project,
            dateInt: new Date(await data.dateInt - (1000 * 60 * 60 * 5)).toISOString().substr(0, 16),
            dateEnd: new Date(await data.dateEnd - (1000 * 60 * 60 * 5)).toISOString().substr(0, 16),
            isActive: await data.isActive,
            isLock: await data.isLock,
            createdAt: await data.createdAt
          }

          await this.getProjectPeople(this.meeting.project)
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async getProjectPeople (id) {
      try {
        this.people = Object.values(db.projectPeople[id])
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async putMeeting () {}
  },
  watch: {
    $route: ['getMeeting']
  }
}
</script>