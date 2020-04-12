<template>
  <div
    class="q-gutter-y-md"
    v-if="
      user &&
        $route.path !== '/' &&
        $route.path !== '/features' &&
        $route.path !== '/faq' &&
        !isNavOpen
    "
  >
    <q-tabs
      v-model="tab"
      class="bg-black text-grey-6 shadow-2"
      active-color="bg-gray-1"
      indicator-color="primary"
      switch-indicator
      align="justify"
      dense
    >
      <q-route-tab
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.link"
        exact
        :name="item.title"
        :icon="item.icon"
        :label="item.title"
      />
    </q-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class BottomTabs extends Vue {
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

  get user() {
    return this.$store.getters.user;
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
