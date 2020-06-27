import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Home from "../views/Home.vue";
import AuthGuard from "./authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { transition: "transition-left-full" }
  },
  {
    path: "/features",
    name: "features",
    component: () =>
      import(/* webpackChunkName: "features" */ "../views/Features.vue"),
    meta: { transition: "transition-left-full" }
  },
  {
    path: "/faq",
    name: "faq",
    component: () => import(/* webpackChunkName: "faq" */ "../views/Faq.vue"),
    meta: { transition: "transition-left-full" }
  },
  {
    path: "/authentication",
    name: "authentication",
    component: () =>
      import(
        /* webpackChunkName: "authentication" */ "../views/authentication/Authentication.vue"
      ),
    meta: { transition: "transition-left-full" }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    beforeEnter: AuthGuard,
    meta: { transition: "transition-left-full" }
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
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // }
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.transition) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (savedPosition) resolve(savedPosition);
          else resolve({ x: 0, y: 0 });
        }, 500);
      });
    } else {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  }
});

export default router;
