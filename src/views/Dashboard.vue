<template>
  <section class="dashboard topView bottomView">
    <div class="dashboard__container container">
      <div
        class="workouts__sections--container"
        v-if="user.premiumAccount.isActive"
      >
        <q-pull-to-refresh @refresh="pullData">
          <div
            class="workout__container"
            v-if="loading || workoutCategories <= 0"
          >
            <div
              class="workout__wrapper"
              v-for="(skeleton, n) in mockItems"
              :key="n"
            >
              <q-skeleton class="thumbnail" square />
            </div>
          </div>
          <div class="workout__container" v-else>
            <div
              class="workout__wrapper"
              v-for="(item, index) in workoutCategories"
              :key="index"
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
                        description: item.description
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
        </q-pull-to-refresh>
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

import AccessDeniedComponent from "../components/AccessDeniedComponent.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import WelcomeComponent from "../components/WelcomeComponent.vue";

import { User } from "@/store/models";

@Component({
  components: {
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
    this.isComponentReady = true;
    this.$store.dispatch("fetchWorkoutTypes");
  }

  mounted() {
    this.$store.dispatch("bindUser");
  }

  pullData(done: Function) {
    this.$store.dispatch("fetchWorkoutTypes");
    done();
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
    .workouts__sections--container
      .q-pull-to-refresh
      .q-pull-to-refresh__content
      .workout__container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
          padding: 4vh;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          flex-direction: column;
          &:hover {
            cursor: pointer;
          }
          h2 {
            padding: 0;
            font-weight: bolder;
            font-size: 1.75rem;
            text-align: left;
          }
          h3 {
            font-size: 1.125rem;
          }
        }
      }
    }
  }
}
</style>
