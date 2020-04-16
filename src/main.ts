import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import VueYoutube from "vue-youtube";
import VueScrollTo from "vue-scrollto";
import vueVimeoPlayer from "vue-vimeo-player";

Vue.use(vueVimeoPlayer);

Vue.use(VueYoutube);

Vue.use(VueScrollTo, {
  container: "body",
  duration: 1500,
  easing: [0.86, 0, 0.07, 1],
  offset: 0,
  force: true,
  cancelable: false,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

import { Quasar } from "quasar";
import "./quasar";
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
