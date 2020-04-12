<template>
  <section class="passwordRecovery">
    <div class="passwordRecovery__container">
      <div class="form__wrapper">
        <form action @submit.prevent="onPasswordRecovery" autocomplete="false">
          <input
            type="text"
            v-model="email"
            :disabled="disableInputs"
            placeholder="Email"
            autocomplete="false"
          />
          <button type="submit">odzyskaj hasło</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
@Component({
  validations: {
    email: {
      required,
      email
    }
  }
})
export default class Login extends Vue {
  email: string = "";

  get disableInputs() {
    return this.$store.state.loading;
  }
  set disableInputs(value) {
    this.$store.commit("setLoading", value);
  }
  onPasswordRecovery() {
    this.$store.dispatch("changePassword", this.email);
    this.disableInputs = true;
  }
}
</script>
