<template>
  <section class="signUp" :class="{ 'body--dark': $q.dark.isActive }">
    <div class="signUp__container">
      <div class="form__wrapper">
        <form
          action
          @submit.prevent="onSignUp"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <input
            type="text"
            v-model.trim="email"
            :disabled="disableInputs"
            placeholder="Email"
            autocomplete="off"
            @blur="$v.email.$touch()"
            :class="{ 'form--error': $v.email.$error }"
          />
          <span class="error" v-if="!$v.email.required && $v.email.$error">
            Proszę podać adres email.
          </span>
          <span class="error" v-if="!$v.email.email && $v.email.$error">
            Proszę podać poprawny adres email.
          </span>
          <input
            type="password"
            v-model.trim="password"
            :disabled="disableInputs"
            placeholder="Hasło"
            autocomplete="off"
            @blur="$v.password.$touch()"
            :class="{ 'form--error': $v.password.$error }"
          />
          <password v-model="password" :strength-meter-only="true" />
          <span
            class="error"
            v-if="!$v.password.required && $v.password.$error"
          >
            Proszę podać hasło.
          </span>
          <span class="error" v-if="!$v.password.minLength">
            Hasło musi posiadać conajmniej
            {{ $v.password.$params.minLength.min }} znaków.
          </span>
          <input
            type="password"
            v-model.trim="confirmPassword"
            :disabled="disableInputs"
            placeholder="Potwierdź hasło"
            autocomplete="off"
            @blur="$v.confirmPassword.$touch()"
            :class="{ 'form--error': $v.confirmPassword.$error }"
          />
          <span
            class="error"
            v-if="!$v.password.required && $v.password.$error"
          >
            Proszę potwierdzić hasło.
          </span>
          <span
            class="error"
            v-if="
              !$v.confirmPassword.sameAsPassword && $v.confirmPassword.$error
            "
          >
            Hasło nie zgadza się z podanym powyżej
          </span>

          <button
            type="submit"
            :disabled="disableInputs || $v.$invalid"
            :class="{ loading: disableInputs }"
          >
            utwórz konto
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import Password from "vue-password-strength-meter";

@Component({
  mixins: [validationMixin],
  components: {
    Password
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
    confirmPassword: {
      sameAsPassword: sameAs("password")
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
export default class SignUp extends Vue {
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

  clearInputs() {
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
  }

  onSignUp() {
    this.$store
      .dispatch("signUserUp", {
        email: this.email,
        password: this.password
      })
      .then(response => {
        this.clearInputs();
        this.$v.$reset();
      });
    this.disableInputs = true;
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
$error: #c10015;
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
          margin-top: 10px;
          min-height: 5vh;
          &:disabled {
            color: $brandColor;
          }
          &.form--error {
            border-color: $error;
            color: $error;
          }
        }
        span.error {
          transition: all 0.5s ease-in-out;
          color: $error;
          font-size: 0.7rem;
        }
        .Password {
          width: 100%;
          max-width: none !important;
          .Password__strength-meter {
            margin-bottom: 5px;
          }
        }
        button {
          margin-top: 3vh;
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
          @media (max-width: 360px) {
            padding: 8px 20px;
          }
        }

        @media (min-width: 360px) {
          > input {
            margin-top: 8px;
          }
          span.error {
            font-size: 1rem;
          }
          .Password__strength-meter {
            margin-bottom: 10px;
          }
          button {
            margin-top: 4vh;
          }
        }
        @media (min-width: 500px) {
          > input {
            margin-top: 20px;
          }
        }
      }
    }
  }
  &.body--dark {
    .signUp__container,
    .login__container,
    .passwordRecovery__container {
      .form__wrapper form {
        > input {
          background-color: $bg-dark-secondary;
          color: $secondaryColor;
          border-color: $primary;
        }
        .Password .Password__strength-meter {
          background-color: $secondaryColor;
          &:before,
          &:after {
            border-color: $bg-dark;
          }
        }

        button {
          background-color: $primary;
          color: $dark-color;
          border-color: $primary;
        }
      }
    }
  }
}
</style>
