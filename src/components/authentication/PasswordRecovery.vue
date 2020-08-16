<template>
  <section class="passwordRecovery">
    <div class="passwordRecovery__container">
      <div class="form__wrapper">
        <form
          action
          @submit.prevent="onPasswordRecovery"
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
          <button
            type="submit"
            :disabled="disableInputs || $v.$invalid"
            :class="{ loading: disableInputs }"
          >
            odzyskaj hasło
          </button>
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
  mixins: [validationMixin],
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
