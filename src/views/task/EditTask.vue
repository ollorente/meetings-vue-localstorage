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
                v-model="task.name"
                placeholder="Nombre de proyecto"
                autofocus
                required
              />
            </div>
            <ckeditor
              :editor="editor"
              v-model="task.description"
              :config="editorConfig"
            ></ckeditor>
            <div>
              <select multiple v-model="task.collaborators">
                <option
                  v-for="person in people"
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
import { mapActions } from 'vuex'
import { db } from '@/main'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
      people: [],
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      }
    }
  },
  created () {
    this.getTask()
  },
  methods: {
    ...mapActions(['updateTask']),
    async getTask () {
      try {
        const data = await db.tasks[this.$route.params.task]

        if (data === undefined) {
          await this.$router.replace({ name: 'Error' })
        } else {
          this.task = {
            id: await data.id,
            name: await data.name,
            description: await data.description,
            collaborators: await data.collaborators,
            meeting: await data.meeting,
            project: await data.project,
            isActive: await data.isActive,
            isLock: await data.isLock,
            createdAt: await data.createdAt
          }

          await this.getMeetingPeople(this.task.meeting)
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async getMeetingPeople (id) {
      try {
        const data = Object.values(db.meetingPeople[id])

        this.people = data
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

        this.task.name = ''
        this.task.description = ''
        this.task.collaborators = ''

        await this.$router.replace({
          name: 'Task',
          params: { task: this.$route.params.task }
        })
      }
    }
  },
  watch: {
    $route: ['getTask']
  }
}
</script>