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
  </section>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Contact extends Vue {
  navigateOutside(link: string) {
    window.open(link, "_blank");
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
.contact {
  width: 100%;
  padding: $verticalPadding / 2 0 $verticalPadding 0;
  .contact__container {
    color: black;
    padding: $verticalPadding / 4 $horizontalPadding;
    padding-bottom: 0;
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
