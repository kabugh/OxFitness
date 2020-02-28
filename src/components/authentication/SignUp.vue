<template>
  <section class="signUp">
    <div class="signUp__container">
      <div class="form__wrapper">
        <form action @submit.prevent="onSignUp" autocomplete="false">
          <input
            type="text"
            v-model="email"
            :disabled="disableInputs"
            placeholder="Email"
            autocomplete="false"
          />
          <input
            type="password"
            v-model="password"
            :disabled="disableInputs"
            placeholder="Password"
            autocomplete="false"
          />
          <input
            type="password"
            v-model="confirmPassword"
            :disabled="disableInputs"
            placeholder="Confirm password"
            autocomplete="false"
          />
          <button
            type="submit"
            :disabled="disableInputs"
            :class="{ loading: disableInputs }"
          >
            create account
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "../../store/models";

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
@Component({
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },

  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/dashboard");
      }
    }
  }
})
export default class Login extends Vue {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  get user() {
    return this.$store.getters.user;
  }
  get disableInputs() {
    return this.$store.state.loading;
  }
  set disableInputs(value) {
    this.$store.commit("setLoading", value);
  }
  onSignUp() {
    this.$store.dispatch("signUserUp", {
      email: this.email,
      password: this.password
    });
    this.disableInputs = true;
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.signUp,
.login,
.passwordRecovery {
  .signUp__container,
  .login__container,
  .passwordRecovery__container {
    .form__wrapper {
      form {
        display: flex;
        justify-content: center;
        flex-direction: column;
        > input {
          margin-top: 20px;
          min-height: 5vh;
          &:disabled {
            color: $brandColor;
          }
        }
        button {
          margin-top: 4vh;
          display: inline-block;
          color: $brandColor;
          font-weight: bold;
          border-color: $brandColor;
          transition: all 0.3s ease-in-out;
          &:hover {
            background-color: $brandColor;
            color: white;
          }
          &.loading {
            &::before {
              width: 20px;
              height: 20px;
              border-radius: 12px;
              border: 3px solid black;
            }

            &::after {
              width: 26px;
              height: 26px;
              animation: spin 1s infinite linear;
            }
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          }
        }
      }
    }
  }
}
</style>
