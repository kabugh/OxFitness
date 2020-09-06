<template>
  <section class="reauthentication">
    <q-dialog v-model="reauthenticationDialog" persistent>
      <q-card style="min-width: 320px">
        <q-card-section>
          <h6>
            Wygląda na to, że ostatnio nie wystąpiło logowanie z podaniem hasła
            na Twoim koncie.
          </h6>
          <p>
            Ze względów bezpieczeństwa, aby dokonać zamierzonej czynności,
            trzeba podać aktualne hasło. Następnie będzie można wykonać docelowe
            działanie.
          </p>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            type="password"
            placeholder="Hasło"
            v-model.trim="password"
            autofocus
            @keyup.enter="prompt = false"
            :rules="[
              val => (val && val.length > 0) || 'Proszę podać hasło',
              val =>
                val.length >= 8 || 'Hasło musi posiadać conajmniej 8 znaków.'
            ]"
            autocomplete="off"
            class="q-px"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Anuluj"
            @click="reauthenticationDialog = false"
            v-close-popup
          />
          <q-btn flat label="Zaloguj się ponownie" @click="reauthenticate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Reauthentication extends Vue {
  @Prop({ required: true }) action!: string;
  confirm = false;
  password = "";

  get reauthenticationDialog(): boolean {
    return this.$store.getters.reauthenticationDialog;
  }

  set reauthenticationDialog(value: boolean) {
    this.$store.commit("setReauthenticationDialog", value);
  }

  cancelChange() {
    this.confirm = false;
    this.reauthenticationDialog = false;
  }

  reauthenticate() {
    this.$store.dispatch("reauthenticateUser", {
      action: this.$props.action,
      password: this.password
    });
  }
}
</script>
<style lang="scss">
h6 {
  margin: 0 0 2vh 0;
  font-size: 1.125rem;
}
</style>
