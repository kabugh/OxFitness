<template>
  <div class="noAccess__container">
    <img src="@/assets/illustrations/track.svg" class="illustration" />
    <h2>
      Niestety nie masz moliwości wyświetlenia naszych treningów OxFitness 😥
    </h2>
    <h2>
      Aby kontynuować, wykup dostęp na
      <a href="https://oxfitness.wod.guru/user/login" target="_blank"
        >wod.guru</a
      >
    </h2>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AccessDeniedComponent extends Vue {}
</script>
<style lang="scss" scoped>
.noAccess__container {
  padding: 4vh 0;
  text-align: center;
  .illustration {
    max-width: 60vw;
    margin: 0 auto;
  }
  h2 {
    margin-top: 2vh;
    font-weight: 500;
    font-size: 1.25rem;
  }
  a {
    color: black;
    text-decoration: underline;
    font-weight: 600;
  }
}
</style>
