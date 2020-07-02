import store from "../store/index";
import { Route } from "vue-router";

export default (to: Route, from: Route, next: Function) => {
  if (store.getters.user) {
    store.commit("setNav", false);
    next();
  } else {
    next("/authentication");
  }
};
