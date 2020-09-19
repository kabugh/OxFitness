<template>
  <section class="overlay">
    <div ref="overlay" class="overlay__container">
      <div class="overlay__wrapper">
        <div class="account__preview">
          <div class="account__details">
            <div class="avatar__container">
              <q-avatar color="primary" text-color="white" size="4rem">{{
                user.name.charAt(0)
              }}</q-avatar>
            </div>
            <div class="user__details">
              <h3 ref="title">{{ user.name }}</h3>
              <h4>{{ user.email }}</h4>
            </div>
          </div>
        </div>
        <ul class="navItems">
          <li class="item" v-for="item in filteredNavItems" :key="item.link">
            <span @click="$router.push(item.link)">{{ item.title }}</span>
          </li>
          <li class="item">
            <span @click="logOut">Wyloguj</span>
          </li>
          <li class="socials__container item">
            <a
              :href="item.link"
              v-for="item in socialsItems"
              :key="item.link"
              target="_blank"
            >
              <img
                :src="require(`@/assets/icons/${item.icon}`)"
                alt="icon"
                class="unselectable"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { User } from "@/store/models";
import { Component, Prop, Vue } from "vue-property-decorator";

interface NavItem {
  title: string;
  link: string;
}

interface SocialItem {
  icon: string;
  link: string;
}

@Component
export default class NavOverlay extends Vue {
  @Prop({ required: true }) user!: User;
  navItems: NavItem[] = [
    {
      title: "Home",
      link: "/dashboard"
    },
    {
      title: "Profil",
      link: "/profile"
    }
  ];

  get filteredNavItems() {
    const fitleredItems: NavItem[] = [];
    this.navItems.forEach(item => {
      if (this.$route.path !== item.link) {
        fitleredItems.push(item);
      }
    });
    return fitleredItems;
  }

  logOut() {
    this.$store.dispatch("signUserOut");
  }

  socialsItems: SocialItem[] = [
    {
      icon: "insta.png",
      link: "https://www.instagram.com/tenis_planet/"
    },
    {
      icon: "fb.png",
      link: "https://www.facebook.com/oxfitnessprogram"
    },
    {
      icon: "yt.png",
      link: "https://www.youtube.com/channel/UCKD_wDLcAK9FTLmjDOAyHhQ"
    }
  ];
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
// enter/leave overlay animation
.navOverlay-enter-active,
.navOverlay-leave-active {
  transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);
}

.navOverlay-enter,
.navOverlay-leave-to {
  transform: translateY(100%);
}

.navOverlay-enter-to,
.navOverlay-leave {
  transform: translateY(0);
}

.overlay {
  position: fixed;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
  .overlay__container {
    height: 100%;
    width: 100%;
    color: white;
    background-color: #454545;
    transition: background-color 0.3s cubic-bezier(0.77, 0, 0.175, 1);
    .overlay__wrapper {
      padding: $verticalPadding * 2 4vh 4vh 4vh;
      @include flex;
      flex-direction: column;
      .account__preview {
        @include flex;
        .account__avatar--wrapper {
          @include flex;
          justify-content: flex-start;
          flex: 1;
        }
        .account__details {
          display: grid;
          column-gap: 5vw;
          grid-template-columns: repeat(2, auto);
          align-items: center;
          padding: 2rem;
          .user__details {
            h3 {
              font-size: 1.5rem;
              font-weight: bold;
            }
            h4 {
              font-size: 1rem;
              font-weight: 500;
            }
          }
        }
      }
      .navItems {
        padding: $verticalPadding / 2 0;
        display: grid;
        grid-template-columns: 1fr;
        row-gap: $verticalPadding / 2;
        width: max-content;
        margin: 0 auto;
        .item {
          font-size: 1.75rem;
          line-height: 1.5;
          :hover {
            cursor: pointer;
          }
        }
        .socials__container {
          @include flex;
          justify-content: flex-start;
          flex-direction: row;
          > a {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            padding: 1vh;
            transition: background-color 0.2s linear 0s;
            margin: 0 10px;
            &:hover {
              background-color: rgba(255, 255, 255, 0.1);
            }
            &:first-of-type {
              margin-left: -1vh;
            }
            &:last-of-type {
              margin-right: 0;
            }

            img {
              width: 28px;
              height: 28px;
            }
          }
        }
      }
    }

    @media (min-width: 360px) {
      .overlay__wrapper .navItems .item {
        font-size: 2rem;
      }
    }

    @media (min-width: 500px) {
      .overlay__wrapper .account__preview {
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

    @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
      .overlay__wrapper {
        padding-top: $verticalPadding * 4;
        .account__preview {
          display: none;
        }
        .navItems {
          grid-template-columns: repeat(2, 1fr);
          column-gap: $horizontalPadding;
          row-gap: $verticalPadding;
          .item {
            font-size: 2.25rem;
          }
        }
      }
    }
    @media (min-width: 800px) and (max-width: 850px) and (max-height: 400px) and (orientation: landscape) {
      .overlay__wrapper .navItems .item {
        font-size: 1.75rem;
      }
    }
    @media (max-width: 750px) and (max-height: 450px) and (orientation: landscape) {
      .overlay__wrapper .navItems .item {
        font-size: 2rem;
      }
    }
    @media (max-width: 650px) and (max-height: 450px) and (orientation: landscape) {
      .overlay__wrapper .navItems {
        row-gap: 4vh;
        .item {
          font-size: 1.75rem;
        }
      }
    }
  }
}
.body--dark .overlay .overlay__container {
  color: $dark-color;
  background-color: $bg-dark-secondary;
}
@media (min-width: 1280px) and (min-height: 500px) {
  .overlay {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .overlay__container {
      width: 100%;
      z-index: 0;
      grid-column: 2;
      .overlay__wrapper {
        align-items: flex-start;
        padding-left: 8vw;
        padding-right: 8vw;
        .navItems {
          .item {
            text-align: left;
            &:not(.socials__container) {
              display: inline;
              span {
                position: relative;
                &:hover:after {
                  width: 100%;
                }
                &::after {
                  content: "";
                  display: block;
                  position: absolute;
                  left: 0px;
                  background-color: white;
                  height: 0.2rem;
                  margin-top: 0.2rem;
                  transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
                  width: 0;
                }
              }
            }
          }
        }
      }
    }
  }

  .navOverlay-enter,
  .navOverlay-leave-to {
    transform: translateX(100%);
  }

  .navOverlay-enter-to,
  .navOverlay-leave {
    transform: translateX(0);
  }
}
@media (min-width: 1650px) and (min-height: 500px) {
  .overlay .overlay__container .overlay__wrapper .navItems .item {
    font-size: 2.75rem;
    &.socials__container > a img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
