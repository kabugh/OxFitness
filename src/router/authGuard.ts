import store from "../store/index";
import { Route } from "vue-router";

export default (to: Route, from: Route, next: Function) => {
  if (store.getters.user) {
    store.commit("setNav", false);
    if (store.getters.user.premiumAccount) {
      next();
    } else {
      next("/dashboard");
    }
  } else {
    next("/authentication");
  }
};
