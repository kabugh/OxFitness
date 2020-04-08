<template>
  <section class="workouts topView">
    <div class="workouts__container container">
      <div class="workout__description" v-if="$attrs.categoryDetails">
        <h2>{{ $attrs.categoryDetails.title }}</h2>
        <p>{{ $attrs.categoryDetails.description }}</p>
      </div>
      <div
        class="videos__section__container"
        v-if="$attrs.workoutType === 'daily'"
      >
        <div class="videos__section__wrapper">
          <div class="videos__container" v-if="!loading">
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
              <div class="title__container">
                <h2>
                  {{ workout.fields.title }}
                </h2>

                <h3 v-if="workout.fields.date">{{ workout.fields.date }}</h3>
              </div>
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
                  Zobacz więcej
                </button>
              </div>
            </div>
          </div>
          <div class="videos__container" v-else>
            <div
              class="video__wrapper skeleton"
              v-for="(mockItem, index) in mockItems"
              :key="index"
            >
              <q-skeleton type="rect" />
              <q-skeleton type="text" />
              <q-skeleton type="rect" />
            </div>
          </div>
        </div>
        <div class="archive__videos__container">
          <h2>
            Chciałbyś nadrobić opuszczony tydzień? Wróć do zeszłych treningów
            klikając poniżej.
          </h2>
          <div class="button__wrapper">
            <button type="button" class="dark">Wróć</button>
          </div>
        </div>
      </div>
      <div class="videos__section__container" v-else>
        <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg">
          <q-tab
            v-for="(element, index) in Object.keys(
              this.groupedWorkouts
            ).reverse()"
            :name="element"
            :label="element"
            :key="index"
          />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="videos__section__wrapper text-center"
        >
          <q-tab-panel
            :name="i"
            class="videos__section__wrapper"
            v-for="(workouts, i) in groupedWorkouts"
            :key="i"
          >
            <h2>{{ i }}</h2>
            <div class="videos__container" v-if="!loading">
              <div
                class="video__wrapper"
                v-for="(workout, index) in workouts"
                :key="index"
              >
                <img
                  src="@/assets/sample.png"
                  alt="video thumbnail"
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
                <div class="title__container">
                  <h2>
                    {{ workout.fields.title }}
                  </h2>
                  <h3 v-if="workout.fields.date">{{ workout.fields.date }}</h3>
                </div>
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
                    Zobacz więcej
                  </button>
                </div>
              </div>
            </div>
            <div class="videos__container" v-else>
              <div
                class="video__wrapper skeleton"
                v-for="(mockItem, index) in mockItems"
                :key="index"
              >
                <q-skeleton type="rect" />
                <q-skeleton type="text" />
                <q-skeleton type="rect" />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <!-- <div
          class="videos__section__wrapper"
          v-for="(workouts, i) in groupedWorkouts"
          :key="i"
        >
          <h2>{{ i }}</h2>
          <div class="videos__container" v-if="!loading">
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
              <div class="title__container">
                <h2 v-if="$attrs.workoutType === 'daily'">
                  {{ workout.fields.dayOfTheWeek }}
                </h2>
                <h2 v-else-if="$attrs.workoutType === 'warm-up'">
                  {{ workout.fields.title }}
                </h2>
                <h3 v-if="workout.fields.date">{{ workout.fields.date }}</h3>
              </div>
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
                  Zobacz więcej
                </button>
              </div>
            </div>
          </div>
          <div class="videos__container" v-else>
            <div
              class="video__wrapper skeleton"
              v-for="(mockItem, index) in mockItems"
              :key="index"
            >
              <q-skeleton type="rect" />
              <q-skeleton type="text" />
              <q-skeleton type="rect" />
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadingComponent from "../../components/LoadingComponent.vue";
import { Workout } from "@/store/models";

@Component({
  components: {
    LoadingComponent
  }
})
export default class Workouts extends Vue {
  mockItems = 6;
  tab = "";

  groupedWorkouts = this.groupWorkouts(this.workouts, "category");

  created() {
    if (this.$attrs.workouts) {
      this.workouts = this.$attrs.workouts;
    } else {
      this.$store.dispatch("fetchWorkoutType", this.$route.params.workoutType);
    }
    this.groupedWorkouts = this.groupWorkouts(this.workouts, "category");
  }

  mounted() {
    this.tab = Object.keys(this.groupedWorkouts)[0];
  }

  get workouts() {
    return this.$store.getters.workouts;
  }

  set workouts(value) {
    this.$store.commit("setWorkouts", value);
  }

  get loading() {
    return this.$store.getters.loading;
  }

  groupWorkouts(arr: Array<Workout>, prop: string) {
    // display the latest accessories at the top
    if (this.$attrs.workoutType === "accessories") arr.reverse();

    const groups = arr.reduce(
      (groups, item) => ({
        ...groups,
        [item.fields[prop]]: [...(groups[item.fields[prop]] || []), item]
      }),
      {}
    );
    return groups;
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
@import "@/styles/quasar.variables.scss";
.workouts {
  .workouts__container {
    .workout__description {
      @include flex;
      flex-direction: column;
      text-align: center;
      padding: 2vh 0;
      h2 {
        font-size: 2rem;
        font-weight: bolder;
      }
      p {
        margin-top: 2vh;
        font-size: 1rem;
      }
      .workout__categories {
        padding: 4vh 0;
      }
    }
    .videos__section__container {
      .videos__section__wrapper {
        > h2 {
          font-size: 1.75rem;
          font-weight: bolder;
          text-transform: capitalize;
          text-align: center;
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
          grid-row-gap: 6vh;
          grid-column-gap: 4vh;
          justify-content: center;
          align-items: center;
          padding: 4vh 0;
          .video__wrapper {
            .title__container {
              text-transform: capitalize;
              text-align: center;
              h2 {
                padding: 2vh 0;
                font-size: 1.5rem;
                font-weight: bolder;
              }
              h3 {
                font-size: 1.25rem;
              }
            }
            .thumbnail {
              width: 100%;
              &:hover {
                cursor: pointer;
              }
            }
            &.skeleton {
              display: grid;
              grid-template-rows: minmax(200px, 1fr) repeat(2, 75px);
              grid-row-gap: 2vh;
              > * {
                min-width: 50%;
              }
              .q-skeleton--type-rect:last-of-type {
                max-width: 50%;
                margin: 0 auto;
              }
            }
            .button__wrapper {
              @include flex;
              margin-top: 4vh;
            }
          }
        }
      }
      .archive__videos__container {
        @include flex;
        flex-direction: column;
        align-items: center;
        padding: 6vh 0;
        h2 {
          font-size: 1.25rem;
          font-weight: bolder;
          text-align: center;
        }
        .button__wrapper {
          padding: 4vh 0;
        }
      }
    }
  }
}
</style>
