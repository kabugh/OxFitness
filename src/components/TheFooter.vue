<template>
  <footer>
    <div class="footer__container">
      <div class="logo__wrapper">
        <img src="@/assets/ox_white.png" class="unselectable" alt="logo" />
      </div>
      <address class="contact__wrapper">
        <p>Leśna 2</p>
        <p>56-100 Wołów, Polska</p>
        <p>+48 726 423 924</p>
        <p>contact@oxfitness.com</p>
      </address>
      <div class="menu__container">
        <div class="menu__item" v-for="(item, i) in menuItems" :key="i">
          <a href="">{{ item }}</a>
        </div>
      </div>
      <div class="auth__container">
        <span>Logowanie</span>
        <span>Rejestracja</span>
      </div>
      <div class="socials__container">
        <div class="icon__wrapper" v-for="(icon, index) in icons" :key="index">
          <div
            :style="{
              backgroundImage: 'url(' + require(`../assets/icons/${icon}`) + ')'
            }"
            class="icon"
          ></div>
        </div>
      </div>
    </div>
    <div class="copyrights__wrapper">
      <div class="termsOfUse__wrapper">
        <span><a>Polityka prywatności</a> - <a>Warunki korzystania</a></span>
      </div>
      <span>&copy; 2020 OxFitness. Wszelkie prawa zastrzeżone.</span>
    </div>
  </footer>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
export default class TheFooter extends Vue {
  menuItems = [
    "Home",
    "Członkostwo",
    "Start",
    "FAQ",
    "Trenerzy",
    "Historia",
    "Poradniki",
    "Sklep"
  ];
  icons = ["insta.png", "fb.png", "yt.png"];
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
footer {
  padding: 4vh 2vh;
  min-height: 20vh;
  background-color: black;
  color: white;
  .footer__container {
    padding: 4vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas: "logo" "menu" "." "auth" "socials";
    column-gap: 4rem;
    @media (min-width: 800px) {
      padding: 6vh 10vh;

      grid-template-columns: 0.25fr 0.75fr 0.25fr;
      grid-template-rows: repeat(2, 1fr);
      grid-template-areas: "logo menu auth" "contact menu socials";
      column-gap: 4rem;
    }
    justify-content: center;
    align-items: center;
    text-align: center;
    .logo__wrapper {
      grid-area: logo;
      img {
        width: 100%;
        min-height: 2vh;
        max-height: clamp(3vh, 5vh);
      }
    }
    .contact__wrapper {
      grid-area: contact;
      @include flex;
      flex-direction: column;
      text-align: left;
      display: none;
      @media (min-width: 800px) {
        display: block;
      }
      p {
        line-height: 1.75;
        font-weight: bold;
        font-size: 1rem;
      }
    }
    .menu__container {
      grid-area: menu;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      row-gap: 2em;
      align-items: center;
      justify-content: center;
      .menu__item {
        text-align: center;
        a {
          text-decoration: none;
          color: white;
          font-size: 1.25em;
        }
      }
    }
    .auth__container {
      grid-area: auth;
      @include flex;
      text-align: left;
      span {
        font-weight: bold;
        padding: 2em;
        font-size: 1rem;
      }
      @media (min-width: 800px) {
        flex-direction: column;
        span {
          padding: 0;
        }
      }
    }
    .socials__container {
      grid-area: socials;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 2vh;
      .icon__wrapper {
        @include flex;
        align-items: center;
        padding: 2vh 0;
        .icon {
          width: 32px;
          height: 32px;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
      @media (min-width: 600px) {
        .icon__wrapper {
          justify-content: flex-start;
          padding: 0;
        }
      }
    }
  }
  .copyrights__wrapper {
    color: gray;
    text-align: center;
    .termsOfUse__wrapper {
      padding: 0.5em;
    }
  }
}
</style>
