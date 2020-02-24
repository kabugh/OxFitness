import Vue from "vue";
import VueRouter, { Route } from "vue-router";
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
    path: "/authentication",
    name: "authentication",
    component: () =>
      import(
        /* webpackChunkName: "authentication" */ "../views/authentication/Authentication.vue"
      )
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    beforeEnter: AuthGuard
  },
  {
    path: "/plans/:workoutType",
    name: "workouts",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "../views/workouts/Workouts.vue"
      ),
    beforeEnter: AuthGuard,
    props: true
  },
  {
    path: "/plans/:workoutType/:id",
    name: "workoutPage",
    component: () =>
      import(
        /* webpackChunkName: "workout" */ "../views/workouts/WorkoutPage.vue"
      ),
    beforeEnter: AuthGuard,
    props: true
  },
  {
    path: "/plans",
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
