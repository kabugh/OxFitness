<template>
  <div id="app">
    <TheNavbar></TheNavbar>
    <TheOverlay v-if="isNavOpen" :user="user"></TheOverlay>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TheNavbar from "./components/TheNavbar.vue";
import TheOverlay from "./components/TheOverlay.vue";

@Component({
  components: {
    TheNavbar,
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

<style lang="scss"></style>
