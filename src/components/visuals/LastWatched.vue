<template>
  <section
    class="lastWatched"
    v-if="Object.keys(lastWatched).length > 0"
    :style="{ backgroundImage: 'url(' + require('@/assets/1.jpg') + ')' }"
    @click="
      $router.push({
        name: 'workoutPage',
        params: {
          workoutType: findWorkoutType,
          id: lastWatched.sys.id,
          workout: lastWatched,
          hasInsideCategories: hasInsideCategories
        }
      })
    "
  >
    <div class="lastWatched__container">
      <h1>Ostatnio oglądany trening</h1>
      <h2>{{ lastWatched.fields.title }}</h2>
      <h3 v-if="lastWatched.fields.date">{{ lastWatched.fields.date }}</h3>
      <h3 v-else-if="lastWatched.fields.category">
        <strong>Kategoria:</strong> {{ lastWatched.fields.category }}
      </h3>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class lastWatched extends Vue {
  hasInsideCategories = false;
  get lastWatched() {
    return this.$store.getters.user.lastWatched;
  }

  get findWorkoutType() {
    let workoutType = "";
    switch (this.lastWatched.sys.contentType.sys.id) {
      case "accessoryWorkout": {
        workoutType = "accessories";
        this.hasInsideCategories = true;
        break;
      }
      case "dailyWorkout": {
        // check if the workout is active (dailyWorkouts) or archived
        const dailyCategory = this.$store.getters.workoutCategories.find(
          (cat: any) => cat.category === "daily"
        );

        const matchingWorkout = dailyCategory.workouts.find(
          (workout: any) => workout.sys.id === this.lastWatched.sys.id
        );
        if (matchingWorkout) {
          workoutType = "daily";
        } else {
          workoutType = "archived";
        }
        this.hasInsideCategories = false;
        break;
      }
      case "warmUp": {
        workoutType = "warm-up";
        this.hasInsideCategories = true;
        break;
      }
      default:
        workoutType = this.lastWatched.sys.contentType.sys.id;
    }
    return workoutType;
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";

.lastWatched {
  width: 100%;
  background-color: #f5f5f7;
  color: white;
  border-radius: 10px;
  min-height: 20vh;
  max-height: 30vh;
  overflow: hidden;
  @include backgroundDefault;
  &:hover {
    cursor: pointer;
  }
  .lastWatched__container {
    padding: 4vh;
    height: 100%;
    @include flex;
    align-items: flex-start;
    flex-direction: column;
    overflow: hidden;
    h1 {
      font-size: 1.25rem;
      font-weight: 700;
    }
    h2,
    h3 {
      font-size: 1.125rem;
      font-weight: 500;
      padding: 0;
      text-transform: capitalize;
    }
    h3 {
      font-size: 0.875rem;
      text-transform: capitalize;
    }
  }
  @media (min-width: 360px) {
    .lastWatched__container {
      h1 {
        font-size: 1.75rem;
      }
    }
  }
}

@media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
  .lastWatched {
    max-height: 45vh;
  }
}
</style>
