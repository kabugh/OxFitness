<template>
  <q-dialog persistent v-model="welcomeDialog">
    <q-card class="my-card">
      <q-card-section class="q-pt-lg">
        <div class="row no-wrap items-center">
          <div class="col-auto text-grey column items-center">
            <h2>Witamy w OxFitness - przywitaj się i poznaj nasze community</h2>
            <img
              src="@/assets/illustrations/fitness3.svg"
              class="welcomeIllustration unselectable"
              alt="welcomeIllustration"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-lg column items-center">
        <q-form @submit="onSubmit">
          <q-input
            ref="name"
            filled
            v-model.trim="passedUserName"
            label="Imię *"
            hint="Przywitaj się, podaj imię/ksywkę"
            :rules="[val => (val && val.length > 0) || 'Proszę uzupełnić pole']"
          />
          <q-btn
            type="submit"
            label="Rozpocznij przygodę"
            color="primary"
            class="q-ma-lg"
            v-close-popup
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { User } from "../store/models";

@Component
export default class WelcomeComponent extends Vue {
  @Prop({ required: true }) welcomeDialog = false;
  passedUserName = "";

  get user(): User {
    return this.$store.getters.user;
  }

  onSubmit() {
    this.$store.dispatch("updateUsername", this.passedUserName);
  }
}
</script>
<style lang="scss">
.q-card {
  h2 {
    font-size: 1.25rem;
    font-weight: 400;
    text-align: center;
    color: black;
  }
  .welcomeIllustration {
    max-width: 80%;
    max-height: 20vh;
    object-fit: contain;
    margin: 3vh auto;
  }
}
</style>
