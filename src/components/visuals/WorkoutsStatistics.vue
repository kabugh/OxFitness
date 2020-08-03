<template>
  <section class="workoutsStatistics" v-if="finishedDailyWorkouts > 0">
    <div class="workoutsStatistics__container">
      <div class="statisticsItem__container">
        <h1>{{ finishedDailyWorkouts }}</h1>
        <p>Ukończone treningi codzienne</p>
      </div>
      <div class="statisticsItem__container">
        <h1>8</h1>
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
    if (this.user.workouts) return Object.keys(this.user.workouts).length;
    else return 0;
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
      background-color: #f5f5f7;
      color: black;
      // background: #6b108e;
      // background: -webkit-linear-gradient(to bottom, #958efa, #6b108e);
      // background: linear-gradient(to bottom, #958efa, #6b108e);
      // &:last-of-type {
      //   background: #4568dc;
      //   background: -webkit-linear-gradient(to bottom, #958efa, #f1c40f);
      //   background: linear-gradient(to bottom, #958efa, #f1c40f);
      // }
      // color: white;
      border-radius: 10px;
      max-height: 30vh;
      @include flex;
      align-items: center;
      flex-direction: column;
      padding: 2vh;
      text-align: center;
      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        white-space: nowrap;
      }
      p {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
}
</style>
