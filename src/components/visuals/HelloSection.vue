<template>
  <section class="hello">
    <div class="hello__container">
      <div class="greetings__container">
        <h1>{{ greeting }} {{ user.name }}!</h1>
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
    "Czas na mocny trening!"
  ];

  greeting = this.randomText(this.greetings);
  description = this.randomText(this.descriptions);

  get user() {
    return this.$store.getters.user;
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
  background-color: #f5f5f7;
  color: black;
  border-radius: 10px;
  max-height: 30vh;
  overflow: hidden;
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
        font-size: 2rem;
        font-weight: 700;
        white-space: nowrap;
      }
      p {
        font-size: 1.125rem;
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
        object-fit: cover;
      }
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, auto);
      .greetings__container {
        @include flex;
        align-items: flex-start;
        flex-direction: column;
        padding: 2vh;
        text-align: left;
      }
      .illustration__wrapper {
        display: block;
      }
    }
  }
}
</style>
