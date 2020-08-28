<template>
  <section class="changeUsername">
    <q-dialog v-model="usernameDialog" persistent>
      <q-card style="min-width: 320px">
        <q-card-section>
          <div class="text-h6">Podaj nowy nazwę</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="username"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Anuluj"
            @click="usernameDialog = false"
            v-close-popup
          />
          <q-btn flat label="Zmien nazwe" @click="confirm = true" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="confirm"
      persistent
      transition-show="scale"
      transition-hide="scale"
      style="min-width: 320px"
    >
      <q-card class="bg-primary text-white" style="max-width: 400px">
        <q-card-section>
          <div class="text-h6">Zmiana nazwy użytkownika</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Czy napewno zmienić swoją nazwę przypisaną do tego konta?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-black">
          <q-btn flat label="Nie" @click="cancelChange" v-close-popup />
          <q-btn flat label="Tak" @click="changeUsername" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ChangeUsername extends Vue {
  username = "";
  confirm = false;

  get usernameDialog(): boolean {
    return this.$store.getters.usernameDialog;
  }

  set usernameDialog(value: boolean) {
    this.$store.commit("setUsernameDialog", value);
  }

  cancelChange() {
    this.confirm = false;
    this.usernameDialog = false;
    this.username = "";
  }

  changeUsername() {
    this.$store.dispatch("updateUsername", this.username);
    this.usernameDialog = false;
    this.username = "";
  }
}
</script>
