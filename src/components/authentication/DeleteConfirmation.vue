<template>
  <section class="changeEmail">
    <q-dialog v-model="deleteDialog" persistent>
      <q-card style="min-width: 320px">
        <q-card-section class="card__content">
          <div class="text-h6">Czy chcesz usunąć konto?</div>
          <p>
            To działanie jest nieodwracalne. Konto zostanie usunięte i nie
            bedzie można go przywrócić.
          </p>
          <p>
            Proszę przepisać
            <strong>konto/{{ user.name }}</strong> aby potwierdzić.
          </p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="confirmation"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Anuluj"
            @click="deleteDialog = false"
            v-close-popup
          />
          <q-btn
            flat
            label="Usuń konto"
            class="text-white bg-negative"
            :disable="confirmation !== confirmationPattern"
            @click="deleteAccount"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { User } from "@/store/models";

@Component
export default class DeleteConfirmation extends Vue {
  @Prop() user!: User;
  confirmation = "";
  confirmationPattern = "";

  created() {
    this.confirmationPattern = `konto/${this.user.name}`;
  }

  get deleteDialog(): boolean {
    return this.$store.getters.deleteDialog;
  }

  set deleteDialog(value: boolean) {
    this.$store.commit("setDeleteDialog", value);
  }

  deleteAccount() {
    this.$store.dispatch("deleteAccount");
  }
}
</script>
<style lang="scss">
.q-dialog .q-dialog__inner .q-card .q-card__section {
  .text-h6 {
    margin-bottom: 2vh;
  }
  p {
    line-height: 1.75;
    &:last-of-type {
      margin-top: 10px;
    }
  }
}
</style>
