<template>
  <section class="coaches">
    <HeroPage
      title="Trenerzy"
      subTitle="nasza historia"
      description="Aby osiągnąć sukces pierwsze co musisz zrobić to zakochać się w ciężkiej pracy."
      image="team.jpg"
    />
    <section
      v-for="(desc, index) in descs"
      :key="index"
      class="coaches__section content__container"
    >
      <div
        class="coaches__image"
        :style="{
          backgroundImage: `url(${require('@/assets/' + desc.image)})`
        }"
      ></div>
      <div class="coaches__container">
        <div class="coaches__wrapper">
          <h1 data-aos="fade-down" data-aos-duration="500">{{ desc.title }}</h1>
          <h3 data-aos="fade-up" data-aos-duration="500" data-aos-delay="200">
            {{ desc.subTitle }}
          </h3>
          <p data-aos="fade-up" data-aos-duration="500" data-aos-delay="400">
            {{ desc.description }}
          </p>
        </div>
      </div>
    </section>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HeroPage from "@/components/HeroPage.vue";
@Component({
  components: { HeroPage }
})
export default class Coaches extends Vue {
  descs = [
    {
      image: "1.jpg",
      title: "O Nas",
      subTitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis enim. Ut pharetra sit amet aliquam id diam maecenas ultricies. A erat nam at lectus urna duis convallis convallis."
    },
    {
      image: "2.jpg",
      title: "Adam Wod",
      subTitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis enim. Ut pharetra sit amet aliquam id diam maecenas ultricies. A erat nam at lectus urna duis convallis convallis."
    },
    {
      image: "3.jpg",
      title: "Denis Wro",
      subTitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis enim. Ut pharetra sit amet aliquam id diam maecenas ultricies. A erat nam at lectus urna duis convallis convallis."
    }
  ];
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.coaches {
  .coaches__section {
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    .coaches__image {
      width: 100%;
      height: 100%;
      @include backgroundDefault;
    }
    .coaches__container {
      width: 100%;
      height: 100%;
      color: black;
      background-color: white;
      @include flex;
      align-items: center;
      .coaches__wrapper {
        flex-direction: column;
        text-align: left;
        padding: $verticalPadding $horizontalPadding;
        h1 {
          font-size: 2.25rem;
          font-weight: 600;
        }
        h3 {
          margin: 2vh 0;
          font-size: 1.25rem;
        }
        p {
          color: $secondaryColor;
          line-height: 1.5;
          font-size: 0.875rem;
        }
      }
    }
    &:nth-of-type(even) .coaches__container {
      background-color: black;
      color: white;
      p {
        color: white;
      }
    }
  }
  @media (min-width: 768px) and (min-height: 500px) {
    .coaches__section {
      min-height: 50vh;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
      .coaches__container .coaches__wrapper {
        padding: $verticalPadding / 2 $horizontalPadding / 2;
      }
      &:nth-of-type(even) {
        .coaches__image {
          grid-column: 2;
          grid-row: 1;
        }
        .coaches__wrapper {
          text-align: right;
        }
      }
    }
  }
  @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
    .coaches__section {
      min-height: 80vh;
      .coaches__image {
        display: none;
      }
    }
  }
  @media (min-width: 1400px) and (orientation: landscape) {
    .coaches__section {
      &:nth-of-type(odd) {
        .coaches__container .coaches__wrapper {
          padding-right: $horizontalPadding;
        }
      }
      &:nth-of-type(even) {
        .coaches__container .coaches__wrapper {
          padding-left: $horizontalPadding;
        }
      }
      .coaches__container .coaches__wrapper {
        h1 {
          font-size: 2.5rem;
        }
        h3 {
          font-size: 1.5rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
