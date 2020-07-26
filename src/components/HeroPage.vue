<template>
  <header
    class="hero"
    :style="{
      backgroundImage: 'url(' + require(`@/assets/${this.image}`)
    }"
  >
    <div class="hero__container">
      <h1 ref="title">{{ this.title }}</h1>
      <h2 ref="subtitle" class="highlighted">
        <span>{{ this.subTitle }}</span>
      </h2>
      <p ref="desc">
        {{ this.description }}
      </p>
      <button
        type="button"
        ref="button"
        class="thin"
        v-scroll-to="'.content__container'"
      >
        Zobacz więcej
      </button>
    </div>
  </header>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TimelineLite } from "gsap";

@Component
export default class HeroPage extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ required: false }) subTitle!: string;
  @Prop({ required: false }) description!: string;
  @Prop({ required: true }) image!: string;

  mounted() {
    const title = this.$refs.title;
    const subtitle = this.$refs.subtitle;
    const desc = this.$refs.desc;
    const button = this.$refs.button;

    const timeline1 = new TimelineLite();
    const timeline2 = new TimelineLite();

    timeline1
      .from(title, {
        delay: 1,
        duration: 1.5,
        opacity: 0,
        y: -100,
        ease: "power4"
      })
      .to(title, { y: 0 })
      .from(
        subtitle,
        {
          delay: 1,
          duration: 1.5,
          opacity: 0,
          y: 100,
          ease: "power4"
        },
        "-=2.5"
      )
      .to(subtitle, { y: 0 });
    timeline2
      .from(desc, {
        delay: 2,
        duration: 1.5,
        opacity: 0,
        y: 100,
        ease: "power4"
      })
      .to(desc, { y: 0 })
      .from(button, { duration: 1, opacity: 0, y: 50, ease: "power4" }, "-=2")
      .to(button, { y: 0 });
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.hero {
  width: 100%;
  height: 100vh;
  @include backgroundDefault;
  background-image: url("../assets/bg.jpg");
  @include flex;
  align-items: center;
  .hero__container {
    @include flex;
    align-items: center;
    flex-direction: column;
    padding: $verticalPadding $horizontalPadding;
    text-align: center;
    color: white;
    h1 {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 2px;
    }
    h2 {
      margin: 2vh 0;
      font-size: 1.25rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    p {
      text-align: center;
      font-size: 1.25rem;
      font-weight: 400;
      max-width: 60vw;
    }
    button {
      margin-top: 6vh;
      transition: background 0.5s ease-in-out, color 0.5s ease-in-out;
    }
  }
}
@media (min-width: 350px) {
  .hero .hero__container h2.highlighted {
    text-align: center;
    > span {
      position: relative;
      display: inline-block;
      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        border-bottom: 1px solid;
        width: 20px;
        margin: 0 20px;
      }
    }
    > span:before {
      right: 100%;
    }
    > span:after {
      left: 100%;
    }
  }
}
@media (min-width: 768px) and (min-height: 500px) {
  .hero .hero__container {
    h1 {
      font-size: 4rem;
    }
    h2 {
      font-size: 2.25rem;
      margin-bottom: 4vh;
      &.highlighted > span &:before,
      &:after {
        width: 75px;
      }
    }
    p {
      font-size: 1.25rem;
      max-width: 50vw;
    }
  }
}
@media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
  .hero {
    .hero__container {
      h1 {
        font-size: 1.75rem;
      }
      p {
        font-size: 1rem;
      }
    }
  }
}
</style>
