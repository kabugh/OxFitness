<template>
  <section class="dashboard bottomView">
    <div class="dashboard__container container">
      <div class="workouts__sections--container" v-if="user.premiumAccount">
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
              </div>
            </div>
          </div>
        </q-pull-to-refresh>
      </div>
      <AccessDeniedComponent
        v-else-if="!user.premiumAccount"
      ></AccessDeniedComponent>
      <LoadingComponent v-else></LoadingComponent>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccessDeniedComponent from "../components/AccessDeniedComponent.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import { User } from "@/store/models";

@Component({
  components: {
    AccessDeniedComponent,
    LoadingComponent
  }
})
export default class Dashboard extends Vue {
  mockItems = 3;

  created() {
    this.$store.dispatch("fetchWorkoutTypes");
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
        // width: 100%;
        height: 30vh;
        .thumbnail {
          width: 100%;
          height: 100%;
          @include backgroundDefault();
          padding: 4vh;
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;

          &:hover {
            cursor: pointer;
          }
          h2 {
            padding: 0;
            font-weight: bolder;
            font-size: 1.75rem;
          }
        }
      }
    }
  }
}
</style>
