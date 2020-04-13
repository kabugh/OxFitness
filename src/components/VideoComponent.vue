<template>
  <section class="video">
    <div v-show="isLoaded" class="video__wrapper">
      <youtube
        ref="youtube"
        :video-id="videoId"
        :player-vars="playerVars"
      ></youtube>
    </div>
    <q-skeleton v-if="!isLoaded" type="rect" />
  </section>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VideoComponent extends Vue {
  videoId = "";
  isLoaded = false;
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
  mounted() {
    this.isLoaded = false;
    window.setTimeout(() => {
      this.player.addEventListener("onReady", this.isReady());
    }, 1000);
  }
  get player() {
    return this.$refs.youtube.player;
  }

  isReady() {
    this.isLoaded = true;
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.video {
  @include flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  .video__wrapper {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    iframe {
      width: 100%;
    }
  }
}
.q-skeleton--type-rect {
  width: 100%;
}
</style>
