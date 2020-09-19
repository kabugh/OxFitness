<template>
  <section class="changeEmail">
    <q-dialog v-model="emailDialog" persistent>
      <q-card style="min-width: 320px">
        <q-card-section>
          <div class="text-h6">Podaj nowy adres email</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model.trim="email"
            autofocus
            @keyup.enter="prompt = false"
            :rules="[val => !!val || 'Proszę podać adres email', isValidEmail]"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Anuluj"
            @click="emailDialog = false"
            v-close-popup
          />
          <q-btn flat label="Zmien email" @click="changeEmail" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="confirm"
      persistent
      transition-show="scale"
      transition-hide="scale"
      style="min-width: 320px; max-width: 400px"
    >
      <q-card class="bg-primary text-white">
        <q-card-section>
          <div class="text-h6">Zmiana adresu email</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Czy napewno zmienić adres email przypisany do konta?
        </q-card-section>

        <q-card-actions align="right" class="text-white">
          <q-btn flat label="Nie" @click="cancelChange" v-close-popup />
          <q-btn flat label="Tak" @click="confirmEmailChange" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>
<script lang="ts">
import { Notify } from "quasar";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ChangeEmail extends Vue {
  email = "";
  confirm = false;

  get emailDialog(): boolean {
    return this.$store.getters.emailDialog;
  }

  set emailDialog(value: boolean) {
    this.$store.commit("setEmailDialog", value);
  }

  get user() {
    return this.$store.getters.user;
  }

  isValidEmail(val: string) {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "Proszę podać poprawny adres email";
  }

  cancelChange() {
    this.confirm = false;
    this.emailDialog = false;
    this.email = "";
  }

  changeEmail() {
    if (this.email === this.user.email) {
      Notify.create({
        type: "negative",
        message: "Podany email jest już przypisany do Twojego konta."
      });
      this.confirm = false;
      this.email = "";
    } else {
      this.confirm = true;
    }
  }

  confirmEmailChange() {
    this.$store.dispatch("changeEmail", this.email);
    this.emailDialog = false;
    this.email = "";
  }
}
</script>
