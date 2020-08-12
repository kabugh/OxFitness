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
            v-model="email"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Anuluj"
            @click="emailDialog = false"
            v-close-popup
          />
          <q-btn flat label="Zmien email" @click="confirm = true" />
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

        <q-card-actions align="right" class="bg-white text-black">
          <q-btn flat label="Nie" @click="confirm = false" v-close-popup />
          <q-btn flat label="Tak" @click="changeEmail" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>
<script lang="ts">
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

  changeEmail() {
    this.$store.dispatch("changeEmail", this.email);
  }
}
</script>
