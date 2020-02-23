<template>
  <section class="homePage">
    <div class="hero">
      <div class="hero__wrapper">
        <h1>OxFit</h1>
        <h2>Train wherever you are</h2>
        <button type="button">Select</button>
      </div>
    </div>
    <div class="selection">
      <div class="selection__wrapper">
        <ul>
          <li
            v-for="(item, index) in selectionItems"
            :key="index"
            :style="{
              backgroundImage: 'url(' + require(`@/assets/${item.image}`) + ')'
            }"
            class="selection__item"
          >
            <h2>{{ item.title }}</h2>
            <router-link tag="button" type="button" to="/dashboard">{{
              item.button
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  selectionItems = [
    {
      title: "Czym jest OxFit?",
      button: "Dowiedz się więcej",
      image: "1.jpg"
    },
    {
      title: "Chcę dołączyć do programu",
      button: "Zarejestruj się",
      image: "2.jpg"
    },
    {
      title: "Należę do OxFit",
      button: "Zaloguj się",
      image: "3.jpg"
    }
  ];
}
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
.homePage {
  width: 100%;
  color: white;
  .hero {
    width: 100%;
    height: 100vh;
    background-image: url(../assets/bg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .hero__wrapper {
      padding: 10vh 0;
      @include flex;
      align-items: center;
      flex-direction: column;
      h1 {
        font-size: 3.5rem;
      }
      h2 {
        font-size: 1.5rem;
        font-weight: 400;
      }
      button {
        margin-top: 4vh;
      }
    }
  }
  .selection {
    width: 100%;
    .selection__wrapper {
      width: 90%;
      margin: 0 auto;
      ul {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 4vh;
        padding: 4vh 0;
        .selection__item {
          @include flex;
          width: 100%;
          min-height: 60vh;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
          text-align: center;
          @include backgroundDefault;
          padding: 6vh;
          h2 {
            font-size: 2rem;
          }
          button {
            background: transparent;
            &:hover {
              background-color: white;
            }
          }
        }
        @media (min-width: 1200px) {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    }
  }
}
</style>
