<template>
  <section class="hello" :class="{ 'body--dark': $q.dark.isActive }">
    <div class="hello__container">
      <div class="greetings__container">
        <h1>{{ greeting }} {{ name }}!</h1>
        <p>{{ description }}</p>
      </div>
      <div class="illustration__wrapper">
        <img
          src="@/assets/illustrations/hello.svg"
          class="illustration unselectable"
          loading="lazy"
          alt="develop"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HelloSection extends Vue {
  greetings = ["Cześć", "Hej", "Czołem", "Witaj"];
  descriptions = [
    "Dobrze znów Cię widzieć.",
    "Co u Ciebie słychać?",
    "Czas na mocny trening!",
    "Może czas na rekordy?",
    "Dziś jest Twój dzień!"
  ];

  greeting = this.randomText(this.greetings);
  description = this.randomText(this.descriptions);

  get user() {
    return this.$store.getters.user;
  }

  get name(): string {
    if (this.user) return this.user.name;
    else return "";
  }

  randomText(array: Array<String>) {
    const max = array.length;
    const randomIndex = this.getRandomInt(0, max);
    return array[randomIndex];
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";

.hello {
  width: 100%;
  background-color: $bg-cards;
  color: black;
  border-radius: 10px;
  max-height: 30vh;
  overflow: hidden;
  &.body--dark {
    background-color: $bg-dark-light !important;
    color: $text-dark;
  }
  .hello__container {
    display: grid;
    column-gap: 2vw;
    padding: 2vh 4vh;
    .greetings__container {
      @include flex;
      align-items: center;
      flex-direction: column;
      padding: 2vh;
      h1 {
        font-size: 1.25rem;
        font-weight: 700;
        white-space: nowrap;
      }
      p {
        font-size: 1rem;
        font-weight: 500;
        white-space: nowrap;
      }
    }
    .illustration__wrapper {
      display: none;
      margin: 0 auto;
      padding: 2vh;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    @media (min-width: 360px) {
      .greetings__container {
        h1 {
          font-size: 1.5rem;
        }
        p {
          font-size: 1.125rem;
        }
      }
    }
    @media (min-width: 768px) {
      .greetings__container {
        @include flex;
        flex-direction: column;
        padding: 2vh;
        text-align: left;
        h1 {
          font-size: 2rem;
        }
      }
      @media (min-height: 700px) {
        .illustration__wrapper .illustration {
          max-height: 20vh;
        }
      }
      @media (min-height: 768px) {
        grid-template-columns: repeat(2, auto);
        .greetings__container {
          align-items: flex-start;
        }
        .illustration__wrapper {
          display: block;
        }
      }
      @media (min-width: 1650px) and (min-height: 768px) {
        .illustration__wrapper .illustration {
          max-height: 30vh;
        }
      }
    }
  }
}
</style>
