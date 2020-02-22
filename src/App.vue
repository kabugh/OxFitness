<template>
  <div id="app">
    <TheNavbar></TheNavbar>
    <TheOverlay v-if="isNavOpen"></TheOverlay>
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
}
</script>

<style lang="scss"></style>
