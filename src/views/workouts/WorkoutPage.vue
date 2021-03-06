<template>
  <section class="workoutPage topView">
    <div class="workoutPage__container container" v-if="currentWorkout.fields">
      <div class="titleAndVideo__container">
        <div class="title__container">
          <h1
            v-if="currentWorkout.fields.dayOfTheWeek"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="800"
          >
            {{ currentWorkout.fields.dayOfTheWeek }}
          </h1>
          <h1
            v-if="currentWorkout.fields.title"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="800"
          >
            {{ currentWorkout.fields.title }}
          </h1>
          <h2
            v-if="currentWorkout.fields.date"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="800"
          >
            {{ currentWorkout.fields.date }}
          </h2>
        </div>
        <vue-plyr
          class="video__wrapper"
          v-if="isOnline && currentWorkout.fields.videoId"
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="800"
          ref="plyr"
        >
          <div
            data-plyr-provider="vimeo"
            :data-plyr-embed-id="currentWorkout.fields.videoId"
            allowfullscreen
          ></div>
        </vue-plyr>
        <div
          v-else-if="isOnline && !currentWorkout.fields.videoId"
          class="backgroundImage"
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="800"
          :style="{
            backgroundImage: `url(${currentWorkout.fields.frontImage.fields.file.url})`
          }"
        ></div>
        <div
          class="image__wrapper"
          v-else-if="isOnline && currentWorkout.fields.image.fields.file.url"
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="800"
        >
          <img :src="currentWorkout.fields.image.fields.file.url" alt="image" />
        </div>
      </div>
      <div class="workout__content">
        <div
          class="routines__container rich--text__content"
          id="rich--text__content"
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-duration="800"
          data-aos-offset="-2000"
          v-if="currentWorkout.fields.description"
        >
          <RichTextRenderer
            v-if="hasInsideCategories || $attrs.hasInsideCategories"
            :document="currentWorkout.fields.description"
            :nodeRenderers="renderNodes()"
          />
        </div>
        <q-list
          bordered
          v-if="
            Object.keys(this.accordionItems).length > 0 &&
              (!(hasInsideCategories || $attrs.hasInsideCategories) ||
                $attrs.workoutType === 'archived')
          "
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-duration="800"
          data-aos-offset="-500"
        >
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
                <div id="rich--text__content" class="rich--text__content">
                  <RichTextRenderer
                    :document="item"
                    :nodeRenderers="renderNodes()"
                  />
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-separator />
        </q-list>

        <div
          class="results__container"
          v-if="
            $attrs.workoutType === 'daily' || $attrs.workoutType === 'archived'
          "
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-duration="800"
          data-aos-offset="-500"
        >
          <div
            class="results__wrapper"
            v-if="!isFinished && isOnline && $attrs.workoutType === 'daily'"
          >
            <h2>
              Ukończyłeś ten trening? Podziel się wynikiem z resztą klubowiczów!
            </h2>
            <q-btn
              label="Dodaj swój wynik"
              color="primary"
              @click="card = true"
            />
          </div>
          <div
            class="results__wrapper"
            v-else-if="isFinished && isOnline && $attrs.workoutType === 'daily'"
          >
            <h2>
              Ukończyłeś juz ten trening. Edytuj podany przez siebie wynik.
            </h2>
            <q-btn
              label="Edytuj wynik"
              color="secondary"
              @click="card = true"
            />
          </div>
          <q-dialog
            v-model="card"
            v-if="isOnline && $attrs.workoutType === 'daily'"
          >
            <q-card class="my-card q-p-xl">
              <q-card-section>
                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">
                    {{
                      `${currentWorkout.fields.title} - ${currentWorkout.fields.date}`
                    }}
                  </div>
                  <div
                    class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                  ></div>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <WorkoutForm
                  :isFinished="isFinished"
                  :user="user"
                  :resultKey="currentWorkout.fields.resultKey"
                  :currentWorkout="currentWorkout"
                  @removed="onResultRemoval"
                />
                <div class="text-caption text-grey"></div>
              </q-card-section>
            </q-card>
          </q-dialog>
          <LeaderboardComponent
            v-if="
              user.workouts !== undefined &&
                user.workouts !== null &&
                ($attrs.workoutType === 'daily' ||
                  $attrs.workoutType === 'archived')
            "
            :currentWorkout="currentWorkout"
            :user="user"
            :isFinished="isFinished"
          />
        </div>
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
import { VueOfflineMixin } from "vue-offline";

import {
  BLOCKS,
  INLINES,
  Block,
  EntryLinkInline
} from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { User, WorkoutContent, Workout } from "@/store/models";
import { Route } from "vue-router";

@Component({
  components: {
    LeaderboardComponent,
    WorkoutForm,
    RichTextRenderer,
    VuePlyr
  },
  mixins: [VueOfflineMixin]
})
export default class WorkoutPage extends Vue {
  hasInsideCategories = false;
  card = false;
  accordionItems = {};
  isFinished = false;

  created() {
    if (this.$attrs.workout) {
      this.currentWorkout = this.$attrs.workout;
    } else {
      this.$store.dispatch("fetchWorkout", this.$route.params);
    }

    if (window.scrollY !== 0) {
      this.$scrollTo(".topView", 1500);
    }

    this.initialiseAccordionItems();
    this.$store.dispatch("updateLastWatched", this.currentWorkout);
  }

  mounted() {
    this.isFin();

    if (this.currentWorkout) {
      this.onRouteChange(this.$route);
    }

    if (window.scrollY !== 0) {
      this.$scrollTo(".topView", 1500);
    }

    if (this.user.lastWatched !== this.currentWorkout)
      this.$store.dispatch("updateLastWatched", this.currentWorkout);
  }

  @Watch("$route", { immediate: false, deep: true })
  onRouteChange(route: Route) {
    const camelize = (text: string) => {
      text = text.replace(/[-_\s.]+(.)?/g, (_, c) =>
        c ? c.toUpperCase() : ""
      );
      return text.substr(0, 1).toLowerCase() + text.substr(1);
    };

    const categories = this.$store.getters.workoutCategories;
    let foundCategory = categories.find(
      (item: any) => item.category === route.params.workoutType
    );

    let foundWorkout = foundCategory.workouts.find(
      (item: Workout) => (item as Workout).sys.id === route.params.id
    );
    this.currentWorkout = foundWorkout;

    this.hasInsideCategories = foundCategory.hasInsideCategories;
    this.initialiseAccordionItems();
    this.player.source = {
      type: "video",
      sources: [{ src: this.currentWorkout.fields.videoId, provider: "vimeo" }]
    };
    if (window.scrollY !== 0) {
      this.$scrollTo(".topView", 1500);
    }
  }

  renderNodes() {
    return {
      [INLINES.ENTRY_HYPERLINK]: (node: any, key: any, h: any, next: any) => {
        const linkDetails = {
          id: node.data.target.sys.id,
          entryType: node.data.target.sys.contentType.sys.id
        };

        const workoutType =
          linkDetails.entryType === "accessoryWorkout"
            ? "accessories"
            : linkDetails.entryType === "warmUp"
            ? "warm-up"
            : linkDetails.entryType === "dailyWorkout"
            ? "daily"
            : linkDetails.entryType;

        return h(
          "router-link",
          {
            props: {
              to: {
                name: "workoutPage",
                params: {
                  workoutType: workoutType,
                  id: linkDetails.id,
                  hasInsideCategories: true
                }
              }
            }
          },
          next(node.content)
        );
      },
      [BLOCKS.PARAGRAPH]: (node: any, key: any, h: any, next: any) =>
        h(
          "p",
          { style: "margin: 1vh 0", key: key },
          next(node.content, key, h, next)
        )
    };
  }

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

  onResultRemoval(value: boolean) {
    this.isFin();
    this.card = value;
  }

  @Watch("user.workouts")
  isFin() {
    // if there's only one workout left and gets removed, the watcher doesnt work
    let workouts: Object[];
    if (this.user.workouts !== undefined && this.user.workouts !== null) {
      workouts = Object.values(this.user.workouts);
      let matchedWorkout = workouts.find((workout: any) => {
        if (workout !== undefined) return workout.workoutId === this.$attrs.id;
      });
      this.isFinished = matchedWorkout !== undefined;
    }
    // this is a solution to the problem found above
    if (this.user.workouts === undefined) this.isFinished = false;
  }

  get player() {
    return (this.$refs.plyr as any).player;
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
    overflow: hidden;
    .titleAndVideo__container {
      @include flex;
      flex-direction: column;
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
      .backgroundImage {
        width: 100%;
        height: 30vh;
        @include backgroundDefault;
      }
    }

    .workout__content > .q-list {
      margin-top: $verticalPadding;
    }

    @media (min-width: 1300px) {
      padding: 4vh 18vw;
    }

    .image__wrapper {
      max-width: 100%;
      height: 40vh;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      @media (min-width: 1024px) and (min-height: 500px) {
        max-width: 70%;
        margin: 0 auto;
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
      .editor__container {
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
    }
    .q-item__label {
      text-transform: capitalize;
    }
    #rich--text__content {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 1vh 0;
        line-height: 1.25;
      }
      h1 {
        font-size: 2.25rem;
      }
      h2 {
        font-size: 2rem;
      }
      h3 {
        font-size: 1.75rem;
      }
      h4 {
        font-size: 1.5rem;
      }
      h5 {
        font-size: 1.25rem;
      }
      h6 {
        font-size: 1rem;
      }

      a {
        color: $primary;
      }

      p {
        padding: 1vh 0;
        &:first-of-type {
          padding-top: 0;
        }
        &:last-of-type {
          padding-bottom: 0;
        }
      }
      ul {
        margin-top: 3vh;
        margin-left: 20px;
        li {
          list-style-type: inherit;
          margin: 10px 0;
          p {
            padding: 0;
          }
        }
        ul {
          margin-top: 0;
        }
      }
      hr {
        display: none;
      }
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
.body--dark .workoutPage .workoutPage__container {
  .titleAndVideo__container .title__container,
  .results__container,
  .videos__section__container .videos__section__wrapper > h2 {
    color: $text-dark;
  }
  .workout__content {
    .q-expansion-item .q-item__label,
    #rich--text__content {
      color: $text-dark;
      a {
        color: $text-dark;
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
