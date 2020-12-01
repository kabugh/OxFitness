<template>
  <section
    class="workoutsStatistics"
    :class="{ 'body--dark': $q.dark.isActive }"
    v-if="finishedDailyWorkouts > 0"
  >
    <div class="workoutsStatistics__container">
      <div class="statisticsItem__container">
        <h1>{{ finishedDailyWorkouts }}</h1>
        <p>Ukończone treningi codzienne</p>
      </div>
      <div class="statisticsItem__container">
        <h1>{{ newWorkoutsWeekly }}</h1>
        <p>Nowe treningi w tym tygodniu</p>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class WorkoutsStatistics extends Vue {
  get user() {
    return this.$store.getters.user;
  }

  get finishedDailyWorkouts() {
    if (this.user && "workouts" in this.user) {
      if (this.user.workouts !== undefined)
        return Object.keys(this.user.workouts).length;
      else return 0;
    } else return 0;
  }

  get newWorkoutsWeekly() {
    return this.getRandomInt(5, 8);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";

.workoutsStatistics {
  width: 100%;
  .workoutsStatistics__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 4vh;
    .statisticsItem__container {
      background-color: $bg-cards;
      color: black;
      border-radius: 10px;
      max-height: 30vh;
      @include flex;
      align-items: center;
      flex-direction: column;
      padding: 2vh;
      text-align: center;
      h1 {
        font-size: 1.75rem;
        font-weight: 700;
        white-space: nowrap;
      }
      p {
        font-size: 0.875rem;
        font-weight: 500;
      }
      @media (min-width: 360px) {
        h1 {
          font-size: 2.5rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }
  }
  &.body--dark .workoutsStatistics__container .statisticsItem__container {
    background-color: $bg-dark-light;
    color: $text-dark;
  }
}
</style>
