<template>
  <section class="dashboard topView bottomView">
    <div class="dashboard__container container">
      <div
        class="workouts__sections--container"
        v-if="user.premiumAccount.isActive"
      >
        <div class="components__container">
          <HelloSection
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-offset="0"
          />
          <WorkoutsStatistics
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-offset="50"
          />
          <LastWatched
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-offset="50"
            v-if="user.lastWatched"
          />
          <div
            class="workout__container"
            v-if="loading || workoutCategories <= 0"
          >
            <div
              class="workout__wrapper"
              v-for="(skeleton, n) in mockItems"
              :key="n"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-offset="50"
            >
              <q-skeleton class="thumbnail" square />
            </div>
          </div>
          <div class="workout__container" v-else>
            <div
              class="workout__wrapper"
              v-for="(item, index) in workoutCategories"
              :key="index"
              data-aos="fade-in"
            >
              <div
                class="thumbnail"
                @click="
                  $router.push({
                    name: 'workouts',
                    params: {
                      workoutType: item.category,
                      workouts: item.workouts,
                      categoryDetails: {
                        title: item.title,
                        description: item.description,
                        hasInsideCategories: item.hasInsideCategories
                      }
                    }
                  })
                "
                :style="{
                  backgroundImage: `url(${item.image.fields.file.url})`
                }"
              >
                <h2>{{ item.title }}</h2>
                <h3 v-if="item.workouts.length > 0">
                  {{ item.workouts.length | wordEnding }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AccessDeniedComponent
        v-else-if="!user.premiumAccount.isActive"
      ></AccessDeniedComponent>
      <LoadingComponent v-else></LoadingComponent>
      <WelcomeComponent
        v-if="displayWelcome"
        :user="user"
        :welcomeDialog="displayWelcome"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VueOfflineMixin } from "vue-offline";

import HelloSection from "../components/visuals/HelloSection.vue";
import WorkoutsStatistics from "../components/visuals/WorkoutsStatistics.vue";
import LastWatched from "../components/visuals/LastWatched.vue";

import AccessDeniedComponent from "../components/AccessDeniedComponent.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import WelcomeComponent from "../components/WelcomeComponent.vue";

import { User } from "@/store/models";

@Component({
  components: {
    HelloSection,
    WorkoutsStatistics,
    LastWatched,
    AccessDeniedComponent,
    LoadingComponent,
    WelcomeComponent
  },
  mixins: [VueOfflineMixin],
  beforeRouteEnter(to, from, next) {
    if (to.fullPath === "/success" || to.fullPath === "/cancel")
      next(vm => {
        vm.$router.replace(to.fullPath);
      });
    else next();
  },
  filters: {
    wordEnding: (numberOfWorkouts: number) => {
      if (numberOfWorkouts === 1) return `${numberOfWorkouts} trening`;
      else if (numberOfWorkouts > 1 && numberOfWorkouts <= 4)
        return `${numberOfWorkouts} treningi`;
      else return `${numberOfWorkouts} treningów`;
    }
  }
})
export default class Dashboard extends Vue {
  mockItems = 3;
  isComponentReady = false;

  created() {
    this.$store.dispatch("fetchWorkoutTypes").then(() => {
      this.isComponentReady = true;
    });
  }

  mounted() {
    this.$store.dispatch("bindUser");
  }

  get user(): User {
    return this.$store.getters.user;
  }

  get workoutCategories() {
    return this.$store.getters.workoutCategories;
  }

  get loading(): boolean {
    return this.$store.getters.loading;
  }

  get displayWelcome(): boolean {
    return (
      this.user &&
      this.isComponentReady &&
      this.$route.path != "/authentication" &&
      (!("name" in this.user) ||
        this.user.name === null ||
        this.user.name === undefined ||
        this.user.name === "")
    );
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.dashboard {
  .dashboard__container {
    flex-direction: column;
    h2 {
      text-align: center;
      padding: 2vh 0;
    }
    .workouts__sections--container .components__container {
      display: grid;
      grid-gap: 4vh;
      .workout__container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        @media (min-width: 360px) {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        @media only screen and (orientation: landscape) and (min-width: 500px) and (max-height: 450px) {
          grid-template-columns: 100%;
          grid-gap: 10vh;
          .workout__wrapper {
            min-height: 50vh;
          }
        }
        grid-gap: 4vh;
        justify-content: center;
        align-items: center;
        color: white;
        .workout__wrapper {
          height: 30vh;
          .thumbnail {
            width: 100%;
            height: 100%;
            @include backgroundDefault();
            opacity: 0.99;
            padding: 4vh;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            flex-direction: column;
            border-radius: 10px;
            &:hover {
              cursor: pointer;
            }
            h2 {
              padding: 0;
              font-weight: bolder;
              font-size: 1.25rem;
              text-align: left;
            }
            h3 {
              font-size: 1.125rem;
              font-weight: 500;
            }
            @media (min-width: 360px) {
              h2 {
                font-size: 1.75rem;
              }
            }
          }
        }
      }
    }
  }
  @media (min-width: 1300px) and (min-height: 700px) {
    .dashboard__container {
      max-width: 90vw;
    }
  }
  @media (min-width: 1650px) and (min-height: 700px) {
    .dashboard__container {
      max-width: 50vw;
    }
  }
}
</style>
