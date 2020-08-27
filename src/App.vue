<template>
  <div id="app">
    <BottomTabs
      v-if="user && !$route.meta.unauthenticatedAccess && !isNavOpen"
    />
    <transition name="topNav">
      <TopNavbar />
    </transition>
    <transition name="theOverlay">
      <TheOverlay v-if="isNavOpen" :user="user" />
    </transition>
    <TransitionComponent>
      <keep-alive include="Dashboard">
        <router-view />
      </keep-alive>
    </TransitionComponent>
    <Contact
      v-if="
        $route.meta.unauthenticatedAccess && $route.path !== '/authentication'
      "
    />

    <!-- an error occurs because conentful-vue-render components are rendered as TheFooter template -->
    <!-- <TheFooter
      v-if="
        $route.path == '/' ||
          $route.path == '/features' ||
          $route.path == '/faq'
      "
    /> -->
    <q-ajax-bar ref="bar" position="top" color="accent" size="5px" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { VueOfflineMixin } from "vue-offline";

import TopNavbar from "./components/TopNavbar.vue";
import BottomTabs from "./components/BottomTabs.vue";
import TheOverlay from "./components/TheOverlay.vue";
import TransitionComponent from "./components/util/TransitionComponent.vue";
import Contact from "./components/Contact.vue";
import { User } from "./store/models";

@Component({
  components: {
    TopNavbar,
    BottomTabs,
    TheOverlay,
    TransitionComponent,
    Contact
  },
  mixins: [VueOfflineMixin]
})
export default class App extends Vue {
  mounted() {
    this.$on("offline", () => {
      this.$q.notify({
        position: "top",
        color: "primary",
        message: "Brak połączenia z internetem"
      });
    });
  }

  @Watch("isNavOpen")
  blockOverflow() {
    const verticalMobile = window.matchMedia(
      "(max-width: 450px) and (max-height: 850px) and (orientation: portrait)"
    );

    const horizontalMobile = window.matchMedia(
      "(max-height: 450px) and (max-width: 850px) and (orientation: landscape)"
    );

    if (verticalMobile.matches || horizontalMobile.matches)
      this.isNavOpen
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");
  }

  @Watch("user.premiumAccount.isActive")
  checkAccountStatus() {
    if (this.user) {
      if (!this.user.premiumAccount.isActive) {
        if (
          !this.$route.meta.unauthenticatedAccess &&
          this.$route.path !== "/dashboard"
        )
          this.$router.replace("/dashboard");
      }
    }
  }

  get isNavOpen(): boolean {
    return this.$store.getters.isNavOpen;
  }
  get user(): User {
    return this.$store.getters.user;
  }
}
</script>
