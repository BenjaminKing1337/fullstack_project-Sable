import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthGuard from './auth-guard'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("../views/TasksView.vue"),
    beforeEnter: AuthGuard
  },
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
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/LoginComponent.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../components/LogOut.vue"),
    beforeEnter: AuthGuard
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("../views/ProjectsView.vue"),
  },
  {
    path: "/netlify",
    name: "netlify",
    component: () => import("../views/NetlifyTestView.vue"),
  },
];

const xRouter = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default xRouter;
