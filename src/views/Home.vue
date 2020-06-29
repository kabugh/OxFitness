<template>
  <section class="homePage">
    <div class="hero">
      <nav class="static__nav">
        <div class="nav__container">
          <div class="logo">
            <h3>OxFitness</h3>
          </div>
          <ul class="nav__items">
            <div class="items__grid">
              <li
                v-for="(item, i) in navItems"
                @click="$router.push(item.slug)"
                :key="i"
              >
                {{ item.name }}
              </li>
            </div>
            <div class="separated__items">
              <li @click="$router.push('/authentication')">Logowanie</li>
              <li class="highlighted" @click="$router.push('/')">
                Rejestracja
              </li>
            </div>
          </ul>
        </div>
      </nav>
      <div class="hero__container">
        <div class="hero__wrapper">
          <h1>Jedna platforma.</h1>
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
          >
            Sprawdź treningi
          </button>
        </div>
        <div class="heroImage__wrapper">
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
            :style="{
              backgroundImage: 'url(' + require(`@/assets//${item.image}`) + ')'
            }"
            class="selection__item"
          >
            <h2>{{ item.title }}</h2>
            <router-link
              v-if="item.link"
              tag="button"
              type="button"
              :to="{ path: item.link }"
              >{{ item.button }}</router-link
            >
            <button
              type="button"
              v-else
              @click="
                navigateOutside(item.externalLink);
                $router.push('/features');
              "
            >
              {{ item.button }}
            </button>
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
      link: "/features"
    },
    {
      title: "Chcę dołączyć do programu",
      button: "Zarejestruj się",
      image: "2.jpg",
      externalLink: "https://wod.guru/athlete-registration-form/wolow"
    },
    {
      title: "Należę do OxFitness",
      button: "Zaloguj się",
      image: "3.jpg",
      link: "/dashboard"
    }
  ];

  navigateOutside(link: string) {
    window.open(link, "_blank");
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
$heroPadding: 10vw;
.homePage {
  width: 100%;
  color: white;
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #7f6f8a;
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
      padding: 6vh $heroPadding;
      .hero__wrapper {
        @include flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        h1 {
          font-size: 2rem !important;
          font-weight: bold;
          line-height: 1.25;
        }
        p {
          font-size: 1.25em;
          font-weight: 500;
          margin: 6vh 0;
        }
        button {
          padding: 15px 40px;
          font-weight: 600 !important;
          font-size: 16px !important;
          text-transform: uppercase;
          border: none;
          &.homeButton {
            background: #6b108e;
            color: #fff;
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
      padding: 2vh $heroPadding;
      z-index: 100;
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
              padding: 8px 16px;
              background-color: #6b108e;
              border-radius: 5px;
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
    @media (min-width: 700px) {
      .static__nav .nav__container {
        grid-template-columns: 1fr 4fr;
        .logo {
          text-align: left;
        }
        .nav__items {
          display: grid;
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
            font-weight: bold;
            line-height: 1.25;
          }
          p {
            font-size: 1.25em;
            font-weight: 500;
            margin: 3vh 0;
          }
          button {
            padding: 15px 40px;
            font-weight: 600 !important;
            font-size: 16px !important;
            text-transform: uppercase;
            border: none;
            &.homeButton {
              background: #6b108e;
              color: #fff;
              &:hover {
                background: #80389c;
              }
            }
          }
        }
        .heroImage__wrapper {
          display: flex;
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
}
</style>
