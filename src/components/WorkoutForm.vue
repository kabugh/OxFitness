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
        v-if="resultKey == 'time'"
        ref="time"
        filled
        type="text"
        v-model="workoutResults.time"
        mask="##:##"
        fill-mask
        label="Czas *"
        hint="Przykład - 12:35"
        :rules="[
          val =>
            (val && val.length > 0 && !val.includes('_')) || 'Podaj swój czas'
        ]"
      />
      <q-input
        v-else-if="resultKey == 'reps'"
        ref="reps"
        filled
        type="number"
        v-model="workoutResults.reps"
        label="Powtórzenia *"
        :rules="[
          val => (val !== null && val !== '') || 'Podaj ilość powtórzeń',
          val => (val > 0 && val < 100) || 'Podaj poprawną ilość powtórzeń'
        ]"
      />
      <q-input
        ref="note"
        filled
        v-model="workoutResults.note"
        label="Notatka"
        hint="Twoje uwagi"
        :rules="[val => val.length < 100 || 'Maksymalnie 100 znaków']"
        autogrow
      />
      <div>
        <q-btn label="Dodaj wynik" type="submit" color="primary" />
      </div>
    </q-form>
    <q-form @submit="onUpdate" class="q-gutter-md" v-else>
      <!-- These inputs could be shrinked to only one element and filled with appropriate data -->
      <q-input
        v-if="resultKey == 'time'"
        ref="time"
        filled
        type="text"
        v-model="workoutResults.time"
        mask="##:##"
        fill-mask
        label="Czas *"
        hint="Przykład - 12:35"
        :rules="[
          val =>
            (val && val.length > 0 && !val.includes('_')) || 'Podaj swój czas'
        ]"
      />
      <q-input
        v-else-if="resultKey == 'reps'"
        ref="reps"
        filled
        type="number"
        v-model="workoutResults.reps"
        label="Powtórzenia *"
        :rules="[
          val => (val !== null && val !== '') || 'Podaj ilość powtórzeń',
          val => (val > 0 && val < 100) || 'Podaj poprawną ilość powtórzeń'
        ]"
      />
      <q-input
        ref="note"
        filled
        v-model="workoutResults.note"
        label="Notatka"
        hint="Twoje uwagi"
        :rules="[val => val.length < 100 || 'Maksymalnie 100 znaków']"
        autogrow
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
  props: ["isFinished", "user", "resultKey"]
})
export default class WorkoutForm extends Vue {
  mounted() {
    this.updateInputs();
    this.workoutResults.name = this.$props.user.email;
  }
  workoutResults = {
    name: "",
    reps: 0,
    rounds: 0,
    time: "00:00",
    weight: 0,
    note: ""
  };

  get scoreMessage() {
    return !this.$props.isLoading ? "Dodaj swój wynik" : "Edytuj swój wynik";
  }

  clearForm() {
    this.workoutResults = {
      name: "",
      reps: 0,
      rounds: 0,
      time: "00:00",
      weight: 0,
      note: ""
    };
    // this.$refs.name.resetValidation();
    // this.$refs.age.resetValidation();
  }

  updateInputs() {
    if (
      this.$props.user.workouts !== null &&
      this.$props.user.workouts !== undefined
    ) {
      if (Object.values(this.$props.user.workouts).length > 0) {
        const foundWorkout = Object.values(this.$props.user.workouts).find(
          workout => (workout as any).workoutId === this.$route.params.id
        );
        if (foundWorkout !== null && foundWorkout !== undefined)
          this.workoutResults = (foundWorkout as any).workoutResults;
      }
    }
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
<style lang="scss">
.form__wrapper {
  .q-field input,
  .q-field textarea {
    font-weight: 500;
  }
  .q-field textarea {
    max-height: 10vh;
  }
}
</style>
