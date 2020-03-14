<template>
  <section class="workouts topView">
    <div class="workouts__container container">
      <div class="workout__description" v-if="$attrs.categoryDetails">
        <h2>{{ $attrs.categoryDetails.title }}</h2>
        <p>{{ $attrs.categoryDetails.description }}</p>
      </div>
      <div class="videos__container" v-if="workouts.length > 0">
        <div
          class="video__wrapper"
          v-for="(workout, index) in workouts"
          :key="index"
        >
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
          <h2 v-if="$attrs.workoutType === 'daily'">
            {{ workout.fields.dayOfTheWeek }}
          </h2>
          <h2 v-else-if="$attrs.workoutType === 'warm-up'">
            {{ workout.fields.title }}
          </h2>
          <div class="button__wrapper">
            <button
              type="button"
              class="dark"
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
    .workout__description {
      @include flex;
      flex-direction: column;
      text-align: center;
      padding: 2vh 0;
      p {
        margin-top: 2vh;
      }
    }
    .videos__container {
      max-width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      @media only screen and (orientation: landscape) and (min-width: 500px) and (max-height: 450px) {
        grid-template-columns: 100%;
        grid-gap: 10vh;
      }
      // @media (min-width: 500px) {
      //   grid-template-columns: 1fr;
      // }
      grid-gap: 4vh;
      justify-content: center;
      align-items: center;
      padding: 4vh 0;
      .video__wrapper {
        // width: 100%;
        // @include flex;
        // flex-direction: column;
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
