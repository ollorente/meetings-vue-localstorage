<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <div class="main__section__person">
            <h1 class="title">{{ getTask.name }}</h1>
            <div v-html="getTask.description"></div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content">
                <b>{{ getTask._collaboratorsCount }}</b> {{ getTask._collaboratorsCount === 1 ? 'Colaborador' : 'Colaboradores' }}
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label">Proyecto:</span
              ><br />
              <span class="main__section__person__block__content">
                <router-link :to="{ name: 'Project', params: { project: getTask.projectId } }" class="text-p-light text-500">{{ getTask.projectName }}</router-link>
              </span>
            </p>
            <div class="main__section__person__block">
              <div class="main__section__card">
                <div class="main__section__card__date">
                  <span class="main__section__card__month">
                    {{ new Date(getTask.meetingDateInt).toDateString().substr(4, 3) }}
                  </span>
                  <span class="main__section__card__day">
                    {{ new Date(getTask.meetingDateInt).toDateString().substr(8, 2) }}
                  </span>
                </div>
                <router-link
                  :to="{ name: 'Meeting', params: { meeting: getTask.meetingId } }"
                  class="main__section__card__body"
                >
                  <span class="main__section__link__text__content">
                    <span class="text-title">{{ getTask.meetingName }}</span>
                    <span class="text-content">
                      {{ new Date(getTask.meetingDateInt).getUTCHours() }}:{{ new Date(getTask.meetingDateInt).getUTCMinutes() }}
                      -
                      {{ new Date(getTask.meetingDateEnd).getUTCHours() }}:{{ new Date(getTask.meetingDateEnd).getUTCMinutes() }}
                    </span>
                  </span>
                </router-link>
              </div>
            </div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Creada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(getTask.createdAt).toDateString()
              }}</span>
            </p>
            <p
              v-if="getTask.createdAt !== getTask.updatedAt"
              class="main__section__person__block"
            >
              <span class="main__section__person__block__label"
                >Actualizada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(getTask.updatedAt).toDateString()
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content"
                ><i
                  :class="getTask.isActive ? 'fas' : 'far'"
                  class="fa-circle"
                ></i>
                {{ getTask.isActive ? "Activa" : "Inactiva" }}</span
              ><br />
              <span class="main__section__person__block__content">
                <i class="fas" :class="getTask.isLock ? 'fa-lock' : 'fa-lock-open'"></i>
                {{ getTask.isLock ? "Cerrada" : "Abierta" }}</span
              >
            </p>
            <div class="main__section__person__block--flex">
              <button @click="removeTask" class="btn-outline-s-dark">
                <i class="fas fa-trash"></i>
              </button>
              <button @click="editTask" class="btn-secondary">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="checkTask" class="btn-p-dark" v-if="getTask.isLock">
                <i class="fas fa-check"></i>
              </button>
              <button @click="checkTask" class="btn-outline-gray" v-else>
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'Task',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Actividad',
        link: { name: 'Tasks' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Editar',
              link: { name: 'EditTask' },
              icon: 'fas fa-tasks',
              status: false
            },
            {
              title: 'Contactos',
              link: { name: 'TaskPeople' },
              icon: 'fas fa-users',
              status: false
            }
          ]
        }
      ],
      meeting: {
        _id: '',
        name: '',
        dateInt: '',
        dateEnd: ''
      }
    }
  },
  created () {
    this.fetchTask(this.$route.params.task)
  },
  methods: {
    ...mapActions(['fetchTask', 'deleteTask', 'updateTask']),
    async editTask () {
      await this.$router.replace({
        name: 'EditTask',
        params: { task: this.$route.params.task }
      })
    },
    async checkTask () {
      this.getTask.isLock = !this.getTask.isLock

      await this.updateTask(this.task)
    },
    async removeTask () {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.deleteTask(this.$route.params.task)

        await this.$router.replace({ name: 'Tasks' })
      }
    }
  },
  computed: {
    ...mapGetters(['getTask'])
  },
  watch: {
    $route: ['fetchTask']
  }
}
</script>