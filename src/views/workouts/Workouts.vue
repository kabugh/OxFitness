<template>
  <section class="workouts topView">
    <div class="workouts__container container">
      <div class="workout__description" v-if="categoryDetails">
        <h2 data-aos="fade-up" data-aos-duration="800">
          {{ categoryDetails.title }}
        </h2>
        <p data-aos="fade-up" data-aos-duration="800">
          {{ categoryDetails.description }}
        </p>
      </div>
      <div
        class="videos__section__container"
        v-if="!categoryDetails.hasInsideCategories"
      >
        <div class="videos__section__wrapper">
          <div class="videos__container" v-if="!loading">
            <div
              class="video__wrapper"
              v-for="(workout, index) in workouts"
              :key="index"
              data-aos="fade-up"
              data-aos-duration="800"
              :data-aos-delay="200 + index * 50"
            >
              <div
                v-if="isOnline"
                :style="{
                  backgroundImage: `url(${workout.fields.frontImage.fields.file.url})`
                }"
                @click="
                  $router.push({
                    name: 'workoutPage',
                    params: {
                      workoutType: $attrs.workoutType,
                      id: workout.sys.id,
                      workout: workout,
                      hasInsideCategories: categoryDetails.hasInsideCategories
                    }
                  })
                "
                class="thumbnail"
              >
                <div class="logo__container">
                  <div class="logo__image--wrapper">
                    <img
                      src="@/assets/images/logos/ox.png"
                      alt="ox"
                      class="unselectable"
                    />
                  </div>
                  <div class="text__container">
                    <h4>Ox Fitness</h4>
                    <span v-if="workout.fields.date">{{
                      workout.fields.date
                    }}</span>
                  </div>
                </div>
                <div class="title__container">
                  <h2>
                    {{ workout.fields.title }}
                  </h2>
                  <span>Trening codzienny</span>
                </div>
                <div class="backgroundFilter"></div>
              </div>
            </div>
          </div>
          <div class="videos__container" v-else>
            <div
              class="video__wrapper skeleton"
              v-for="mockItem in mockItems"
              :key="mockItem"
            >
              <q-skeleton type="rect" />
            </div>
          </div>
        </div>
      </div>
      <div class="videos__section__container" v-else>
        <q-tabs
          v-model="tab"
          align="justify"
          narrow-indicator
          class="q-mb-lg"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <q-tab
            v-for="(element, index) in Object.keys(this.groupedWorkouts)"
            :name="element"
            :label="element"
            :key="index"
          />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          class="videos__section__wrapper text-center easeInOutQuart"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="800"
          data-aos-offset="50"
        >
          <q-tab-panel
            :name="i"
            class="videos__section__wrapper"
            v-for="(workouts, i) in groupedWorkouts"
            :key="i"
            style="overflow: hidden"
          >
            <h2>{{ i }}</h2>
            <div class="videos__container" v-if="!loading">
              <div
                class="video__wrapper"
                v-for="(workout, index) in workouts"
                :key="index"
              >
                <div
                  v-if="isOnline"
                  :style="{
                    backgroundImage: `url(${workout.fields.frontImage.fields.file.url})`
                  }"
                  @click="
                    $router.push({
                      name: 'workoutPage',
                      params: {
                        workoutType: $attrs.workoutType,
                        id: workout.sys.id,
                        workout: workout,
                        hasInsideCategories: categoryDetails.hasInsideCategories
                      }
                    })
                  "
                  class="thumbnail"
                >
                  <div class="logo__container">
                    <div class="logo__image--wrapper">
                      <img
                        src="@/assets/images/logos/ox.png"
                        alt="ox"
                        class="unselectable"
                      />
                    </div>
                    <div class="text__container">
                      <h4>Ox Fitness</h4>
                      <span v-if="workout.fields.date">{{
                        workout.fields.date
                      }}</span>
                    </div>
                  </div>
                  <div class="title__container">
                    <h2 v-if="$attrs.workoutType !== 'accessories'">
                      {{ workout.fields.title }}
                    </h2>
                    <h3 v-else>{{ workout.fields.title }}</h3>
                    <span>{{
                      $attrs.workoutType === "accessories"
                        ? "Akcesoria"
                        : $attrs.workoutType === "archived"
                        ? "Trening Codzienny"
                        : "Rozgrzewka"
                    }}</span>
                  </div>
                  <div class="backgroundFilter"></div>
                </div>
              </div>
            </div>
            <div class="videos__container" v-else>
              <div
                class="video__wrapper skeleton"
                v-for="mockItem in mockItems"
                :key="mockItem"
              >
                <q-skeleton class="thumbnail" type="rect" />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VueOfflineMixin } from "vue-offline";
import LoadingComponent from "../../components/LoadingComponent.vue";
import { Workout } from "@/store/models";

@Component({
  components: {
    LoadingComponent
  },
  mixins: [VueOfflineMixin]
})
export default class Workouts extends Vue {
  mockItems = 6;
  tab = "";
  categoryDetails = {};

  groupedWorkouts = this.groupWorkouts(this.workouts, "category");

  created() {
    if (this.$attrs.categoryDetails) {
      this.categoryDetails = this.$attrs.categoryDetails;
    } else {
      const foundWorkoutCategory = this.$store.getters.workoutCategories.find(
        (workoutCategory: any) =>
          workoutCategory.category === this.$attrs.workoutType
      );
      this.categoryDetails = {
        title: foundWorkoutCategory.title,
        description: foundWorkoutCategory.description,
        hasInsideCategories: foundWorkoutCategory.hasInsideCategories
      };
    }
    if (this.$attrs.workouts) {
      this.workouts = this.$attrs.workouts;
    } else {
      this.$store.dispatch("fetchWorkoutType", this.$route.params.workoutType);
    }
    this.groupedWorkouts = this.groupWorkouts(this.workouts, "category");
  }

  mounted() {
    this.tab = Object.keys(this.groupedWorkouts)[0];
    if (window.scrollY !== 0) {
      this.$scrollTo(".topView", 1500);
    }
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

  groupWorkouts(arr: any, prop: any) {
    const groups = arr.reduce(
      (groups: any, item: any) => ({
        ...groups,
        [item.fields[prop]]: [...(groups[item.fields[prop]] || []), item]
      }),
      {}
    );
    return groups;
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
@import "@/styles/quasar.variables.scss";
.workouts {
  .workouts__container {
    overflow: hidden;
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
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          @media (min-width: 360px) {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
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
            @include flex;
            align-items: center;
            flex-direction: column;
            .thumbnail {
              width: 100%;
              max-width: 400px;
              @include backgroundDefault;
              height: 30vh;
              margin: 0 auto;
              border-radius: 10px;
              position: relative;
              width: 100%;
              opacity: 0.99;
              padding: 4vh;
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              flex-direction: column;
              position: relative;

              &:hover {
                cursor: pointer;
              }
              .logo__container {
                z-index: 1;
                position: absolute;
                top: 2vh;
                left: 4vh;
                display: grid;
                align-items: center;
                grid-template-columns: repeat(2, auto);
                column-gap: 8px;
                .logo__image--wrapper {
                  width: 32px;
                  height: 32px;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                  }
                }
                .text__container {
                  color: white;
                  h4 {
                    font-size: 0.875rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    line-height: 1;
                  }
                  span {
                    font-size: 0.75rem;
                  }
                }
              }
              .title__container {
                z-index: 1;
                color: white;
                text-transform: capitalize;
                text-align: left;
                h2,
                h3 {
                  padding: 0;
                  font-weight: bolder;
                  font-size: 1.25rem;
                  text-align: left;
                }
                h3 {
                  font-size: 1.125rem;
                }
                span {
                  font-size: 1.125rem;
                  font-weight: 500;
                }
                @media (min-width: 360px) {
                  h2 {
                    font-size: 1.75rem;
                  }
                }
              }
              .backgroundFilter {
                z-index: 0;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 10px;
              }

              @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
                height: 40vh;
                .title__container {
                  h2 {
                    font-size: 1.125rem;
                  }
                  span {
                    font-size: 1rem;
                  }
                }
              }
              @media (max-width: 700px) and (max-height: 375px) and (orientation: landscape) {
                height: 40vh;
                .title__container {
                  h2 {
                    font-size: 1rem;
                  }
                  span {
                    font-size: 0.875rem;
                  }
                }
              }
            }

            &.skeleton {
              .q-skeleton {
                width: 100%;
                height: 100%;
                min-height: 200px;
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
