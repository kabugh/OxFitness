<template>
  <section class="contact">
    <div class="contact__container">
      <h1 data-aos="fade-up" data-aos-delay="300">
        Zaobserwuj na instagramie
        <span @click="navigateOutside('https://instagram.com/oxfitnessprogram')"
          >@oxfitnessprogram</span
        >
      </h1>
      <!-- <Instagram /> -->
      <section class="contact__items--container">
        <div class="socials__items">
          <div class="socials__item" v-for="(item, j) in socialsItems" :key="j">
            <img
              :src="require(`@/assets/icons/${item.icon}`)"
              :alt="item.icon"
              class="icon"
              @click="navigateOutside(item.link)"
            />
          </div>
        </div>
        <div class="contact__items">
          <div class="contact__item">
            <a href="mailto:kontakt@oxfitness.pl">kontakt@oxfitness.pl</a>
          </div>
          <div class="contact__item">
            <a href="tel:0048612573412">+48 612 573 412</a>
          </div>
        </div>
      </section>
    </div>
    <footer v-show="false">
      <div class="footer__container">
        <div class="contact__container">
          <div class="logo__wrapper">
            <img
              src="@/assets/images/logos/ox.png"
              class="unselectable"
              alt="logo"
            />
            <h3>OxFitness</h3>
          </div>
          <address class="contact__wrapper">
            <p>Leśna 2</p>
            <p>56-100 Wołów, Polska</p>
            <a href="mailto:kontakt@oxfitness.pl">kontakt@oxfitness.pl</a>

            <a href="tel:+48726423924">+48 726 423 924</a>
          </address>
        </div>
        <ul class="menu__container">
          <li class="menu__item" v-for="(item, i) in filteredNavItems" :key="i">
            <span @click="$router.push(item.link)">{{ item.title }}</span>
          </li>
        </ul>
        <div class="links__container">
          <div class="auth__container">
            <span>Logowanie</span>
            <span>Rejestracja</span>
          </div>
          <div class="socials__container">
            <div
              class="icon__wrapper"
              v-for="(icon, index) in icons"
              :key="index"
            >
              <div
                :style="{
                  backgroundImage:
                    'url(' + require(`../assets/icons/${icon}`) + ')'
                }"
                class="icon"
              ></div>
            </div>
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
  </section>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

interface MenuItem {
  title: string;
  link: string;
}

@Component
export default class Contact extends Vue {
  navigateOutside(link: string) {
    window.open(link, "_blank");
  }

  menuItems: MenuItem[] = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "Treningi",
      link: "/features"
    },
    {
      title: "FAQ",
      link: "/faq"
    },
    {
      title: "Trenerzy",
      link: "/coaches"
    }
  ];

  get filteredNavItems() {
    return this.menuItems.filter(item => item.link !== this.$route.path);
  }

  socialsItems = [
    {
      icon: "instagram.svg",
      link: "https://instagram.com/alicjadebek_fotografia"
    },
    { icon: "fb.svg", link: "https://www.facebook.com/oxfitnessprogram/" }
  ];
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
$hoverColor: #958efa;
.contact {
  width: 100%;
  .contact__container {
    color: black;
    padding: $verticalPadding $horizontalPadding;
    @include flex;
    flex-direction: column;
    h1 {
      font-size: 1.25rem;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
      span {
        transition: color 0.5s ease-in-out;
        &:hover {
          cursor: pointer;
          color: #6b108e;
        }
      }
    }
    .logo {
      margin-top: $verticalPadding / 2;
      max-width: 55vw;
    }
    .contact__items--container {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      row-gap: 4vh;
      padding: $verticalPadding 0 0 0;
      span {
        font-size: 1.5rem;
      }
      .contact__items {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        row-gap: 2vh;
        .contact__item {
          @include flex;
          align-items: center;
          text-align: center;
          a {
            font-size: 1.25rem;
            font-weight: 500;
            text-decoration: none;
            color: black;
            transition: color 0.5s ease-in-out;
            &:hover {
              color: #6b108e;
            }
          }
        }
      }
      .socials__items {
        @include flex;
        align-items: center;
        .socials__item {
          padding: 0 2vw;
          &:first-of-type {
            padding-left: 0;
          }
          &:last-of-type {
            padding-right: 0;
          }
          img {
            width: 48px;
            height: 48px;
            transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
            &:hover {
              cursor: pointer;
              transform: scale(1.01);
            }
          }
        }
      }
    }
  }

  footer {
    padding: 4vh;
    min-height: 20vh;
    background-color: black;
    color: white;
    .footer__container {
      display: grid;
      grid-template-columns: repeat(3, auto);
      column-gap: 4rem;
      justify-content: center;
      align-items: center;
      text-align: center;
      .contact__container {
        display: flex;
        justify-content: space-between;
        padding: 0;
        .logo__wrapper {
          display: grid;
          grid-template-columns: repeat(2, auto);
          align-items: center;
          column-gap: 4rem;
          img {
            width: 4rem;
            // min-height: 2vh;
            // max-height: clamp(3vh, 5vh);
          }
          h3 {
            font-size: 2rem;
            font-weight: bold;
            text-transform: uppercase;
            color: white;
          }
        }
        .contact__wrapper {
          color: white;
          @include flex;
          flex-direction: column;
          text-align: left;
          display: none;
          margin-top: $verticalPadding / 2;
          @media (min-width: 800px) {
            display: block;
          }
          p,
          a {
            line-height: 1.75;
            font-weight: bold;
            font-style: normal;
            font-size: 1rem;
            color: white;
            width: max-content;
          }
          a {
            text-decoration: none;
            display: block;
            &:hover {
              color: $hoverColor;
            }
          }
        }
      }
      .menu__container {
        display: grid;
        grid-template-rows: repeat(auto-fill, minmax(5vh, 1fr));
        row-gap: 1rem;
        align-items: center;
        justify-content: center;
        .menu__item {
          text-align: center;
          span {
            text-decoration: none;
            color: white;
            font-weight: 500;
            font-size: 1.25em;
            &:hover {
              cursor: pointer;
              color: $hoverColor;
            }
          }
        }
      }
      .links__container {
        .auth__container {
          @include flex;
          text-align: left;
          span {
            font-weight: 500;
            padding: 2rem;
            font-size: 1rem;
          }
          @media (min-width: 800px) {
            flex-direction: column;
            span {
              padding: 0.5rem 0;
            }
          }
        }
      }
    }
    .copyrights__wrapper {
      font-weight: 500;
      color: $secondaryColor;
      text-align: left;
      .termsOfUse__wrapper {
        padding: 0.5rem 0;
      }
    }
  }
  @media (min-width: 768px) and (min-height: 500px) {
    .contact__container {
      .logo {
        margin-top: $verticalPadding / 2;
        max-width: 60vw;
      }
      h1 {
        font-size: 1.5rem;
      }

      .contact__items--container {
        padding-top: $verticalPadding / 2;
      }
    }
  }
  @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
    padding-top: $verticalPadding;
    .contact__container {
      .logo {
        max-width: 35vw;
      }
    }
  }
  @media (max-width: 750px) and (max-height: 450px) and (orientation: landscape) {
    .contact__container {
      .logo {
        max-width: 25vw;
      }
    }
  }

  @media (min-width: 1024px) and (min-height: 500px) {
    .contact__container {
      .logo {
        max-width: 15vw;
      }
      .contact__items--container .contact__items .contact__item a {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
