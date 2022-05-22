import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthGuard from './auth-guard'
import LoggedInGuard from './loggedin-guard'
import AdminGuard from './admin-guard'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // {
  //   path: "/tasks",
  //   name: "tasks",
  //   component: () => import("../views/TasksView.vue"),
  //   beforeEnter: AuthGuard
  // },
  {
    path: "/task/:id",
    name: "task",
    component: () => import("../views/TaskView.vue"),
    beforeEnter: AuthGuard
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/RegisterComponent.vue"),
    beforeEnter: LoggedInGuard
  },
  {
    path: "/terms",
    name: "terms",
    component: () => import("../components/TermsComponent.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/LoginComponent.vue"),
    beforeEnter: LoggedInGuard
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../components/LogOut.vue"),
    beforeEnter: AuthGuard
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminView.vue"),
    beforeEnter: AdminGuard
  },
  {
    path: "/user/:id",
    name: "user",
    component: () => import("../views/UserView.vue"),
    beforeEnter: AdminGuard
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("../views/ProjectsView.vue"),
  },
  {
    path: "/project/:id",
    name: "project",
    component: () => import("../views/ProjectView.vue"),
    beforeEnter: AuthGuard
  },
  {
    path: "/workspace/:id",
    name: "workspace",
    component: () => import("../views/WorkSpace.vue"),
  },
  // {
  //   path: "/lists",
  //   name: "lists",
  //   component: () => import("../views/ListsView.vue"),
  // },
  {
    path: "/list/:id",
    name: "list",
    component: () => import("../views/ListView.vue"),
    beforeEnter: AuthGuard
  },
  
  
];

const xRouter = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default xRouter;
