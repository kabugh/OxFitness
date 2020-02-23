<template>
  <section class="authentication">
    <div class="logo__wrapper">
      <!-- <img src="@/assets/icons/iconLogo.png" alt="logo" class="unselectable" /> -->
      <div class="text__wrapper">
        <h1>OxFit</h1>
        <h3>Your daily workouts</h3>
      </div>
    </div>
    <div class="authentication__wrapper">
      <transition name="fade">
        <SignUp v-if="signUpTab" :class="{ active: signUpTab }" />
        <Login v-if="loginTab" :class="{ active: loginTab }" />
      </transition>
      <div class="status" v-if="loginTab">
        <h4>Don't have an account?</h4>
        <h4
          class="highlighted"
          @click="
            loginTab = false;
            signUpTab = true;
          "
        >
          Sign up
        </h4>
      </div>
      <div class="status" v-else-if="signUpTab">
        <h4>Already a member?</h4>
        <h4
          class="highlighted"
          @click="
            loginTab = true;
            signUpTab = false;
          "
        >
          login
        </h4>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import SignUp from "./SignUp.vue";
import Login from "./Login.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    SignUp,
    Login
  }
})
export default class Authentication extends Vue {
  loginTab = true;
  signUpTab = false;
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.authentication {
  width: 100%;
  height: 100vh;
  position: relative;
  .logo__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: $brandColor;
    text-transform: uppercase;
    padding-top: 4vh;
    img {
      width: 40%;
      margin: 0 auto;
    }
    h1 {
      font-size: 4rem;
      font-weight: 600;
      letter-spacing: -1px;
      text-align: center;
    }
    h3 {
      text-align: center;
      letter-spacing: 4px;
      font-weight: 400;
      font-size: 1.25rem;
    }
  }
  .authentication__wrapper {
    width: 80%;
    margin: 0 auto;
    padding: 2vh 2vh;
    @media (min-width: 360px) {
      padding: 8vh 2vh 4vh 2vh;
    }
    .fade-enter-active {
      transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
    .status {
      text-align: center;
      margin-top: 30px;
      position: absolute;
      bottom: 10vh;
      left: 50%;
      transform: translate(-50%, 0);
      h4 {
        color: $secondaryColor;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.8rem;
        white-space: nowrap;
        &.highlighted {
          color: $brandColor;
          font-size: 0.9rem;
          text-decoration: underline;
        }
        &:last-child {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
