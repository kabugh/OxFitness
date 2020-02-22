<template>
  <section class="workout">
    <youtube
      v-if="isLoaded"
      ref="youtube"
      :video-id="videoId"
      :player-vars="playerVars"
      @ended="playVideo"
      @click="playVideo"
    ></youtube>
    <LoadingComponent v-else></LoadingComponent>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadingComponent from "@/components/LoadingComponent";

@Component({
  components: {
    LoadingComponent
  }
})
export default class Workout extends Vue {
  videoId: String = "";
  isLoaded = true;
  playerVars = {
    autoplay: 0,
    controls: 1,
    loop: 1,
    enablejsapi: 1,
    origin: "http://localhost:8080",
    mute: false,
    modestbranding: true
  };
  created() {
    this.videoId = this.$attrs.videoUrl;
  }

  get player() {
    return this.$refs.youtube.player;
  }

  async playVideo() {
    await this.player.playVideo();
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.workout {
  @include flex;
  iframe {
    width: 100%;
    max-width: 650px;
  }
}
</style>
