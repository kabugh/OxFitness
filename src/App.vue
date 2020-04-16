<template>
  <div id="app">
    <BottomTabs></BottomTabs>
    <TopNavbar></TopNavbar>
    <TheOverlay v-if="isNavOpen" :user="user"></TheOverlay>
    <!-- <transition name="fade" mode="out-in"> -->
    <keep-alive include="Dashboard">
      <router-view />
    </keep-alive>
    <!-- </transition> -->
    <!-- an error occurs because conentful-vue-render components are rendered as TheFooter template -->
    <!-- <TheFooter /> -->
    <q-ajax-bar ref="bar" position="top" color="accent" size="5px" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TopNavbar from "./components/TopNavbar.vue";
import BottomTabs from "./components/BottomTabs.vue";
import TheOverlay from "./components/TheOverlay.vue";
// import TheFooter from "./components/TheFooter.vue";
import { User } from "./store/models";

@Component({
  components: {
    TopNavbar,
    BottomTabs,
    TheOverlay
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
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
