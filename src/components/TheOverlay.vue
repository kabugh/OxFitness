/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <section ref="overlay" class="overlay view">
    <div class="overlay__wrapper">
      <div class="account__preview">
        <div class="account__avatar--wrapper">
          <img
            src="@/assets/1.jpg"
            class="account__avatar unselectable"
            alt="avatar"
          />
        </div>
        <div class="account__details">
          <h1>{{ $attrs.user.email }}</h1>
          <h2>{{ $attrs.user.id }}</h2>
        </div>
      </div>
      <ul class="overlay__items">
        <li class="item" v-for="(item, index) in navItems" :key="index">
          <!-- temporary solution, to be changed - v-if="$route.path !== item.link" -->
          <i
            v-if="$route.path !== item.link"
            class="item__icon material-icons md-36"
            >{{ item.icon }}</i
          >
          <div
            v-if="$route.path !== item.link"
            class="item__title"
            @click="$router.push(item.link)"
          >
            {{ item.title }}
          </div>
        </li>
        <li class="item">
          <i class="item__icon material-icons md-36">exit_to_app</i>
          <div class="item__title" @click="logOut">
            Log out
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class TheOverlay extends Vue {
  navItems = [
    {
      title: "My profile",
      icon: "account_circle",
      link: "/profile"
    },
    {
      title: "Notifications",
      icon: "markunread_mailbox",
      link: "/dashboard"
    },
    {
      title: "Settings",
      icon: "settings",
      link: "/"
    }
  ];

  closeOverlay() {
    document.body.classList.add("scrollbar");
    this.$refs.overlay.style.display = "none";
  }

  logOut() {
    this.$store.dispatch("signUserOut");
  }
}
</script>
<style lang="scss">
@import "~material-design-icons/iconfont/material-icons.css";
@import "@/assets/styles/global.scss";
.overlay {
  position: fixed;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  z-index: 99;
  .overlay__wrapper {
    padding: 2vh 4vh 4vh 4vh;
    .account__preview {
      @include flex;
      // display: grid;
      // grid-template-columns: 10vh auto;
      // grid-column-gap: 4vh;
      // height: 10vh;
      .account__avatar--wrapper {
        @include flex;
        justify-content: flex-start;
        flex: 1;
        img {
          width: 12vh;
          height: 12vh;
          border-radius: 50%;
          object-position: center;
          object-fit: cover;
        }
      }
      .account__details {
        @include flex;
        flex: 2;
        flex-direction: column;
        h1 {
          font-size: 1.25rem;
          letter-spacing: 2px;
        }
        h2 {
          margin-top: 2vh;
          // color: $secondaryColor;
          color: gray;
          font-size: 1rem;
          font-weight: 400;
        }
      }
    }
    .overlay__items {
      margin-top: 6vh;
      @include flex;
      flex-direction: column;
      .item {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 20px;
        align-items: center;
        padding: 2vh 0;
        .item__title {
          font-size: 1.15rem;
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
