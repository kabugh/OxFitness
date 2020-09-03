<template>
  <section class="homePage">
    <div class="hero">
      <BackgroundGradient :width="1000" :height="1000" />
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
              <li v-scroll-to="'.contact'">Kontakt</li>
            </div>
            <div
              class="separated__items"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              <li @click="$router.push('/authentication')" class="highlighted">
                Logowanie
              </li>
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
            W domu, w garażu, na podwórku, w mieszkaniu. Przed pracą, po pracy,
            rano, w południe, wieczorem. Treningi Ox Fitness możesz wykonywać
            gdzie chcesz i kiedy chcesz!
          </p>

          <div class="buttons__container">
            <button
              type="button"
              class="homeButton"
              v-scroll-to="{ element: '.introduction' }"
              data-aos="fade-left"
              data-aos-offset="-500"
            >
              Zacznij przygodę
            </button>
            <button
              type="button"
              class="homeButton login"
              data-aos="fade-left"
              data-aos-offset="-500"
              @click="$router.push('/authentication')"
            >
              Zaloguj się
            </button>
          </div>
        </div>
        <div class="heroImage__container" data-aos="fade-down">
          <img
            src="@/assets/images/prototypes/iphone1.png"
            class="unselectable rellax"
            data-rellax-percentage="0.5"
            data-rellax-speed="-2"
            data-rellax-tablet-speed="-1"
            alt="logo"
          />
          <img
            src="@/assets/images/prototypes/iPadVer.webp"
            class="unselectable ipad rellax"
            data-rellax-percentage="0.5"
            data-rellax-speed="2"
            data-rellax-tablet-speed="1"
            alt="logo"
          />
        </div>
      </div>
    </div>
    <section class="introduction">
      <div class="introduction__container">
        <div
          class="item__container"
          v-for="(item, index) in introductionItems"
          :key="index"
        >
          <div class="description__container">
            <h1 data-aos="fade-up" :data-aos-delay="100 + index * 50">
              {{ item.title }}
            </h1>
            <p data-aos="fade-up" :data-aos-delay="200 + index * 50">
              {{ item.description }}
            </p>
            <button
              data-aos="fade-up"
              :data-aos-delay="300 + index * 50"
              type="button"
              @click="
                $router.push({
                  name: item.routeName,
                  params: { authMode: 'signUp' }
                })
              "
            >
              {{ item.buttonText }}
            </button>
          </div>
          <img
            :src="require(`@/assets/illustrations/${item.image}`)"
            class="illustration unselectable"
            loading="lazy"
            alt="develop"
            data-aos="fade-left"
            :data-aos-delay="200 + index * 50"
          />
        </div>
      </div>
    </section>
    <section class="start">
      <div class="start__container">
        <h1 data-aos="fade-up" data-aos-delay="200">Zacznij za darmo.</h1>
        <h1 data-aos="fade-up" data-aos-delay="300">Ćwicz z naszą pomocą.</h1>
        <p data-aos="fade-up" data-aos-delay="400">
          Skorzystaj z darmowego tygodnia w OxFitness i pozostań na dłużej.
        </p>
        <img
          src="@/assets/illustrations/develop.svg"
          class="illustration unselectable"
          loading="lazy"
          alt="develop"
        />
      </div>
    </section>
    <div class="coaches">
      <div class="coaches__container">
        <img
          data-aos="fade-up"
          data-aos-delay="200"
          src="@/assets/team.jpg"
          alt="coaches"
          class="coaches__image unselectable"
        />
        <h1 data-aos="fade-up" data-aos-delay="200">
          Poznaj naszych trenerów.
        </h1>
        <p data-aos="fade-up" data-aos-delay="300">
          Nie tylko przygotowujemy treningi, ale również dbamy o ich jakość i
          różnorodność.
        </p>
        <button
          data-aos="fade-up"
          data-aos-delay="400"
          type="button"
          @click="$router.push('/coaches')"
        >
          Sprawdź
        </button>
      </div>
    </div>
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
import BackgroundGradient from "@/components/visuals/BackgroundGradient.vue";
import Contact from "@/components/Contact.vue";

import Rellax from "rellax";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  easing: "ease-in-out-quart",
  once: true
});

interface IntroductionItem {
  title: string;
  description: string;
  buttonText: string;
  routeName: string;
  image: string;
}

@Component({ components: { BackgroundGradient, Contact } })
export default class Home extends Vue {
  mounted() {
    const rellax = new Rellax(".rellax");
  }

  navItems = [
    { name: "Treningi", slug: "/features" },
    { name: "FAQ", slug: "/faq" },
    { name: "Trenerzy", slug: "/coaches" }
  ];

  introductionItems: IntroductionItem[] = [
    {
      title: "Członkostwo Ox Fitness to 40 PLN za miesiąc - bez żadnej umowy!",
      description:
        "Daj sobie szansę przekonać się, jak trening w domu działa na Ciebie. Wszystko, czego potrzebujesz to para hantli i chęć do trenowania.",
      buttonText: "Zobacz więcej",
      routeName: "features",
      image: "introduction1.svg"
    },
    {
      title: "Masz być z siebie dumny, świetnie się czuć i wyglądać!",
      description:
        "Każde ćwiczenie jest podane w różnych wersjach sprzętowych, oraz przygotowane pod Ciebie! Bez względu na to, jaki poziom sportowy reprezentujesz 🔥",
      buttonText: "Wypróbuj",
      routeName: "authentication",
      image: "introduction2.svg"
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
  p {
    line-height: 1.75;
  }

  .hero {
    position: relative;
    width: 100%;
    height: 100vh;

    // @media (min-width: 1280px) {
    //   background: -webkit-linear-gradient(
    //     174deg,
    //     #958efa,
    //     #958efa 75%,
    //     #9618c7 calc(75% + 1px),
    //     #9618c7 100%
    //   );
    //   background: linear-gradient(
    //     174deg,
    //     #958efa,
    //     #958efa 75%,
    //     #9618c7 calc(75% + 1px),
    //     #9618c7 100%
    //   );
    // }

    // @media (min-width: 1450px) {
    //   background: -webkit-linear-gradient(
    //     174deg,
    //     #958efa,
    //     #958efa 65%,
    //     #9618c7 calc(65% + 1px),
    //     #9618c7 100%
    //   );
    //   background: linear-gradient(
    //     174deg,
    //     #958efa,
    //     #958efa 65%,
    //     #9618c7 calc(65% + 1px),
    //     #9618c7 100%
    //   );
    // }

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    @include flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .bgGradient {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      @media (min-width: 768px) {
        height: 90%;
        margin-top: -7%;
        transform: skewY(174deg);
      }
    }
    .hero__container {
      z-index: 1;
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
        .buttons__container {
          @include flex;
          flex-direction: column;
          align-items: center;
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
      .heroImage__container {
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
          grid-template-columns: repeat(2, auto);
          column-gap: $horizontalPadding / 2;
          .separated__items,
          .items__grid {
            @include flex;
            align-items: center;
            width: max-content;
            margin: 0 auto;
          }
          .separated__items {
            justify-content: flex-end;
            grid-column: 3;
          }
          li {
            height: 100%;
            margin: 0 12px;
            font-weight: 500;
            &:not(.highlighted) {
              font-weight: 600;
              font-size: 1rem;
            }
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
          font-size: 1.75rem !important;
        }
        p {
          font-size: 1.25em;
        }
      }
    }
    @media (min-width: 700px) and (min-height: 500px) {
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
            font-size: 3rem !important;
          }
          p {
            font-size: 1.125em;
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
        .heroImage__container {
          display: flex;
          img:first-of-type {
            margin: 0;
          }
          img:last-of-type {
            display: none;
          }
        }
      }
    }
    @media (min-width: 550px) and (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
      display: block;
      .bgGradient {
        z-index: -1;
      }
      .hero__container {
        padding: $verticalPadding * 2 $horizontalPadding;
        .hero__wrapper {
          h1 {
            font-size: 1.25rem !important;
          }
          p {
            font-size: 0.875rem;
          }
          .buttons__container {
            flex-direction: row;
          }
          button {
            font-size: 12px !important;
            &:first-of-type {
              margin-right: 2vw;
            }
            &:last-of-type {
              margin: 0;
            }
          }
        }
      }
    }
    @media (min-width: 550px) and (max-width: 750px) and (max-height: 400px) and (orientation: landscape) {
      .hero__container {
        padding: $verticalPadding * 3 / 2 $horizontalPadding;
        .hero__wrapper {
          h1 {
            font-size: 1rem !important;
          }
          p {
            font-size: 0.75rem;
          }
        }
      }
    }
    @media (min-width: 768px) and (min-height: 1024px) and (max-width: 1000px) and (orientation: portrait) {
      .hero__container {
        grid-template-columns: 1fr;
        column-gap: 0;
        row-gap: 4vh;
        padding-bottom: 0;
        .heroImage__container {
          grid-row: 1;
          img {
            max-height: 40vh;
          }
        }
      }
    }
    @media (min-width: 1024px) {
      .static__nav .nav__container .nav__items {
        grid-template-columns: 1.5fr 0.5fr;
        margin: 0 $horizontalPadding / 2;
        .separated__items {
          grid-column: auto;
        }
        .items__grid {
          display: flex;
        }
      }
      .hero__container {
        grid-template-columns: repeat(2, auto);
        .heroImage__container {
          img {
            max-width: 50vw;
            min-height: 60vh;
            max-height: 60vh;
          }
        }
      }
    }
    @media (min-width: 1024px) and (max-width: 1300px) and (min-height: 1080px) and (orientation: portrait) {
      height: 75vh;
      .hero__container {
        grid-template-columns: repeat(2, auto);
        column-gap: 4vh;
        .hero__wrapper {
          h1 {
            font-size: 3.25rem !important;
          }
          p {
            font-size: 1.25rem;
          }
          button {
            font-size: 20px !important;
          }
        }
        .heroImage__container {
          img {
            max-width: 45vw;
            min-height: auto;
            max-height: 45vh;
          }
        }
      }
    }
    @media (min-width: 1280px) and (min-height: 500px) {
      .hero__container {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1450px) and (min-height: 500px) {
      .hero__container .heroImage__container img {
        min-height: auto;
        max-height: 55vh;
        margin-left: 1vw;
        margin-right: 1vw;
        &:first-of-type {
          margin-top: -10vh;
        }
        &:last-of-type {
          margin-top: 10vh;
          display: block;
        }
      }
    }
    @media (min-width: 1650px) and (min-height: 1024px) {
      .hero__container .hero__wrapper h1 {
        font-size: 3.75rem !important;
      }
    }
  }

  .start,
  .introduction,
  .coaches {
    width: 100%;
    background-color: $backgroundColor;
    color: white;
    padding: $verticalPadding $horizontalPadding;
    .start__container,
    .introduction__container .item__container,
    .coaches__container {
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
      button {
        font-size: 14px;
        background-color: #6b108e;
        border: none;
        &:hover {
          background-color: #80389c;
          color: white;
        }
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
      @media (min-width: 500px) and (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
        h1 {
          font-size: 2.25rem !important;
        }
        p {
          font-size: 1em;
        }
      }
    }
  }

  .introduction {
    background-color: white;
    color: black;
    overflow: hidden;
    .introduction__container {
      display: grid;
      grid-template-rows: repeat(2, auto);
      row-gap: $verticalPadding * 3 / 2;
      .item__container {
        display: grid;
        grid-template-columns: auto;
        row-gap: $verticalPadding;
        &:first-of-type {
          h1 span {
            color: #6b108e;
          }
        }
        &:nth-of-type(2) button {
          margin-top: 2vh;
        }
        &:nth-of-type(even) {
          .illustration {
            display: none;
          }
        }
      }
      @media (min-width: 700px) and (min-height: 500px) {
        .item__container {
          .description__container {
            h1 {
              font-size: 2.5rem !important;
            }
            p {
              font-size: 1.25rem;
            }
          }
        }
      }
      @media (min-width: 500px) and (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
        .item__container {
          .description__container {
            h1 {
              font-size: 1.5rem !important;
            }
            p {
              font-size: 1rem;
            }
          }
        }
      }
      @media (min-width: 1250px) and (min-height: 800px) and (orientation: landscape) {
        .item__container {
          display: grid;
          grid-template-rows: 1fr;
          grid-template-columns: 1fr 0.75fr;
          align-items: center;
          column-gap: $horizontalPadding / 2;
          button {
            font-size: 16px;
          }
          .description__container {
            text-align: left;
          }
          .illustration {
            max-width: 30vw;
            margin: 0;
          }
          &:nth-of-type(odd) .illustration {
            margin-left: auto;
          }
          &:nth-of-type(even) {
            .description__container {
              grid-column: 2;
              grid-row: 1;
              text-align: right;
            }
            .illustration {
              display: block;
              grid-column: 1;
              grid-row: 1;
              margin-right: auto;
            }
          }
        }
      }
    }
  }

  .coaches {
    background-color: white;
    color: black;
    .coaches__container {
      .coaches__image {
        max-width: 50vw;
        max-height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      h1 {
        margin-top: 4vh;
      }
    }
  }

  .statistics {
    width: 100%;
    background-color: $backgroundColor;
    color: white;
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
