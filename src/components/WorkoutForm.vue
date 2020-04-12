<template>
  <div class="form__wrapper q-pa-md">
    <div class="text-subtitle1" v-if="!isFinished">
      Dodaj swój wynik
    </div>
    <div class="text-subtitle1" v-else>
      Edytuj swój wynik
    </div>
    <q-form @submit="onSubmit" class="q-gutter-md" v-if="!$props.isFinished">
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
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
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
      <div>
        <q-btn label="Submit" type="submit" color="secondary" />
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

  onSubmit() {
    const currentWorkout: unknown = this.$route.params.workout;
    let workout = {
      workoutId: (currentWorkout as Workout).sys.id,
      workoutResults: {
        ...this.workoutResults
      }
    };
    this.$store.dispatch("uploadWorkoutResults", workout);
    this.$q.notify({
      color: "green-8",
      textColor: "white",
      icon: "cloud_done",
      message: "Wynik pomyślnie wysłany!"
    });
  }
  onUpdate() {
    const currentWorkout: unknown = this.$route.params.workout;
    let workout = {
      workoutId: (currentWorkout as Workout).sys.id,
      workoutResults: {
        ...this.workoutResults
      }
    };
    this.$store.dispatch("updateWorkoutResults", workout);
    this.$q.notify({
      color: "green-8",
      textColor: "white",
      icon: "cloud_done",
      message: "Wynik zaktualizowany!"
    });
  }
}
</script>
