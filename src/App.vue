<template>
  <div id="app">
    <BottomTabs></BottomTabs>
    <TopNavbar></TopNavbar>
    <transition name="theOverlay">
      <TheOverlay v-if="isNavOpen" :user="user"></TheOverlay>
    </transition>
    <TransitionComponent>
      <keep-alive include="Dashboard">
        <router-view />
      </keep-alive>
    </TransitionComponent>

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

import TopNavbar from "./components/TopNavbar.vue";
import BottomTabs from "./components/BottomTabs.vue";
import TheOverlay from "./components/TheOverlay.vue";
import TransitionComponent from "./components/util/TransitionComponent.vue";
// import TheFooter from "./components/TheFooter.vue";
import { User } from "./store/models";

@Component({
  components: {
    TopNavbar,
    BottomTabs,
    TheOverlay,
    TransitionComponent
    // TheFooter
  }
})
export default class App extends Vue {
  get isNavOpen(): boolean {
    return this.$store.getters.isNavOpen;
  }
  get user(): User {
    return this.$store.getters.user;
  }
  @Watch("isNavOpen")
  blockOverflow() {
    this.isNavOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }
}
</script>
