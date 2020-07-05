<template>
  <div class="noAccess">
    <div class="noAccess__container">
      <img src="@/assets/illustrations/track.svg" class="illustration" />
      <h2>
        Niestety nie masz moliwości wyświetlenia naszych treningów OxFitness 😥
      </h2>
      <h2 v-if="test">
        Aby kontynuować, kup dostęp na
        <a href="https://oxfitness.wod.guru/user/login" target="_blank"
          >wod.guru</a
        >
      </h2>
      <div class="payment__container" v-else>
        <h2>
          Aby kontynuować, musisz kupić dostęp.
        </h2>
        <button type="button" class="dark">Zapłać</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AccessDeniedComponent extends Vue {
  test = false;
}
</script>
<style lang="scss" scoped>
.noAccess__container {
  padding: 4vh 0;
  text-align: center;
  .illustration {
    max-width: 60vw;
    max-height: 40vh;
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
