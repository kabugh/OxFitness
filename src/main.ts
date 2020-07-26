import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import VueScrollTo from "vue-scrollto";
import VuePlyr from "vue-plyr";
import VueOffline from "vue-offline";
import { gsap, TimelineLite } from "gsap";

gsap.registerPlugin(TimelineLite);

Vue.use(VueOffline, { mixin: false, storage: false });

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ["ended"]
});

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
    const functions = firebase.app().functions("europe-west3");

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  },
  render: h => h(App)
}).$mount("#app");
