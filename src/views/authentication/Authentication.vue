<template>
  <section class="authentication" :class="{ 'body--dark': $q.dark.isActive }">
    <div class="logo__container">
      <div class="text__wrapper">
        <h1 @click="$router.push('/')">OxFitness</h1>
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
      <!-- <div class="auth__providers--contai">
        <button type="button" @click="google">Google</button>
      </div> -->
      <div class="status" v-if="passwordRecoveryTab">
        <h4>Pamiętasz hasło?</h4>
        <h4
          @click="
            loginTab = true;
            signUpTab = false;
            passwordRecoveryTab = false;
          "
          class="highlighted"
        >
          zaloguj się
        </h4>
      </div>
      <div class="status" v-if="loginTab">
        <h4>Nie masz konta?</h4>
        <h4
          @click="
            loginTab = false;
            signUpTab = true;
          "
          class="highlighted"
        >
          Zarejestruj się
        </h4>
        <div class="passwordStatus__container">
          <h4>Zapomniałeś hasło?</h4>
          <h4
            @click="
              loginTab = false;
              signUpTab = false;
              passwordRecoveryTab = true;
            "
            class="highlighted"
          >
            przypomnij
          </h4>
        </div>
      </div>
      <div class="status" v-if="signUpTab">
        <h4>Masz konto?</h4>
        <h4
          @click="
            loginTab = true;
            signUpTab = false;
          "
          class="highlighted"
        >
          Zaloguj się
        </h4>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import SignUp from "@/components/authentication/SignUp.vue";
import Login from "@/components/authentication/Login.vue";
import PasswordRecovery from "@/components/authentication/PasswordRecovery.vue";
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
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
  created() {
    if (this.$route.params.authMode === "signUp") {
      this.loginTab = false;
      this.signUpTab = true;
    }
  }

  google() {
    this.$store.dispatch("signUserUpWithGoogle");
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.authentication {
  width: 100%;
  height: 100vh;
  position: relative;
  display: grid;
  grid-template-rows: 0.2fr minmax(0.8fr, auto);
  .logo__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: $brandColor;
    text-transform: uppercase;
    padding-top: 4vh;
    h1 {
      font-size: 3rem;
      font-weight: 600;
      letter-spacing: -1px;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
    h3 {
      text-align: center;
      letter-spacing: 4px;
      font-weight: 400;
      font-size: 1.15rem;
    }
  }
  &.body--dark .logo__container {
    color: $dark-color;
  }
  .authentication__container {
    width: 80%;
    margin: 0 auto;
    padding: 2vh 2vh;
    @include flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: auto;
    min-height: 80vh;
    > section {
      width: 100%;
    }
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
      @include flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      margin-top: 40px;
      bottom: 10vh;
      h4 {
        color: $secondaryColor;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.8rem;
        white-space: nowrap;
        margin-top: 8px;
        font-weight: bolder;

        &.highlighted {
          color: $brandColor;
          font-size: 0.8rem;
          text-decoration: underline;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .passwordStatus__container {
        margin-top: 10px;
      }
      @media (min-width: 360px) {
        margin-top: 30px;
        h4 {
          margin-top: 10px;
          &.highlighted {
            font-size: 0.9rem;
          }
        }
        .passwordStatus__container {
          margin-top: 20px;
        }
      }
    }
  }
  &.body--dark {
    .authentication__container .status h4.highlighted {
      color: $brand-dark;
    }
  }
  @media (min-width: 500px) and (max-width: 1100px) and (min-height: 320px) and (max-height: 800px) and (orientation: landscape) {
    height: auto;
    min-height: 100vh;
  }
}
</style>
