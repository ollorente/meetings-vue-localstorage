import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const BASE_URL_TITLE = "© Meetings";

const routes = [
  {
    path: "/", // TODO - Montar en el store.
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { title: `Home ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyectos",
    name: "Projects",
    component: () => import("../views/project/Projects.vue"),
    meta: { title: `Proyectos ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/nuevo",
    name: "NewProject",
    component: () => import("../views/project/NewProject.vue"),
    meta: { title: `Nuevo proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project",
    name: "Project",
    component: () => import("../views/project/Project.vue"),
    meta: { title: `Proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/editar", // TODO - Ajustar Eliminar proyecto y todas sus conexiones.
    name: "EditProject",
    component: () => import("../views/project/EditProject.vue"),
    meta: { title: `Editar proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/reuniones",
    name: "ProjectMeetings",
    component: () => import("../views/project/ProjectMeetings.vue"),
    meta: { title: `Reuniones del proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/reunion/nueva", // TODO - Montar en el store.
    name: "NewProjectMeeting",
    component: () => import("../views/project/NewProjectMeeting.vue"),
    meta: { title: `Nueva reunión de proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/tareas",
    name: "ProjectTasks",
    component: () => import("../views/project/ProjectTasks.vue"),
    meta: { title: `Tareas del proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/usuarios",
    name: "ProjectPeople",
    component: () => import("../views/project/ProjectPeople.vue"),
    meta: { title: `Usuarios del proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/usuario/nuevo", // TODO - Montar en el store.
    name: "NewProjectPerson",
    component: () => import("../views/project/NewProjectPerson.vue"),
    meta: { title: `Usuarios del proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/tarea/:task", // TODO - Montar en el store.
    name: "ProjectTask",
    component: () => import("../views/project/ProjectTask.vue"),
    meta: { title: `Tarea del proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/reuniones",
    name: "Meetings",
    component: () => import("../views/meeting/Meetings.vue"),
    meta: { title: `Reuniones ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/:meeting",
    name: "Meeting",
    component: () => import("../views/meeting/Meeting.vue"),
    meta: { title: `Reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/reunion/:meeting",
    name: "Meeting",
    component: () => import("../views/meeting/Meeting.vue"),
    meta: { title: `Reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/:meeting/editar", // TODO - Montar en el store.
    name: "EditMeeting",
    component: () => import("../views/meeting/EditMeeting.vue"),
    meta: { title: `Editar reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/:meeting/tareas", // TODO - Montar en el store.
    name: "MeetingTasks",
    component: () => import("../views/meeting/MeetingTasks.vue"),
    meta: { title: `Tareas de la reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/:meeting/tarea/nueva", // TODO - Montar en el store.
    name: "NewMeetingTask",
    component: () => import("../views/meeting/NewMeetingTask.vue"),
    meta: { title: `Nueva tarea de reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/:meeting/usuarios",
    name: "MeetingPeople",
    component: () => import("../views/meeting/MeetingPeople.vue"),
    meta: { title: `Usuarios en la reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/:meeting/usuario/nuevo", // TODO - Montar en el store.
    name: "NewMeetingPeople",
    component: () => import("../views/meeting/NewMeetingPeople.vue"),
    meta: { title: `Nuevo usuario a la reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/tarea/:task", // TODO - Montar en el store.
    name: "Task",
    component: () => import("../views/task/Task.vue"),
    meta: { title: `Tarea ${BASE_URL_TITLE}` },
  },
  {
    path: "/tarea/:task/editar", // TODO - Montar en el store.
    name: "EditTask",
    component: () => import("../views/task/EditTask.vue"),
    meta: { title: `Editar tarea ${BASE_URL_TITLE}` },
  },
  {
    path: "/tarea/:task/usuarios", // TODO - Montar en el store.
    name: "TaskPeople",
    component: () => import("../views/task/TaskPeople.vue"),
    meta: { title: `Usuarios de la tarea ${BASE_URL_TITLE}` },
  },
  {
    path: "/tarea/:task/usuario/nuevo", // TODO - Montar en el store.
    name: "NewTaskPerson",
    component: () => import("../views/task/NewTaskPerson.vue"),
    meta: { title: `Nuevo usuario a la Tarea ${BASE_URL_TITLE}` },
  },
  {
    path: "/usuarios",
    name: "People",
    component: () => import("../views/person/People.vue"),
    meta: { title: `Usuario ${BASE_URL_TITLE}` },
  },
  {
    path: "/usuario/nuevo",
    name: "NewPerson",
    component: () => import("../views/person/NewPerson.vue"),
    meta: { title: `Nuevo usuario ${BASE_URL_TITLE}` },
  },
  {
    path: "/usuario/:person",
    name: "Person",
    component: () => import("../views/person/Person.vue"),
    meta: { title: `Usuario ${BASE_URL_TITLE}` },
  },
  {
    path: "/usuario/:person/editar",
    name: "EditPerson",
    component: () => import("../views/person/EditPerson.vue"),
    meta: { title: `Editar usuario ${BASE_URL_TITLE}` },
  },
  {
    path: "/usuario/:person/proyectos",
    name: "PersonProjects",
    component: () => import("../views/person/PersonProjects.vue"),
    meta: { title: `Proyectos del usuario ${BASE_URL_TITLE}` },
  },
  {
    path: "/usuario/:person/tareas",
    name: "PersonTasks",
    component: () => import("../views/person/PersonTasks.vue"),
    meta: { title: `Tarea ${BASE_URL_TITLE}` },
  },
  {
    path: "/usuario/:person/reuniones",
    name: "PersonMeetings",
    component: () => import("../views/person/PersonMeetings.vue"),
    meta: { title: `Reuniones del usuario ${BASE_URL_TITLE}` },
  },
  {
    path: "/*",
    name: "Error",
    component: () => import("../views/Error.vue"),
    meta: { title: `Página no encontrada ${BASE_URL_TITLE}` },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
