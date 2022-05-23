import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// Import user check that redirects to login
import AuthGuard from "./auth-guard";
// Import user check that redirects to Landing page
import LoggedInGuard from "./loggedin-guard";
// Import admin check
import AdminGuard from "./admin-guard";

const routes = [
  // Landing page Route
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // View users Route
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminView.vue"),
    beforeEnter: AdminGuard,
  },
  // Terms and license Route
  {
    path: "/terms",
    name: "terms",
    component: () => import("../components/TermsComponent.vue"),
  },
  // Sign up Route
  {
    path: "/register",
    name: "register",
    component: () => import("../components/RegisterComponent.vue"),
    beforeEnter: LoggedInGuard,
  },
  // Login Route
  {
    path: "/login",
    name: "login",
    component: () => import("../components/LoginComponent.vue"),
    beforeEnter: LoggedInGuard,
  },
  // Logout Route
  {
    path: "/logout",
    name: "logout",
    component: () => import("../components/LogOut.vue"),
    beforeEnter: AuthGuard,
  },
  // View all projects Route
  {
    path: "/projects",
    name: "projects",
    component: () => import("../views/ProjectsView.vue"),
    beforeEnter: AuthGuard,
  },
  // View specific project Route
  {
    path: "/workspace/:id",
    name: "workspace",
    component: () => import("../views/WorkSpace.vue"),
    beforeEnter: AuthGuard,
  },
  // Edit specific id Routes
  {
    path: "/project/:id",
    name: "project",
    component: () => import("../views/EditProjectView.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/list/:id",
    name: "list",
    component: () => import("../views/EditListView.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/task/:id",
    name: "task",
    component: () => import("../views/EditTaskView.vue"),
    beforeEnter: AuthGuard,
  },
];

const xRouter = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default xRouter;
