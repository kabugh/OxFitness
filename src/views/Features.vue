<template>
  <section class="features topView">
    <div class="features__container container">
      <img
        src="@/assets/illustrations/fitness1.svg"
        class="illustration unselectable"
        v-if="features.length > 0"
        loading="lazy"
      />
      <div class="articles__container" v-if="features.length > 0">
        <article class="article__container">
          <h1>Czym jest Ox Fitness?</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </article>
        <article
          class="article__container"
          v-for="(feature, index) in features[0].workoutDescription"
          :key="index"
        >
          <h2>{{ feature.fields.title }}</h2>
          <RichTextRenderer :document="feature.fields.description" />
        </article>
      </div>
      <img
        src="@/assets/illustrations/fitness2.svg"
        class="illustration unselectable"
        v-if="features.length > 0"
        loading="lazy"
      />
      <div class="accessories__container" v-if="features.length > 0">
        <article
          class="accessory__container"
          v-for="(accessory, i) in features[0].accessoryDescription"
          :key="i"
        >
          <div class="title__container">
            <div
              class="icon"
              :style="{
                backgroundImage: `url(${accessory.fields.icon.fields.file.url})`
              }"
            ></div>
            <h2>{{ accessory.fields.title }}</h2>
          </div>
          <RichTextRenderer :document="accessory.fields.description" />
        </article>
      </div>
      <img
        src="@/assets/illustrations/fitness4.svg"
        class="illustration unselectable"
        v-if="features.length > 0"
        loading="lazy"
      />
      <div class="additionalInfo__container" v-if="features.length > 0">
        <h2>
          Masz pytania? Sprawdź sekcję
          <span class="faq" @click="$router.push('/faq')">FAQ</span>
          lub skontaktuj się z nami.
        </h2>
      </div>
      <LoadingComponent v-else></LoadingComponent>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadingComponent from "../components/LoadingComponent.vue";
import RichTextRenderer from "contentful-rich-text-vue-renderer";

@Component({
  components: { RichTextRenderer, LoadingComponent }
})
export default class Features extends Vue {
  created() {
    this.$store.dispatch("fetchFeatures");
  }

  get features() {
    return this.$store.getters.features;
  }

  get loading(): boolean {
    return this.$store.getters.loading;
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.features {
  .features__container {
    display: grid;
    grid-row-gap: 8vh;
    .illustration {
      max-width: 60vw;
      margin: 0 auto;
    }
    .articles__container,
    .accessories__container {
      display: grid;
      grid-gap: 4vh;
      justify-content: center;
      align-items: center;
      .article__container,
      .accessory__container {
        h1 {
          font-size: 1.75rem;
          font-weight: bolder;
        }
        h2 {
          font-size: 1.5rem;
          font-weight: bolder;
        }
        .title__container {
          display: flex;
          align-items: center;
          .icon {
            width: 64px;
            height: 64px;
            @include backgroundDefault;
            background-size: 100%;
          }
          h2 {
            margin-left: 20px;
            font-size: 1.25rem !important;
            font-weight: bolder;
          }
        }
        p {
          font-size: 1rem;
          padding: 2vh 0;
          line-height: 1.75;
          letter-spacing: normal;
          text-align: left;
          span {
            font-weight: bolder;
          }
        }
      }
    }
    .additionalInfo__container {
      h2 {
        font-size: 1rem;
        font-weight: bolder;
        span {
          text-decoration: underline;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
