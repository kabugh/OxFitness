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
      <VideoComponent
        :videoUrl="currentWorkout.fields.videoId"
      ></VideoComponent>
      <div class="routines__container">
        <div class="programs__container" v-if="$attrs.workoutType === 'daily'">
          <!-- <RichTextRenderer
            v-if="currentWorkout.fields.programA"
            :document="currentWorkout.fields.programA"
          />
          <RichTextRenderer
            v-if="currentWorkout.fields.programB"
            :document="currentWorkout.fields.programB"
          /> -->
        </div>
        <!-- <RichTextRenderer
          v-else
          :document="currentWorkout.fields.description"
        /> -->
        <div class="editor__container" v-html="receivedData" v-else></div>
      </div>
      <q-list bordered v-if="accordionItems.length > 0">
        <q-expansion-item
          group="accordion"
          icon="explore"
          :label="buildTitle(index)"
          header-class="text-primary"
          v-for="(item, index) in accordionItems"
          :key="index"
        >
          <q-card>
            <q-card-section>
              <RichTextRenderer :document="item" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />
      </q-list>

      <div class="results__container" v-if="$attrs.workoutType === 'daily'">
        <h2>
          Ukończyłeś ten trening? Podziel się wynikiem z resztą klubowiczy!
        </h2>

        <q-dialog v-model="card">
          <q-card class="my-card">
            <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />
            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  Cafe Basilico
                </div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                ></div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">
                Dodaj swój wynik
              </div>
              <div class="text-caption text-grey"></div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="Reserve" />
              <q-btn v-close-popup flat color="primary" round icon="event" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-btn label="Dodaj swój wynik" color="primary" @click="card = true" />
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
import { Component, Vue } from "vue-property-decorator";
import VideoComponent from "@/components/VideoComponent.vue";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import RichTextRenderer from "contentful-rich-text-vue-renderer";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { WorkoutContent } from "@/store/models";

const options = {
  renderNode: {
    [BLOCKS.HR]: (node: any, next: any) => `<br>`
  }
};

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
    this.initialiseAccordionItems();
    this.receivedData = documentToHtmlString(
      this.currentWorkout.fields.description,
      options
    );
  }
  card = false;
  stars = 3;
  accordionItems = {};

  receivedData = {};

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

  buildTitle(title: string) {
    return `${title.slice(0, -1)} ${title.slice(-1)}`;
  }

  get loading() {
    return this.$store.getters.loading;
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
    .results__container {
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
</style>
