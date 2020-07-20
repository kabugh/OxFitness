<template>
  <section class="homePage">
    <div class="hero">
      <nav class="static__nav">
        <div class="nav__container">
          <div class="logo" data-aos="fade-down" data-aos-delay="100">
            <h3>OxFitness</h3>
          </div>
          <ul class="nav__items">
            <div class="items__grid" data-aos="fade-down" data-aos-delay="200">
              <li
                v-for="(item, i) in navItems"
                @click="$router.push(item.slug)"
                :key="i"
              >
                {{ item.name }}
              </li>
            </div>
            <div
              class="separated__items"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              <li @click="$router.push('/authentication')">Logowanie</li>
              <li
                @click="
                  $router.push({
                    name: 'authentication',
                    params: { authMode: 'signUp' }
                  })
                "
                class="highlighted"
              >
                Rejestracja
              </li>
            </div>
          </ul>
        </div>
      </nav>
      <div class="hero__container">
        <div class="hero__wrapper" data-aos="fade-right">
          <h1>
            Jedna platforma.
          </h1>
          <h1>Codzienne treningi.</h1>
          <p>
            OxFitness jest aplikacją treningową skierowaną do wszystkich, którzy
            nie mają czasu, dostępu lub nie sprawia im przyjemności uczęszczanie
            na siłownię.
          </p>
          <button
            type="button"
            class="homeButton"
            v-scroll-to="{ element: '.selection' }"
            data-aos="fade-left"
          >
            Sprawdź treningi
          </button>
          <button
            type="button"
            class="homeButton login"
            data-aos="fade-left"
            @click="$router.push('/authentication')"
          >
            Zaloguj się
          </button>
        </div>
        <div class="heroImage__wrapper" data-aos="fade-down">
          <img
            src="@/assets/illustrations/fitness3.svg"
            class="unselectable"
            alt="logo"
          />
        </div>
      </div>
    </div>
    <div class="selection">
      <div class="selection__container">
        <ul>
          <li
            v-for="(item, index) in selectionItems"
            :key="index"
            class="selection__item"
            :style="{
              backgroundImage: 'url(' + require(`@/assets/${item.image}`) + ')'
            }"
          >
            <h2>{{ item.title }}</h2>
            <router-link
              tag="button"
              type="button"
              :to="{ name: item.route, params: { authMode: 'signUp' } }"
              >{{ item.button }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <section class="start">
      <div class="start__container">
        <h1 data-aos="fade-up" data-aos-delay="200">Zacznij za darmo.</h1>
        <h1 data-aos="fade-up" data-aos-delay="300">Ćwicz z naszą pomocą.</h1>
        <p data-aos="fade-up" data-aos-delay="400">
          Wypróbuj plan OxFitness przez cały miesiąc bez opłat i pozostań na
          dłużej.
        </p>
        <img
          src="@/assets/illustrations/develop.svg"
          class="illustration unselectable"
          loading="lazy"
          alt="develop"
        />
      </div>
    </section>
    <section class="statistics">
      <div class="statistics__container">
        <div class="statistics__header">
          <h1 data-aos="fade-down" data-aos-delay="100">
            Najlepsi w swojej dziedzinie.
          </h1>
          <p data-aos="fade-down" data-aos-delay="200">
            Always fast. Always online. Always effective.
          </p>
        </div>
        <div class="data__container">
          <div class="data__item" v-for="(item, j) in statistics" :key="j">
            <h2 data-aos="fade-down" :data-aos-delay="300 + (j + 1) * 100">
              {{ item.value }}+
            </h2>
            <span data-aos="fade-down" :data-aos-delay="400 + (j + 1) * 100">{{
              item.description
            }}</span>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="brands">
      <h1>Partnerzy.</h1>
      <div class="brands__container">
        <div
          class="brand"
          v-for="(brand, i) in brands"
          :key="i"
          :style="{
            backgroundImage: 'url(' + require(`@/assets/brands/${brand}`) + ')'
          }"
        ></div>
      </div>
    </section> -->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  easing: "ease-in-out-quart"
});

@Component
export default class Home extends Vue {
  navItems = [
    { name: "Funkcjonalności", slug: "/features" },
    { name: "Cennik", slug: "/pricing" },
    { name: "FAQ", slug: "/faq" },
    { name: "Kontakt", slug: "/contact" }
  ];

  selectionItems = [
    {
      title: "Czym jest OxFitness?",
      button: "Dowiedz się więcej",
      image: "1.jpg",
      route: "features"
    },
    {
      title: "Chcę dołączyć do programu",
      button: "Zarejestruj się",
      image: "2.jpg",
      route: "authentication"
    },
    {
      title: "Należę do OxFitness",
      button: "Zaloguj się",
      image: "3.jpg",
      route: "dashboard"
    }
  ];

  statistics = [
    { value: 120, description: "nowych użytkowników" },
    { value: 50, description: "unikalnych workoutów" },
    { value: 8, description: "treningów na żywo" }
  ];
}
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
$horizontalPadding: 10vw;
$verticalPadding: 8vw;
$backgroundColor: #958efa;
$secondaryColor: #666;
.homePage {
  width: 100%;
  color: white;
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: $backgroundColor;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    @include flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .hero__container {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 6vw;
      padding: $verticalPadding $horizontalPadding;
      .hero__wrapper {
        @include flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        h1 {
          font-size: 1.5rem !important;
          font-weight: bold;
          line-height: 1.25;
        }
        p {
          font-size: 1em;
          font-weight: 500;
          margin: 6vh 0;
        }
        button {
          padding: 16px 20px;
          font-weight: 600 !important;
          font-size: 14px !important;
          text-transform: uppercase;
          border: none;
          transition: all 0.5s ease-in-out;
          &.homeButton {
            background: #6b108e;
            color: #fff;
            &.login {
              display: block;
              margin: 2vh 0;
            }
            &:hover {
              background: #80389c;
            }
          }
        }
      }
      .heroImage__wrapper {
        @include flex;
        align-items: center;
        display: none;
        img {
          max-width: 35vw;
          max-height: 50vh;
        }
      }
    }
    .static__nav {
      width: 100%;
      position: absolute;
      top: 0;
      padding: 4vh $horizontalPadding;
      z-index: 99;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .nav__container {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        .logo {
          text-align: center;
          h3 {
            font-weight: 600;
            font-size: 2rem;
            text-transform: uppercase;
          }
        }
        .nav__items {
          display: none;
          grid-template-columns: 1.5fr 1fr;
          .separated__items,
          .items__grid {
            @include flex;
            align-items: center;
          }
          .separated__items {
            justify-content: flex-end;
            grid-column: 3;
          }
          li {
            height: 100%;
            margin: 0 12px;
            font-weight: 500;
            @include flex;
            align-items: center;
            &:first-child {
              padding-left: 0;
            }
            &:hover {
              cursor: pointer;
            }
            &.highlighted {
              padding: 2px 12px;
              background-color: #6b108e;
              border-radius: 5px;
              transition: all 0.5s ease-in-out;
              &:hover {
                background: #80389c;
              }
            }
          }
        }
        .burger__wrapper {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex: 1;
          height: 100%;
        }
      }
    }
    @media (min-width: 370px) {
      .hero__container .hero__wrapper {
        h1 {
          font-size: 2rem !important;
        }
        p {
          font-size: 1.25em;
        }
      }
    }
    @media (min-width: 700px) {
      .static__nav .nav__container {
        grid-template-columns: 1fr 4fr;
        .logo {
          text-align: left;
        }
        .nav__items {
          display: grid;
          .items__grid {
            display: none;
          }
        }
      }
      .hero__container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        .hero__wrapper {
          @include flex;
          align-items: flex-start;
          flex-direction: column;
          text-align: left;
          h1 {
            font-size: 3.25rem !important;
          }
          p {
            font-size: 1.25em;
            font-weight: 500;
            margin: 3vh 0;
          }
          button {
            padding: 15px 40px;
            font-size: 16px !important;
            &.homeButton.login {
              display: none;
            }
          }
        }
        .heroImage__wrapper {
          display: flex;
        }
      }
    }
    @media (min-width: 1000px) and (orientation: landscape) {
      .static__nav .nav__container .nav__items .items__grid {
        display: flex;
      }
    }
    @media (min-width: 768px) and (min-height: 1024px) and (max-width: 1000px) and (orientation: portrait) {
      .hero__container {
        grid-template-columns: 1fr;
        column-gap: 0;
        row-gap: 4vh;
        .heroImage__wrapper {
          grid-row: 1;
          img {
            max-width: 45vw;
          }
        }
      }
    }
    @media (min-width: 1024px) and (min-height: 1360px) and (orientation: portrait) {
      height: 75vh;
      .hero__container {
        grid-template-columns: 1fr;
        column-gap: 0;
        row-gap: 4vh;
        .hero__wrapper {
          button {
            font-size: 20px !important;
          }
        }
        .heroImage__wrapper {
          grid-row: 1;
          img {
            max-width: 45vw;
          }
        }
      }
    }
  }

  .selection {
    width: 100%;
    .selection__container {
      width: 90%;
      margin: 0 auto;
      ul {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 4vh;
        padding: 4vh 0;
        .selection__item {
          @include flex;

          justify-content: space-around;
          align-items: center;
          flex-direction: column;
          text-align: center;
          @include backgroundDefault;
          width: 100%;
          min-height: 60vh;
          padding: 6vh;
          h2 {
            font-size: 2rem;
            line-height: 3rem;
            font-weight: bolder;
          }
          button {
            background: transparent;
            font-weight: 600 !important;
            font-size: 16px !important;
            &:hover {
              background-color: white;
            }
          }
          a {
            color: white;
            text-decoration: none;
          }
        }
        @media (min-width: 1200px) {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    }
  }
  .start {
    width: 100%;
    background-color: $backgroundColor;
    color: white;
    padding: $verticalPadding $horizontalPadding;
    .start__container {
      text-align: center;
      h1 {
        font-size: 1.25rem !important;
        font-weight: bold;
        line-height: 1.25;
      }
      p {
        font-size: 1em;
        font-weight: 500;
        margin: 3vh 0;
      }
      .illustration {
        max-width: 60vw;
        margin: 0 auto;
      }
      @media (min-width: 370px) {
        h1 {
          font-size: 1.75rem !important;
        }
        p {
          font-size: 1.25em;
        }
      }
      @media (min-width: 700px) {
        h1 {
          font-size: 3.5rem !important;
        }
        p {
          font-size: 1.5em;
          margin: 3vh 0;
        }
      }
    }
  }
  .statistics {
    width: 100%;
    background-color: white;
    color: black;
    .statistics__container {
      padding: $verticalPadding $horizontalPadding;
      text-align: center;
      .statistics__header {
        h1 {
          font-size: 1.25rem !important;
          font-weight: bold;
          line-height: 1.25;
        }
        p {
          font-size: 1em;
          font-weight: 500;
          margin: 2vh 0;
          color: $secondaryColor;
        }
      }
      .data__container {
        margin-top: 4vh;
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: 1fr;
        .data__item {
          padding: 4vh 0;
          border-bottom: 1px solid lightgray;
          h2 {
            font-size: 2.5rem;
            font-weight: 600;
            line-height: 1;
          }
          span {
            text-transform: uppercase;
            font-size: 0.75rem;
            font-weight: 600;
            color: $secondaryColor;
          }
          &:last-of-type {
            border-bottom: none;
          }
        }
      }
      @media (min-width: 370px) and (orientation: portrait) {
        .statistics__header {
          h1 {
            font-size: 2rem !important;
          }
          p {
            font-size: 1.25em;
          }
        }
        .data__container {
          .data__item {
            h2 {
              font-size: 3.5rem;
            }
            span {
              font-size: 0.75rem;
            }
          }
        }
      }
      @media (min-width: 700px) {
        .statistics__header {
          h1 {
            font-size: 3.5rem !important;
          }
          p {
            font-size: 1.5em;
            margin: 2vh 0;
          }
        }
        .data__container {
          margin-top: 8vh;
          grid-template-columns: repeat(auto-fit, minmax(100px, 20vw));
          .data__item {
            padding: 0 4vw;
            border-right: 1px solid lightgray;
            border-bottom: 0;
            h2 {
              font-size: 3.5rem;
            }
            span {
              font-size: 0.75rem;
            }
            &:last-of-type {
              border-right: none;
            }
          }
        }
      }
      @media (min-width: 768px) and (min-height: 1024px) {
        .data__container {
          .data__item {
            padding: 0 1vw;
            span {
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  }
  .brands {
    width: 100%;
    color: black;
    padding: $verticalPadding $horizontalPadding;
    @include flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 3.5rem !important;
      font-weight: bold;
      line-height: 1.25;
    }
    .brands__container {
      width: 100%;
      margin: 4vh 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      column-gap: 4vw;
      .brand {
        @include backgroundDefault;
        background-size: contain;
        width: auto;
        min-height: 10vh;
      }
    }
  }
  #nav-icon,
  #nav-icon-static {
    display: block;
    width: 25px;
    height: 20px;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
    z-index: 100;
  }
  #nav-icon-static {
    position: static !important;
    margin-top: 0 !important;
    margin-right: 0 !important;
  }
  #nav-icon span,
  #nav-icon-static span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: white;
    opacity: 1;
    top: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }
  /* #nav-icon:not(.open):hover span:first-child,  */
  #nav-icon-static:not(.open):hover span:first-child {
    width: 16px;
  }
  /* #nav-icon:not(.open):hover span:nth-child(2),  */
  #nav-icon-static:not(.open):hover span:nth-child(2) {
    width: 20px;
  }
  /* #nav-icon:not(.open):hover span:nth-child(3),  */
  #nav-icon-static:not(.open):hover span:nth-child(3) {
    width: 24px;
  }
  #nav-icon span:nth-child(1),
  #nav-icon-static span:nth-child(1),
  #nav-icon:not(.open):hover {
    top: 0;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }
  #nav-icon span:nth-child(2),
  #nav-icon-static span:nth-child(2) {
    top: 7px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }
  #nav-icon span:nth-child(3),
  #nav-icon-static span:nth-child(3) {
    top: 14px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }
  #nav-icon-static.open span:nth-child(1),
  #nav-icon.open span:nth-child(1) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -3px;
  }
  #nav-icon-static.open span:nth-child(2),
  #nav-icon.open span:nth-child(2) {
    width: 0;
    opacity: 0;
  }
  #nav-icon-static.open span:nth-child(3),
  #nav-icon.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    top: 15px;
  }
}
</style>
