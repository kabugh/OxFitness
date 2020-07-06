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
        <button type="button" class="dark" @click="checkout">Zapłać</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const axios = require("axios").default;
const Stripe = require("stripe");
const stripe = Stripe(process.env.VUE_APP_stripePublicKey);

@Component
export default class AccessDeniedComponent extends Vue {
  test = false;
  sessionId = "";
  created() {
    axios
      .post(process.env.VUE_APP_cloudFunctionUrl)
      .then((response: any) => {
        // eslint-disable-next-line no-console
        console.log(response);
        this.sessionId = response.data;
      })
      // eslint-disable-next-line no-console
      .catch((error: Error) => console.log(error));
  }
  checkout() {
    stripe.redirectToCheckout({
      sessionId: this.sessionId
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
