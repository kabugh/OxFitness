<template>
  <div id="app">
    <BottomNavbar></BottomNavbar>
    <TopNavbar></TopNavbar>
    <TheOverlay v-if="isNavOpen" :user="user"></TheOverlay>
    <transition name="fade" mode="out-in">
      <keep-alive include="Dashboard">
        <router-view v-touch:swipe.left="user" />
      </keep-alive>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TopNavbar from "./components/TopNavbar.vue";
import BottomNavbar from "./components/BottomNavbar.vue";
import TheOverlay from "./components/TheOverlay.vue";

@Component({
  components: {
    TopNavbar,
    BottomNavbar,
    TheOverlay
  }
})
export default class App extends Vue {
  get isNavOpen() {
    return this.$store.getters.isNavOpen;
  }
  get user() {
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
