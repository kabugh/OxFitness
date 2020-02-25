<template>
  <section class="dashboard view">
    <div class="dashboard__container container">
      <div
        class="workouts__sections--container"
        v-if="workoutCategories.length > 0 && !loading && user.premiumAccount"
      >
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

@Component({
  components: {
    AccessDeniedComponent,
    LoadingComponent
  }
})
export default class Dashboard extends Vue {
  created() {
    this.$store.dispatch("fetchWorkoutTypes");
  }

  get user() {
    return this.$store.getters.user;
  }

  get workoutCategories() {
    return this.$store.getters.workoutCategories;
  }

  get loading() {
    return this.$store.getters.loading;
  }

  generateUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
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
    .workouts__sections--container {
      display: grid;
      grid-template-columns: 100%;
      grid-row-gap: 4vh;
      justify-content: center;
      align-items: center;
      color: white;
      .workout__wrapper {
        width: 100%;
        height: 30vh;
        .thumbnail {
          width: 100%;
          height: 100%;
          @include backgroundDefault();
          padding: 4vh;
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          h2 {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
