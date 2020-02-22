import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AuthGuard from "./authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    beforeEnter: AuthGuard
  },
  {
    path: "/workout/:id",
    name: "workoutPage",
    component: () =>
      import(
        /* webpackChunkName: "workout" */ "../views/workouts/WorkoutPage.vue"
      ),
    beforeEnter: AuthGuard,
    props: true
  },
  {
    path: "/workout",
    redirect: { name: "dashboard" }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    beforeEnter: AuthGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
