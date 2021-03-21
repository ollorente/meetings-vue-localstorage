import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const BASE_URL_TITLE = "© Meetings";

const routes = [
  {
    path: "/", // TODO - Craer lógica.
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
    path: "/proyecto/nuevo", // TODO - Craer lógica.
    name: "NewProject",
    component: () => import("../views/project/NewProject.vue"),
    meta: { title: `Nuevo proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project", // TODO - Craer lógica.
    name: "Project",
    component: () => import("../views/project/Project.vue"),
    meta: { title: `Proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/editar", // TODO - Craer lógica.
    name: "EditProject",
    component: () => import("../views/project/EditProject.vue"),
    meta: { title: `Editar proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/reuniones", // TODO - Craer lógica.
    name: "ProjectMeetings",
    component: () => import("../views/meeting/Meetings.vue"),
    meta: { title: `Reuniones del proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/tareas", // TODO - Craer lógica.
    name: "ProjectTasks",
    component: () => import("../views/task/Tasks.vue"),
    meta: { title: `Tareas del proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/tarea/nueva", // TODO - Craer lógica.
    name: "NewProjectTask",
    component: () => import("../views/task/NewTask.vue"),
    meta: { title: `Nueva tarea de proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/proyecto/:project/usuarios", // TODO - Craer lógica.
    name: "ProjectPeople",
    component: () => import("../views/project/ProjectPeople.vue"),
    meta: { title: `Usuarios en el proyecto ${BASE_URL_TITLE}` },
  },
  {
    path: "/reuniones", // TODO - Craer lógica.
    name: "Meetings",
    component: () => import("../views/meeting/Meetings.vue"),
    meta: { title: `Reuniones ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/nueva", // TODO - Craer lógica.
    name: "NewMeeting",
    component: () => import("../views/meeting/NewMeeting.vue"),
    meta: { title: `Nueva reunion ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/:meeting", // TODO - Craer lógica.
    name: "Meeting",
    component: () => import("../views/meeting/Meeting.vue"),
    meta: { title: `Reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/:meeting/editar", // TODO - Craer lógica.
    name: "EditMeeting",
    component: () => import("../views/meeting/EditMeeting.vue"),
    meta: { title: `Editar reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/reunion/:meeting/tareas", // TODO - Craer lógica.
    name: "MeetingTasks",
    component: () => import("../views/meeting/Meeting.vue"),
    meta: { title: `Reunión ${BASE_URL_TITLE}` },
  },
  {
    path: "/tarea/:task", // TODO - Craer lógica.
    name: "Task",
    component: () => import("../views/task/Task.vue"),
    meta: { title: `Tarea ${BASE_URL_TITLE}` },
  },
  {
    path: "/tarea/:task/editar", // TODO - Craer lógica.
    name: "EditTask",
    component: () => import("../views/task/EditTask.vue"),
    meta: { title: `Editar tarea ${BASE_URL_TITLE}` },
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
    path: "/usuario/:person/proyectos", // TODO - Craer lógica.
    name: "PersonProjects",
    component: () => import("../views/task/Task.vue"),
    meta: { title: `Tarea ${BASE_URL_TITLE}` },
  },
  {
    path: "/usuario/:person/tareas", // TODO - Craer lógica.
    name: "PersonTasks",
    component: () => import("../views/task/Task.vue"),
    meta: { title: `Tarea ${BASE_URL_TITLE}` },
  },
  {
    path: "/usuario/:person/reuniones", // TODO - Craer lógica.
    name: "PersonMeetings",
    component: () => import("../views/task/Task.vue"),
    meta: { title: `Tarea ${BASE_URL_TITLE}` },
  },
  {
    path: "/*", // TODO - Craer lógica.
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
