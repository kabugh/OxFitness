/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <section ref="overlay" class="overlay topView">
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
        </div>
      </div>
      <!-- <ul class="overlay__items">
        <li class="item" v-for="(item, index) in filteredNavItems" :key="index">
          <i class="item__icon material-icons md-36">{{ item.icon }}</i>
          <div class="item__title" @click="$router.push(item.link)">
            {{ item.title }}
          </div>
        </li>
        <li class="item">
          <i class="item__icon material-icons md-36">exit_to_app</i>
          <div class="item__title" @click="logOut">
            Log out
          </div>
        </li>
      </ul> -->
      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar rounded color="purple" text-color="white" icon="home" />
          </q-item-section>
          <q-item-section>Test</q-item-section>
        </q-item>
      </q-list>
    </div>
  </section>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class TheOverlay extends Vue {
  navItems = [
    {
      title: "Home",
      icon: "home",
      link: "/dashboard"
    },
    {
      title: "My profile",
      icon: "account_circle",
      link: "/profile"
    }
  ];

  get filteredNavItems() {
    let fitleredItems = [];
    this.navItems.forEach(item => {
      if (this.$route.path !== item.link) {
        fitleredItems.push(item);
      }
    });
    return fitleredItems;
  }

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
    @include flex;
    flex-direction: column;
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
      display: grid;
      grid-template-columns: minmax(350px, 100%);
      margin: 0 auto;
      .item {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 20px;
        align-items: center;
        padding: 2vh 0;
        .item__title {
          font-size: 1.15rem;
          text-transform: capitalize;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    @media (min-width: 500px) {
      .account__preview {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2vh;
        .account__avatar--wrapper {
          padding-bottom: 4vh;
          .account__avatar {
            width: 16vh;
            height: 16vh;
          }
        }
      }
    }
  }
}
</style>
