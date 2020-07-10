<template>
  <section class="workoutPage topView">
    <div class="workoutPage__container container" v-if="currentWorkout.fields">
      <div class="title__container">
        <h1 v-if="currentWorkout.fields.dayOfTheWeek">
          {{ currentWorkout.fields.dayOfTheWeek }}
        </h1>
        <h1 v-if="currentWorkout.fields.title">
          {{ currentWorkout.fields.title }}
        </h1>
        <h2 v-if="currentWorkout.fields.date">
          {{ currentWorkout.fields.date }}
        </h2>
      </div>
      <vue-plyr class="video__wrapper">
        <div
          data-plyr-provider="vimeo"
          :data-plyr-embed-id="currentWorkout.fields.videoId"
        ></div>
      </vue-plyr>
      <div class="routines__container">
        <div class="programs__container"></div>
      </div>
      <q-list bordered v-if="Object.keys(this.accordionItems).length > 0">
        <q-expansion-item
          group="accordion"
          icon="emoji_events"
          :label="buildTitle(index)"
          header-class="text-primary"
          v-for="(item, index) in accordionItems"
          :key="index"
        >
          <q-card>
            <q-card-section>
              <RichTextRenderer :document="item" :nodeRenderers="nodes" />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />
      </q-list>
      <div class="results__container">
        <LeaderboardComponent
          :currentWorkout="currentWorkout"
          :user="user"
          :isFinished="isFinished"
          v-if="user.workouts !== undefined && user.workouts !== null"
        />
      </div>
    </div>
    <div class="workoutPage__container container" v-else>
      <q-skeleton type="text" />
      <q-skeleton type="rect" />
      <q-skeleton type="text" />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import RichTextRenderer from "contentful-rich-text-vue-renderer";
import LeaderboardComponent from "@/components/LeaderboardComponent.vue";
import WorkoutForm from "@/components/WorkoutForm.vue";
import VuePlyr from "vue-plyr";

import { BLOCKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { User, WorkoutContent, Workout } from "@/store/models";

const options = {
  renderNode: {
    [BLOCKS.HR]: (node: any, next: any) => `\n`
  }
};

@Component({
  components: {
    LeaderboardComponent,
    WorkoutForm,
    RichTextRenderer,
    VuePlyr
  }
})
export default class ArchivedWorkoutPage extends Vue {
  created() {
    if (this.$attrs.workout) {
      this.currentWorkout = this.$attrs.workout;
    } else {
      this.$store.dispatch("fetchArchivedWorkout", this.$route.params);
    }
    this.initialiseAccordionItems();
    this.receivedData = documentToHtmlString(
      this.currentWorkout.fields.description,
      options
    );
  }
  nodes = options.renderNode;
  card = false;
  accordionItems = {};
  receivedData = {};
  isFinished = false;

  initialiseAccordionItems() {
    this.findItemInObject("programA", this.currentWorkout.fields);
    this.findItemInObject("programB", this.currentWorkout.fields);
  }

  findItemInObject(itemName: string, chosenObject: any) {
    for (let item in chosenObject) {
      if (item.toString() === itemName) {
        let foundItem: Object = chosenObject[item];
        this.accordionItems = {
          ...this.accordionItems,
          [item]: foundItem
        };
      }
    }
  }

  buildTitle(title: string): string {
    return `${title.slice(0, -1)} ${title.slice(-1)}`;
  }

  get loading() {
    return this.$store.getters.loading;
  }

  get user(): User {
    return this.$store.getters.user;
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
    .title__container {
      padding: 2vh 0 4vh 0;
      text-align: center;
      text-transform: capitalize;
      h1 {
        font-size: 2rem;
        font-weight: bolder;
      }
      h2 {
        font-size: 1.25rem;
      }
    }

    .q-skeleton--type-text {
      padding: 4vh 0 4vh 0;
      margin: 0 0 4vh 0;
    }
    .q-skeleton--type-rect {
      min-height: 40vh;
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
      a {
        color: black;
      }
    }
    .q-item__label {
      text-transform: capitalize;
    }
    .results__container,
    .rating__container {
      @include flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 4vh 0;
      h2 {
        font-size: 1rem;
        margin-bottom: 2vh;
      }
    }
  }
}
.q-card {
  .text-h6 {
    text-transform: capitalize;
    text-align: center !important;
  }
}
</style>
