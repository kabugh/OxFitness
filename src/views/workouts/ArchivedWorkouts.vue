<template>
  <section class="workouts topView">
    <div class="workouts__container container">
      <div class="workout__description" v-if="archivedWorkoutsCategory">
        <h2>{{ archivedWorkoutsCategory.title }}</h2>
        <p>{{ archivedWorkoutsCategory.description }}</p>
      </div>
      <div class="videos__section__container">
        <div class="videos__section__wrapper">
          <div class="videos__container" v-if="!loading">
            <div
              class="video__wrapper"
              v-for="(workout, index) in archivedWorkoutsCategory.workouts"
              :key="index"
            >
              <img
                src="@/assets/sample.jpg"
                alt="video
          thumbnail"
                class="thumbnail"
                @click="
                  $router.push({
                    name: 'archivedWorkoutPage',
                    params: {
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
                      name: 'archivedWorkoutPage',
                      params: {
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
            </div>
          </div>
        </div>
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
export default class ArchivedWorkouts extends Vue {
  mockItems = 6;
  tab = "";
  categoryDetails = {};

  created() {
    this.$store.dispatch("fetchArchivedWorkoutType");
  }

  get archivedWorkoutsCategory() {
    return this.$store.getters.archivedWorkoutsCategory;
  }

  set archivedWorkoutsCategory(value) {
    this.$store.commit("setArchivedWorkoutsCategory", value);
  }

  get loading() {
    return this.$store.getters.loading;
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
</style>
