<template>
  <div class="q-gutter-y-md">
    <q-tabs
      v-model="tab"
      class="text-grey-6 shadow-2 bottom__tabs"
      active-color="grey-2"
      indicator-color="primary"
      switch-indicator
      align="justify"
      dense
      :class="{
        hidden: $route.path !== '/dashboard' && $route.path !== '/profile',
        'bg-dark': $q.dark.isActive,
        'bg-color': !$q.dark.isActive
      }"
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
    <nav
      class="topNav text-white"
      :class="{ 'bg-dark-secondary': $q.dark.isActive }"
      v-if="$route.path === '/dashboard'"
    >
      <div class="logo">
        <h3 v-scroll-to="'.topNav'">OxFitness</h3>
      </div>
      <ul class="nav__items"></ul>
      <div class="avatar__container">
        <q-avatar
          color="primary"
          text-color="white"
          size="3rem"
          @click="$router.push('/profile')"
          >{{ user.name.charAt(0) }}</q-avatar
        >
        <span @click="$router.push('/profile')">Profil</span>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/store/models";

@Component
export default class BottomTabs extends Vue {
  tab = "Home";
  navItems = [
    {
      title: "Home",
      icon: "home",
      link: "/dashboard"
    },
    {
      title: "Profil",
      icon: "account_circle",
      link: "/profile"
    }
  ];
  get isNavOpen() {
    return this.$store.getters.isNavOpen;
  }

  get user(): User {
    return this.$store.getters.user;
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.platform-ios-only {
  .q-gutter-y-md .q-tabs {
    padding-bottom: 20px;
  }
}
.q-tabs.bg-color {
  background-color: $neutral;
}
.q-gutter-y-md {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 99;

  nav {
    display: none;
  }
}

@media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
  .q-gutter-y-md .bottom__tabs.hidden {
    display: none;
  }
}

@media (min-width: 1024px) {
  .q-gutter-y-md {
    top: 0;
    bottom: auto;
    .bottom__tabs {
      display: none;
    }
    nav.topNav {
      width: 100%;
      min-height: 6vh;
      position: fixed;
      background-color: $neutral;
      &.bg-dark-secondary {
        background-color: $bg-dark-secondary;
        color: $text-dark !important;
      }
      padding: 15px 6vw;
      z-index: 100;
      transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);
      -webkit-transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr;
      align-items: center;
      justify-content: center;
      .logo {
        h3 {
          font-weight: 600;
          font-size: 1.75rem;
          text-transform: uppercase;
          width: max-content;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .avatar__container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .q-avatar {
          width: 48px;
          height: 48px;
          &:hover {
            cursor: pointer;
          }
        }
        span {
          margin-left: 2vw;
          font-size: 1rem;
          font-weight: 600;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
