<template>
  <section class="workoutPage view">
    <div class="workoutPage__container">
      <h1>{{ currentWorkout.fields.dayOfTheWeek }}</h1>
      <WorkoutComponent
        :videoUrl="currentWorkout.fields.videoId"
      ></WorkoutComponent>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkoutComponent from "@/components/WorkoutComponent.vue";

@Component({
  components: {
    WorkoutComponent
  }
})
export default class WorkoutPage extends Vue {
  currentWorkout = this.$attrs.workout;
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.workoutPage {
  width: 100%;
  min-height: 100vh;
  color: black;
  .workoutPage__container {
    @include flex;
    flex-direction: column;
    padding: 2vh 6vw;
    width: 100%;
    height: 100%;
    h1 {
      padding: 2vh 0 4vh 0;
      text-align: center;
    }
  }
}
</style>
