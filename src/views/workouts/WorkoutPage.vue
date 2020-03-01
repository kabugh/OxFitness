<template>
  <section class="workoutPage view">
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
    }
    .routines__container {
      padding: 4vh 0;
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
