<template>
  <section class="dashboard view">
    <div class="dashboard__container container">
      <div class="videos__container" v-if="videos.length > 0">
        <div
          class="video__wrapper"
          v-for="(video, index) in videos"
          :key="index"
        >
          <h2>{{ video.title }}</h2>
          <img
            src="@/assets/sample.png"
            alt="video
          thumbnail"
            class="thumbnail"
            @click="
              $router.push({
                name: 'workoutPage',
                params: { id: video.id, video: video }
              })
            "
          />
          <div class="button__wrapper">
            <button
              type="button"
              class="dark"
              @click="
                $router.push({
                  name: 'workoutPage',
                  params: { id: video.id, video: video }
                })
              "
            >
              View more
            </button>
          </div>
        </div>
      </div>
      <LoadingComponent v-else></LoadingComponent>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadingComponent from "../components/LoadingComponent.vue";

@Component({
  components: {
    LoadingComponent
  }
})
export default class Dashboard extends Vue {
  videos: Object[] = [
    {
      title: "Daily - August 19, 2020",
      youtubeId: "4h7Z5N10LWw",
      id: this.generateUUID(),
      description: ""
    },
    {
      title: "Daily - August 20, 2020",
      youtubeId: "sUmoMSU9_GQ",
      id: this.generateUUID(),
      description: ""
    }
  ];

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
    .videos__container {
      max-width: 100%;
      display: grid;
      grid-template-columns: 100%;
      @media (min-width: 500px) {
        grid-template-columns: 1fr;
      }
      grid-row-gap: 8vh;
      justify-content: center;
      align-items: center;
      .video__wrapper {
        // width: 100%;
        // @include flex;
        // flex-direction: column;
        .thumbnail {
          width: 100%;
        }
        .button__wrapper {
          @include flex;
          margin-top: 4vh;
        }
      }
    }
  }
}
</style>
