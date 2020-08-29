<template>
  <div class="noAccess">
    <div class="noAccess__container">
      <img src="@/assets/illustrations/track.svg" class="illustration" />
      <h2>
        Niestety nie masz możliwości wyświetlenia naszych treningów OxFitness 😥
      </h2>
      <div class="payment__container">
        <h2>
          Aby kontynuować, musisz wykupić 1-miesięczny dostęp.
        </h2>
        <button type="button" class="dark" @click="checkout">
          Wykup dostęp
        </button>
        <p>
          Jeśli opłaciłeś już dostęp, poczekaj kilka sekund, pracujemy nad tym!
        </p>
      </div>
      <div class="verification__container" v-show="false">
        <h3>
          Najpierw zweryfikuj konto klikając w link aktywacyjny wysłany na
          adres:
          <strong>{{ user.email }}</strong>
        </h3>
        <p>
          Nie otrzymałeś wiadomości z linkiem? Sprawdź SPAM lub kliknij
          <span @click="reSendVerificationEmail" class="text-primary"
            >tutaj</span
          >
          aby ponowić wysłanie wiadomości.
        </p>
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
  async checkout() {
    const headers = {
      headers: {
        "Access-Control-Allow-Headers":
          "Content-Type, Accept, Origin, Authorization",
        "Access-Control-Allow-Origin": "https://oxfitness.netlify.app",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Method": "POST, OPTIONS",
        "Access-Control-Max-Age": 86400,
        "Content-Type": "application/json"
      }
    };
    await axios
      .post(process.env.VUE_APP_cloudFunctionUrl, headers)
      .then((response: any) => {
        this.sessionId = response.data.id;
        this.$store.dispatch(
          "updateUserTransactions",
          response.data.payment_intent
        );
      });
    const stripe: any = await loadStripe(process.env.VUE_APP_stripePublicKey);
    stripe.redirectToCheckout({
      sessionId: this.sessionId
    });
  }

  get isVerified() {
    return this.$store.getters.isVerified;
  }

  get user() {
    return this.$store.getters.user;
  }

  reSendVerificationEmail() {
    this.$store.dispatch("verifyAccount");
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
    @media (min-width: 700px) {
      max-width: 40vw;
    }
  }
  h2,
  h3 {
    margin-top: 2vh;
    font-weight: 500;
    font-size: 1.25rem;
  }

  a {
    color: black;
    text-decoration: underline;
    font-weight: 600;
  }
  p {
    margin-top: 4vh;
    font-weight: 500;
    font-size: 0.875rem;
  }

  .verification__container {
    h3 {
      font-size: 1rem;
    }
    span {
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
