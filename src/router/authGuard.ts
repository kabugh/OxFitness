import store from "../store";
import { Route } from "vue-router";

export default (to: Route, from: Route, next: Function) => {
  // if (store.getters.user) {
  //   next();
  // } else {
  //   next("/");
  // }
  next();
};
