<template>
  <section class="pricing topView">
    <div class="pricing__container container">
      <h1>Zacznij za darmo.</h1>
      <h1>Ćwicz się z naszą pomocą.</h1>
      <p>
        Wypróbuj plan OxFitness przez cały miesiąc za darmo i pozostań na
        dłużej.
      </p>
    </div>
  </section>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
export default class ThePricing extends Vue {}
</script>
<style lang="scss">
.pricing {
  width: 100%;
  background-color: #6b108e;
  color: white;
  padding-top: 6vh !important;
  .pricing__container {
    text-align: center;
    h1 {
      font-size: 3.5rem !important;
      font-weight: bold;
      line-height: 1.25;
    }
    p {
      font-size: 1.5em;
      font-weight: 500;
      margin: 3vh 0;
    }
  }
}
</style>
