<template>
  <div
    class="q-gutter-y-md"
    v-if="
      ($route.path === '/dashboard' || $route.path === '/profile') && !isNavOpen
    "
  >
    <q-tabs
      v-model="tab"
      class="bg-grey-5 shadow-2"
      indicator-color="primary"
      switch-indicator
    >
      <q-route-tab
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.link"
        exact
        :name="item.title"
        :icon="item.icon"
        :label="item.title"
        :ripple="false"
      />
    </q-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Features extends Vue {
  tab = "mails";
  navItems = [
    {
      title: "Home",
      icon: "home",
      link: "/dashboard"
    },
    {
      title: "Workouts",
      icon: "fitness_center",
      link: "/plans/daily"
    },
    {
      title: "Profile",
      icon: "account_circle",
      link: "/profile"
    }
  ];
  get isNavOpen() {
    return this.$store.getters.isNavOpen;
  }
}
</script>
<style lang="scss">
.q-gutter-y-md {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 99;
}
</style>
