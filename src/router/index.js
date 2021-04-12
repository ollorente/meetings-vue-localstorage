import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const BASE_URL_TITLE = '© MeetingsApp'

const routes = [
  {
    path: '/', // TODO -> Hacer lógica de la vista
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: `Home ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/login', // TODO -> Hacer lógica de la vista
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: `Login ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/registro',
    name: 'Logup',
    component: () => import('../views/Logup.vue'),
    meta: {
      title: `Registro ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/proyectos',
    name: 'Projects',
    component: () => import('../views/project/Projects.vue'),
    meta: {
      title: `Proyectos ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/proyecto/nuevo',
    name: 'NewProject',
    component: () => import('../views/project/NewProject.vue'),
    meta: {
      title: `Agreagr proyecto ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/proyecto/:project', // TODO -> Hacer que eliminar funcione
    name: 'Project',
    component: () => import('../views/project/Project.vue'),
    meta: {
      title: `Proyecto ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/proyecto/:project/editar', // TODO -> Hacer que llame a KcEditor
    name: 'EditProject',
    component: () => import('../views/project/EditProject.vue'),
    meta: {
      title: `Editar proyecto ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/proyecto/:project/reuniones',
    name: 'ProjectMeetings',
    component: () => import('../views/project/ProjectMeetings.vue'),
    meta: {
      title: `Reuniones proyecto ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/proyecto/:project/reunion/nueva',
    name: 'NewProjectMeeting',
    component: () => import('../views/project/NewProjectMeeting.vue'),
    meta: {
      title: `Agregar reunión ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/proyecto/:project/tareas',
    name: 'ProjectTasks',
    component: () => import('../views/project/ProjectTasks.vue'),
    meta: {
      title: `Tareas proyecto ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/proyecto/:project/usuarios',
    name: 'ProjectPeople',
    component: () => import('../views/project/ProjectPeople.vue'),
    meta: {
      title: `Usuarios proyecto ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/reuniones',
    name: 'Meetings',
    component: () => import('../views/meeting/Meetings.vue'),
    meta: {
      title: `Reuniones ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/reunion/:meeting', // TODO -> Hacer que eliminar funcione
    name: 'Meeting',
    component: () => import('../views/meeting/Meeting.vue'),
    meta: {
      title: `Reunión ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/reunion/:meeting/editar', // TODO -> Hacer que llame a KcEditor
    name: 'EditMeeting',
    component: () => import('../views/meeting/EditMeeting.vue'),
    meta: {
      title: `Editar reunión ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/reunion/:meeting/tareas',
    name: 'MeetingTasks',
    component: () => import('../views/meeting/MeetingTasks.vue'),
    meta: {
      title: `Tareas reunión ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/reunion/:meeting/tarea/nueva',
    name: 'NewMeetingTask',
    component: () => import('../views/meeting/NewMeetingTask.vue'),
    meta: {
      title: `Agregar tarea ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/reunion/:meeting/usuarios',
    name: 'MeetingPeople',
    component: () => import('../views/meeting/MeetingPeople.vue'),
    meta: {
      title: `Usuarios reunión ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/tareas',
    name: 'Tasks',
    component: () => import('../views/task/Tasks.vue'),
    meta: {
      title: `Tareas ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/tarea/:task', // TODO -> Hacer que eliminar funcione
    name: 'Task',
    component: () => import('../views/task/Task.vue'),
    meta: {
      title: `Tarea ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/tarea/:task/editar', // TODO -> Hacer que llame a KcEditor
    name: 'EditTask',
    component: () => import('../views/task/EditTask.vue'),
    meta: {
      title: `Editar tarea ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/tarea/:task/usuarios',
    name: 'TaskPeople',
    component: () => import('../views/task/TaskPeople.vue'),
    meta: {
      title: `Usuarios tarea ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/usuarios',
    name: 'People',
    component: () => import('../views/person/People.vue'),
    meta: {
      title: `Usuarios ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/usuario/nuevo',
    name: 'NewPerson',
    component: () => import('../views/person/NewPerson.vue'),
    meta: {
      title: `Agregar usuario ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/usuario/:person', // TODO -> Hacer que eliminar funcione
    name: 'Person',
    component: () => import('../views/person/Person.vue'),
    meta: {
      title: `Usuario ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/usuario/:person/editar',
    name: 'EditPerson',
    component: () => import('../views/person/EditPerson.vue'),
    meta: {
      title: `Editar Usuario ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/usuario/:person/proyectos',
    name: 'PersonProjects',
    component: () => import('../views/person/PersonProjects.vue'),
    meta: {
      title: `Proyectos del usuario ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/usuario/:person/reuniones',
    name: 'PersonMeetings',
    component: () => import('../views/person/PersonMeetings.vue'),
    meta: {
      title: `Reuniones del usuario ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/usuario/:person/tareas',
    name: 'PersonTasks',
    component: () => import('../views/person/PersonTasks.vue'),
    meta: {
      title: `Tareas del usuario ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/*',
    name: 'Error',
    component: () => import('../views/Error.vue'),
    meta: {
      title: `Página no encontrada ${BASE_URL_TITLE}`
    }
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
