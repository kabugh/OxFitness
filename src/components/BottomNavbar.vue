<template>
  <nav
    class="bottom-nav"
    v-if="
      ($route.path === '/dashboard' || $route.path === '/profile') && !isNavOpen
    "
  >
    <div
      class="bottom-nav__action"
      v-for="(item, index) in navItems"
      :key="index"
      :class="{ 'bottom-nav__action--active': item.link === $route.path }"
      @click="$router.push({ path: item.link })"
    >
      <i class="bottom-nav__icon material-icons md-36">{{ item.icon }}</i>
      <span class="bottom-nav__label">{{ item.title }}</span>
    </div>
  </nav>
</template>
<script>
export default {
  name: "test",
  data: () => ({
    navItems: [
      {
        title: "Home",
        icon: "home",
        link: "/dashboard"
      },
      {
        title: "Workouts",
        icon: "today",
        link: "/dashboard"
      },
      {
        title: "Profile",
        icon: "account_circle",
        link: "/profile"
      }
    ]
  }),
  computed: {
    isNavOpen: {
      get() {
        return this.$store.state.isNavOpen;
      },
      set(value) {
        this.$store.commit("setNav", value);
      }
    }
  }
};
// import { Component, Vue } from "vue-property-decorator";

// interface NavItem {
//   title: string;
//   icon: string;
//   link: string;
// }

// COLIDES WITH RICH-CONTENTFUL-VUE WHEN INITIALISING AS TS CLASS

// export default class TheNavbar extends Vue {
//   navItems: NavItem[] = [
//     {
//       title: "Home",
//       icon: "home",
//       link: "/dashboard"
//     },
//     {
//       title: "Workouts",
//       icon: "today",
//       link: "/dashboard"
//     },
//     {
//       title: "Profile",
//       icon: "account_circle",
//       link: "/profile"
//     }
//   ];

//   get isNavOpen() {
//     return this.$store.state.isNavOpen;
//   }

//   set isNavOpen(value) {
//     this.$store.commit("setNav", value);
//   }
// }
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
@import "@/assets/styles/bottomNav.scss";
.bottom-nav {
  @include bottom-nav(
    $background-color: white,
    $active-color: black,
    $inactive-color: $secondaryColor,
    $hide-inactive-labels: false
  );
}
</style>
