<template>
  <section class="workouts view">
    <div class="workouts__container container">
      <h2>{{ $attrs.workoutType }} workouts</h2>
      <div class="videos__container" v-if="workouts.length > 0">
        <div
          class="video__wrapper"
          v-for="(workout, index) in workouts"
          :key="index"
        >
          <h2>{{ workout.fields.dayOfTheWeek }}</h2>
          <img
            src="@/assets/sample.png"
            alt="video
          thumbnail"
            class="thumbnail"
            @click="
              $router.push({
                name: 'workoutPage',
                params: {
                  workoutType: $attrs.workoutType,
                  id: workout.sys.id,
                  workout: workout
                }
              })
            "
          />
          <div class="button__wrapper">
            <button
              type="button"
              class="dark"
              @click="
                $router.push({
                  name: 'workoutPage',
                  params: {
                    id: workout.id,
                    workout: workout
                  }
                })
              "
            >
              View more
            </button>
          </div>
        </div>
      </div>
      <LoadingComponent v-else></LoadingComponent>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadingComponent from "../../components/LoadingComponent.vue";

@Component({
  components: {
    LoadingComponent
  }
})
export default class Workouts extends Vue {
  created() {
    if (this.$attrs.workouts) {
      this.workouts = this.$attrs.workouts;
    } else {
      this.$store.dispatch("fetchWorkoutType", this.$route.params.workoutType);
    }
  }

  get workouts() {
    return this.$store.getters.workouts;
  }

  set workouts(value) {
    this.$store.commit("setWorkouts", value);
  }

  generateUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.workouts {
  .workouts__container {
    .videos__container {
      max-width: 100%;
      display: grid;
      grid-template-columns: 100%;
      @media (min-width: 500px) {
        grid-template-columns: 1fr;
      }
      grid-row-gap: 8vh;
      justify-content: center;
      align-items: center;
      .video__wrapper {
        // width: 100%;
        // @include flex;
        // flex-direction: column;
        padding: 4vh 0;
        h2 {
          text-transform: capitalize;
          text-align: center;
          padding: 2vh 0;
        }
        .thumbnail {
          width: 100%;
        }
        .button__wrapper {
          @include flex;
          margin-top: 4vh;
        }
      }
    }
  }
}
</style>
