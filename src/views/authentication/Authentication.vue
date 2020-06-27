<template>
  <section class="authentication">
    <div class="logo__container">
      <!-- <img src="@/assets/icons/iconLogo.png" alt="logo" class="unselectable" /> -->
      <div class="text__wrapper">
        <h1>OxFitness</h1>
        <h3>Codzienne treningi</h3>
      </div>
    </div>
    <div class="authentication__container">
      <transition name="fade">
        <SignUp v-if="signUpTab" :class="{ active: signUpTab }" />
        <Login v-if="loginTab" :class="{ active: loginTab }" />
        <PasswordRecovery
          v-if="passwordRecoveryTab"
          :class="{ active: passwordRecoveryTab }"
        />
      </transition>
      <div class="status" v-if="passwordRecoveryTab">
        <h4>Pamiętasz hasło?</h4>
        <h4
          class="highlighted"
          @click="
            loginTab = true;
            signUpTab = false;
            passwordRecoveryTab = false;
          "
        >
          zaloguj się
        </h4>
      </div>
      <div class="status" v-else>
        <h4>Zapomniałeś hasło?</h4>
        <h4
          class="highlighted"
          @click="
            loginTab = false;
            signUpTab = false;
            passwordRecoveryTab = true;
          "
        >
          przypomnij
        </h4>
      </div>
      <!-- <div class="status" v-if="loginTab">
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
        <div class="passwordStatus__container">
          <h4>Forgot your password?</h4>
          <h4 class="highlighted">Remind</h4>
        </div>
      </div> -->
      <!-- <div class="status" v-if="signUpTab">
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
        <div class="passwordStatus__container">
          <h4>Forgot your password?</h4>
          <h4 class="highlighted">Remind</h4>
        </div>
      </div> -->
    </div>
  </section>
</template>
<script lang="ts">
import SignUp from "@/components/authentication/SignUp.vue";
import Login from "@/components/authentication/Login.vue";
import PasswordRecovery from "@/components/authentication/PasswordRecovery.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    SignUp,
    Login,
    PasswordRecovery
  }
})
export default class Authentication extends Vue {
  loginTab = true;
  signUpTab = false;
  passwordRecoveryTab = false;
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.authentication {
  width: 100%;
  height: 100vh;
  position: relative;
  .logo__container {
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
      font-size: 3rem;
      font-weight: 600;
      letter-spacing: -1px;
      text-align: center;
    }
    h3 {
      text-align: center;
      letter-spacing: 4px;
      font-weight: 400;
      font-size: 1.15rem;
    }
  }
  .authentication__container {
    width: 80%;
    margin: 0 auto;
    padding: 2vh 2vh;
    // @include flex;
    // align-items: center;
    @media (min-width: 360px) {
      padding: 8vh 2vh 4vh 2vh;
    }
    @media (min-width: 600px) {
      max-width: 60vw;
    }
    @media (min-width: 1000px) {
      max-width: 600px;
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
        margin-top: 10px;
        font-weight: bolder;

        &.highlighted {
          color: $brandColor;
          font-size: 0.9rem;
          text-decoration: underline;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .passwordStatus__container {
        margin-top: 20px;
      }
    }
  }
}
</style>
