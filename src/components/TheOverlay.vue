<template>
  <section ref="overlay" class="overlay">
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
      <q-list>
        <q-item
          v-for="(item, index) in filteredNavItems"
          :key="index"
          @click="
            $router.push(item.link);
            closeOverlay;
          "
          clickable
        >
          <q-item-section avatar>
            <q-avatar rounded text-color="white" :icon="item.icon" />
          </q-item-section>
          <q-item-section>{{ item.title }}</q-item-section>
        </q-item>
        <q-item @click="logOut" clickable>
          <q-item-section avatar>
            <q-avatar text-color="white" icon="input" />
          </q-item-section>
          <q-item-section>Wyloguj</q-item-section>
        </q-item>
      </q-list>
    </div>
  </section>
</template>
<script>
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  props: ["user"]
})
export default class TheOverlay extends Vue {
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
@import "@/assets/styles/global.scss";
// enter/leave overlay animation
.theOverlay-enter-active,
.theOverlay-leave-active {
  transition: transform 1s cubic-bezier(0.76, 0, 0.24, 1);
}

.theOverlay-leave-active {
  transition-duration: 1s;
}

.theOverlay-enter,
.theOverlay-leave-to {
  transform: translateY(100%);
}

.theOverlay-enter-to,
.theOverlay-leave {
  transform: translateX(0);
}

.overlay {
  position: fixed;
  bottom: 0;
  height: 100%;
  width: 100%;
  color: white;
  background-color: #3e3e3e;
  z-index: 99;
  .overlay__wrapper {
    padding: 12vh 4vh 4vh 4vh;
    @include flex;
    flex-direction: column;
    .account__preview {
      @include flex;
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
    @media (min-width: 768px) {
      max-width: 70vw;
      margin: 0 auto;
      align-items: center;
      .q-list {
        @include flex;
        align-items: flex-start;
        flex-direction: column;
      }
    }
  }
}
</style>
