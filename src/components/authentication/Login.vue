<template>
  <section class="login">
    <div class="login__container">
      <div class="form__wrapper">
        <form
          action
          @submit.prevent="onSignIn"
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
          <button
            type="submit"
            :disabled="disableInputs || $v.$invalid"
            :class="{ loading: disableInputs }"
          >
            login
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { User } from "../../store/models";

import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

@Component({
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
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
  email = "";
  password = "";

  get user(): User {
    return this.$store.getters.user;
  }

  get disableInputs() {
    return this.$store.state.loading;
  }

  set disableInputs(value) {
    this.$store.commit("setLoading", value);
  }

  onSignIn() {
    this.$store
      .dispatch("signUserIn", {
        email: this.email,
        password: this.password,
        path: this.$route.query.redirect
      })
      .then(() => {
        this.email = "";
        this.password = "";
        this.$v.$reset();
      });
    this.disableInputs = true;
  }
}
</script>
