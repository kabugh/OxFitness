<template>
  <div class="noAccess">
    <div class="noAccess__container">
      <img
        src="@/assets/illustrations/track.svg"
        class="illustration unselectable"
      />
      <h2>
        Niestety nie masz możliwości wyświetlenia naszych treningów OxFitness 😥
      </h2>
      <div class="payment__container">
        <h2>
          Aby kontynuować, musisz wykupić 1-miesięczny dostęp.
        </h2>
        <q-btn
          class="bg-primary text-white"
          @click="checkout"
          :loading="loading"
        >
          Wykup dostęp
        </q-btn>
        <p v-if="user.transactions">
          Jeśli opłaciłeś już dostęp, poczekaj kilka sekund, pracujemy nad tym!
        </p>
        <p v-else-if="freeWeekCategory && !user.transactions">
          Przed zakupem zachęcamy wypróbować
          <span
            @click="
              $router.push({
                name: 'workouts',
                params: {
                  workoutType: freeWeekCategory.category,
                  workouts: freeWeekCategory.workouts,
                  categoryDetails: {
                    title: freeWeekCategory.title,
                    description: freeWeekCategory.description,
                    hasInsideCategories: freeWeekCategory.hasInsideCategories
                  }
                }
              })
            "
            >darmowy tydzień</span
          >
          z OxFitness
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

@Component
export default class AccessDeniedComponent extends Vue {
  checkout() {
    this.$store.dispatch("checkout");
  }

  get isVerified() {
    return this.$store.getters.isVerified;
  }

  get freeWeekCategory() {
    return this.$store.getters.workoutCategories.find(
      (category: { category: string }) => category.category === "freeWeek"
    );
  }

  get user() {
    return this.$store.getters.user;
  }

  get loading() {
    return this.$store.getters.loading;
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
    @media (min-width: 768px) {
      max-width: 40vw;
    }
    @media (min-width: 960px) {
      max-width: 30vw;
    }
  }
  h2,
  h3 {
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
    span {
      text-decoration: underline;
      font-weight: 600;
      &:hover {
        cursor: pointer;
      }
    }
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
