<template>
  <section ref="overlay" class="overlay view">
    <div class="overlay__wrapper">
      <div class="account__preview">
        <div class="account__avatar--wrapper">
          <!-- <img
            src="@/assets/icons/pizza.png"
            class="account__avatar unselectable"
            alt="avatar"
          /> -->
        </div>
        <div class="account__details">
          <h1>{{ $attrs.user.email }}</h1>
          <h2>ABC Company my desc</h2>
        </div>
      </div>
      <ul class="overlay__items">
        <li class="item" v-for="(item, index) in navItems" :key="index">
          <i class="item__icon material-icons md-36">{{ item.icon }}</i>
          <div class="item__title" @click="$router.push(item.link)">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: "Overlay",
  data: () => ({
    navItems: [
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
    ]
  }),
  methods: {
    closeOverlay() {
      document.body.classList.add("scrollbar");
      this.$refs.overlay.style.display = "none";
    }
  }
};
</script>
<style lang="scss">
@import "~material-design-icons/iconfont/material-icons.css";
@import "@/assets/styles/global.scss";
.overlay {
  //   display: none;
  position: fixed;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  z-index: 99;
  .overlay__wrapper {
    padding: 2vh 4vh 4vh 4vh;
    .account__preview {
      display: grid;
      grid-template-columns: 25% auto;
      grid-column-gap: 2vh;
      .account__avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-position: center;
        object-fit: cover;
      }
      .account__details {
        @include flex;
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
        .item__icon {
        }
        .item__title {
          font-size: 1.15rem;
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
