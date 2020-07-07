<template>
  <section class="cancelPage">
    <div class="cancel__container">
      <img
        src="@/assets/illustrations/cancel.svg"
        class="illustration unselectable"
        loading="lazy"
        data-aos="fade-down"
        data-aos-delay="300"
      />
      <h1 data-aos="fade-up" data-aos-delay="500">
        Coś poszło nie tak. Płatność została anulowana. Spróbuj ponownie lub
        skontaktuj się z administratorem OxFitness.
      </h1>
      <button
        data-aos="fade-up"
        data-aos-delay="700"
        type="button"
        @click="$router.replace('/dashboard')"
      >
        Powrót
      </button>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default class SuccessPage extends Vue {}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.cancelPage {
  width: 100%;
  height: 100vh;
  background-color: #958efa;
  .cancel__container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 6vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 6vh 6vw;
    .illustration {
      max-width: 70%;
      margin: 0 auto;
    }
    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
      text-align: center;
      margin: 4vh 0;
    }
    @media (min-width: 700px) {
      width: 60%;
      .illustration {
        max-width: 40%;
      }
      .text__container {
        h1,
        h2 {
          font-size: 2rem;
        }
      }
    }
  }
}
</style>
