import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import VueYoutube from "vue-youtube";
import axios from "axios";
import Gravatar from "vue-gravatar";
import Vue2TouchEvents from "vue2-touch-events";

Vue.component("v-gravatar", Gravatar);
Vue.use(VueYoutube);
Vue.use(Vue2TouchEvents);

import { Quasar } from "quasar";
import "./quasar";

Vue.use(Quasar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    firebase.initializeApp({
      apiKey: process.env.VUE_APP_apiKey,
      authDomain: process.env.VUE_APP_authDomain,
      databaseURL: process.env.VUE_APP_databaseURL,
      projectId: process.env.VUE_APP_projectId,
      storageBucket: process.env.VUE_APP_storageBucket,
      messagingSenderId: process.env.VUE_APP_messagingSenderId,
      appId: process.env.VUE_APP_appId
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  },
  render: h => h(App)
}).$mount("#app");
