<template>
  <section class="workoutPage topView">
    <div class="workoutPage__container container" v-if="currentWorkout.fields">
      <h1 v-if="currentWorkout.fields.dayOfTheWeek">
        {{ currentWorkout.fields.dayOfTheWeek }}
      </h1>
      <h1 v-if="currentWorkout.fields.title">
        {{ currentWorkout.fields.title }}
      </h1>
      <VideoComponent
        :videoUrl="currentWorkout.fields.videoId"
      ></VideoComponent>
      <div class="routines__container">
        <div class="programs__container" v-if="$attrs.workoutType === 'daily'">
          <RichTextRenderer
            v-if="currentWorkout.fields.programA"
            :document="currentWorkout.fields.programA"
          />
          <RichTextRenderer
            v-if="currentWorkout.fields.programB"
            :document="currentWorkout.fields.programB"
          />
        </div>
        <RichTextRenderer
          v-else
          :document="currentWorkout.fields.description"
        />
      </div>
      <q-dialog v-model="card">
        <q-card class="my-card">
          <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Cafe Basilico
              </div>
              <div
                class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
              >
                <q-icon name="place" />
                250 ft
              </div>
            </div>

            <q-rating v-model="stars" :max="5" size="32px" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              $・Italian, Cafe
            </div>
            <div class="text-caption text-grey">
              Small plates, salads & sandwiches in an intimate setting.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn v-close-popup flat color="primary" label="Reserve" />
            <q-btn v-close-popup flat color="primary" round icon="event" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-btn label="Card" color="primary" @click="card = true" />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VideoComponent from "@/components/VideoComponent.vue";
import { BLOCKS } from "@contentful/rich-text-types";
import RichTextRenderer from "contentful-rich-text-vue-renderer";

@Component({
  components: {
    RichTextRenderer,
    VideoComponent
  }
})
export default class WorkoutPage extends Vue {
  created() {
    if (this.$attrs.workout) {
      this.currentWorkout = this.$attrs.workout;
    } else {
      this.$store.dispatch("fetchWorkout", this.$route.params);
    }
  }
  card = false;
  stars = 3;

  get currentWorkout() {
    return this.$store.getters.currentWorkout;
  }

  set currentWorkout(value) {
    this.$store.commit("setCurrentWorkout", value);
  }
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
      font-size: 2rem;
      font-weight: bolder;
    }
    .routines__container {
      padding: 4vh 0;
      h3 {
        font-size: 1.5rem;
      }
      ul,
      ol {
        padding-left: 3vh;
        li {
          list-style-type: square;
        }
      }
    }
  }
}
</style>
