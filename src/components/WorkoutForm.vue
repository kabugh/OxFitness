<template>
  <div class="form__wrapper q-pa-md">
    <div class="text-subtitle1">
      {{ scoreMessage }}
    </div>
    <q-form
      @submit="onSubmit"
      class="q-pa-md q-gutter-md"
      v-if="!$props.isFinished"
    >
      <q-input
        ref="name"
        filled
        v-model="workoutResults.name"
        label="Imię *"
        hint="Imię/Ksywka"
        :rules="[val => (val && val.length > 0) || 'Proszę uzupełnić pole']"
      />

      <q-input
        ref="time"
        filled
        type="number"
        v-model="workoutResults.time"
        label="Twój czas *"
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || 'Podaj swój czas',
          val => (val > 0 && val < 100) || 'Podaj poprawny czas'
        ]"
      />
      <div>
        <q-btn label="Dodaj wynik" type="submit" color="primary" />
      </div>
    </q-form>
    <q-form @submit="onUpdate" class="q-gutter-md" v-else>
      <q-input
        filled
        v-model="workoutResults.name"
        label="Imię *"
        hint="Imię/Ksywka"
        :rules="[val => (val && val.length > 0) || 'Proszę uzupełnić pole']"
      />

      <q-input
        filled
        type="number"
        v-model="workoutResults.time"
        label="Twój czas *"
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || 'Podaj swój czas',
          val => (val > 0 && val < 100) || 'Podaj poprawny czas'
        ]"
      />
      <div class="buttons__container">
        <q-btn
          label="Edytuj wynik"
          type="submit"
          color="secondary"
          class="q-ma-sm"
          v-close-popup
        />

        <q-btn
          label="Usuń swój wynik"
          color="primary"
          @click="onRemove"
          class="q-ma-sm"
          v-close-popup
        />
      </div>
    </q-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Workout, User } from "../store/models";

@Component({
  props: ["isFinished"]
})
export default class WorkoutForm extends Vue {
  workoutResults = {
    name: "",
    reps: 10,
    rounds: 4,
    time: 0,
    weight: 15
  };

  get scoreMessage() {
    return !this.$props.isLoading ? "Dodaj swój wynik" : "Edytuj swój wynik";
  }

  clearForm() {
    this.workoutResults = {
      name: "",
      reps: 0,
      rounds: 0,
      time: 0,
      weight: 0
    };
    // this.$refs.name.resetValidation();
    // this.$refs.age.resetValidation();
  }

  onSubmit() {
    const currentWorkout = (this.$route.params.workout as unknown) as Workout;
    let workout = {
      workoutId: currentWorkout.sys.id,
      workoutResults: {
        ...this.workoutResults
      }
    };
    this.$store.dispatch("uploadWorkoutResults", workout).then(() => {
      this.$emit("removed", false);
      this.clearForm();
      this.$q.notify({
        color: "green-8",
        textColor: "white",
        icon: "cloud_done",
        message: "Wynik pomyślnie wysłany!"
      });
    });
  }
  onUpdate() {
    const currentWorkout = (this.$route.params.workout as unknown) as Workout;
    let workout = {
      workoutId: currentWorkout.sys.id,
      workoutResults: {
        ...this.workoutResults
      }
    };
    this.$store.dispatch("updateWorkoutResults", workout).then(() => {
      this.clearForm();
      this.$q.notify({
        color: "green-8",
        textColor: "white",
        icon: "cloud_done",
        message: "Wynik zaktualizowany!"
      });
    });
  }
  onRemove() {
    const currentWorkout = (this.$route.params.workout as unknown) as Workout;
    let workout = {
      workoutId: currentWorkout.sys.id,
      workoutResults: {
        ...this.workoutResults
      }
    };
    this.$store.dispatch("removeWorkoutResults", workout).then(() => {
      this.$emit("removed", false);
      this.$q.notify({
        color: "green-8",
        textColor: "white",
        icon: "cloud_done",
        message: "Wynik usunięty!"
      });
    });
  }
}
</script>
