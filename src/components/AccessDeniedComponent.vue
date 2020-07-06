<template>
  <div class="noAccess">
    <div class="noAccess__container">
      <img src="@/assets/illustrations/track.svg" class="illustration" />
      <h2>
        Niestety nie masz możliwości wyświetlenia naszych treningów OxFitness 😥
      </h2>
      <div class="payment__container">
        <h2>
          Aby kontynuować, musisz kupić dostęp.
        </h2>
        <button type="button" class="dark" @click="checkout">Zapłać</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const axios = require("axios").default;
import { loadStripe } from "@stripe/stripe-js";

@Component
export default class AccessDeniedComponent extends Vue {
  sessionId = "";
  created() {
    // axios
    //   .post(process.env.VUE_APP_cloudFunctionUrl)
    //   .then((response: any) => (this.sessionId = response.data.id))
    //   // eslint-disable-next-line no-console
    //   .catch((error: Error) => console.log(error));
  }
  async checkout() {
    const stripe: any = await loadStripe(process.env.VUE_APP_stripePublicKey);
    stripe
      .redirectToCheckout({
        sessionId: this.sessionId
      })
      .then((result: any) => {
        // eslint-disable-next-line no-console
        console.log(result);
      });
  }
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
