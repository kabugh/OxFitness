<template>
  <section class="login">
    <div class="login__container">
      <div class="form__wrapper">
        <form action @submit.prevent="onSignIn" autocomplete="false">
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
            placeholder="Hasło"
            autocomplete="false"
          />
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
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
    this.$store.dispatch("signUserIn", {
      email: this.email,
      password: this.password,
      path: this.$route.query.redirect
    });
    this.disableInputs = true;
  }
}
</script>
