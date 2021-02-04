<template>
  <section class="faq topView">
    <div class="faq__hero">
      <h1>Najczęściej zadawane pytania</h1>
    </div>
    <div class="faq__container container" v-if="faqItems.length > 0">
      <div class="faq__nav--container">
        <ul class="faq__nav--wrapper">
          <li
            class="faq__nav--item"
            v-for="(title, index) in faqTitles"
            :class="{ active: activeFaqIndex == index }"
            @click="updateActiveFaq(index)"
            :key="title"
          >
            {{ title }}
          </li>
        </ul>
      </div>
      <div class="faq__items--container">
        <div
          class="faq__wrapper"
          v-for="(item, index) in faqItems"
          :key="index"
          :class="`faqList-${index}`"
        >
          <h2>{{ item.title }}</h2>
          <q-list bordered>
            <q-expansion-item
              group="accordion"
              icon="explore"
              :label="element.fields.question"
              header-class="text-black"
              v-for="(element, i) in item.faq"
              :key="i"
            >
              <q-card>
                <q-card-section>
                  <p>{{ element.fields.answer }}</p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator />
          </q-list>
        </div>
      </div>
    </div>
    <LoadingComponent v-else></LoadingComponent>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadingComponent from "../components/LoadingComponent.vue";
import IFaqItem from "../typings/IFaqItem";
import VueScrollTo from "vue-scrollto";

@Component({
  components: { LoadingComponent }
})
export default class Faq extends Vue {
  created() {
    this.$store.dispatch("fetchFaq");
  }

  activeFaqIndex = 0;

  get faqItems() {
    return this.$store.getters.faqItems;
  }

  get faqTitles() {
    return this.faqItems.map((item: IFaqItem) => item.title);
  }

  updateActiveFaq(index: number) {
    if (this.activeFaqIndex != index) this.activeFaqIndex = index;

    this.$scrollTo(`.faqList-${index}`, { offset: -80 });
  }

  get loading() {
    return this.$store.getters.loading;
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.faq {
  @media (max-width: 450px) {
    &.topView {
      padding-top: 8vh;
    }
  }
  .faq__hero {
    @include flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40vh;
    padding: 4vh;
    background-color: $primary;
    color: white;
    h1 {
      font-size: 1.75rem;
      font-weight: bolder;
      text-align: center;
    }
  }
  .faq__container {
    padding: 6vh;
    margin: 0 auto;
    .faq__wrapper {
      @include flex;
      flex-direction: column;
      padding-top: 4vh;
      &:first-of-type {
        padding-top: 0;
      }
      h2 {
        font-size: 2.25rem;
        font-weight: 700;
        text-align: left;
        padding-bottom: 4vh;
      }
    }
    .faq__nav--container {
      .faq__nav--wrapper {
        @include flex;
        flex-direction: column;
        .faq__nav--item {
          position: relative;
          padding: $verticalPadding / 8 $verticalPadding / 2;
          padding-left: $verticalPadding;
          font-size: 1.25rem;
          color: $text-teritary;
          &:hover {
            color: $text-secondary;
            cursor: pointer;
          }
          &::before {
            content: "";
            display: block;
            width: 20px;
            height: 4px;
            background-color: $text-teritary;
            transition: all 0.2s ease-in-out;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
          }
          &.active {
            color: $text;
            font-weight: 500;

            &::before {
              background-color: $text;
            }
          }
        }
      }
    }
  }

  @media (min-width: 360px) {
    .faq__hero {
      height: 40vh;
      h1 {
        font-size: 2.25rem;
      }
    }
  }

  @media (min-width: 450px) {
    .faq__hero {
      height: 40vh;
      h1 {
        font-size: 3rem;
      }
    }
    .faq__container {
      .faq__wrapper {
        h2 {
          font-size: 2.75rem;
        }
      }
    }
  }
  @media (min-width: 768px) {
    .faq__container {
      max-width: 60vw;
    }
  }
  @media (min-width: 1268px) {
    .faq__container {
      flex-direction: row;
      max-width: 90vw;
      position: relative;
      .faq__nav--container {
        display: flex;
        flex: 1;
        position: relative;

        .faq__nav--wrapper {
          position: absolute;
          justify-content: flex-start;
          align-items: flex-start;
        }
      }
      .faq__items--container {
        @include flex;
        flex-direction: column;
        flex: 2;
      }
    }
  }
  @media (min-width: 1850px) {
    .faq__container {
      max-width: 60vw;
    }
  }
}
.body--dark .faq .faq__container {
  .faq__nav--container {
    .faq__nav--wrapper {
      .faq__nav--item {
        &.active {
          color: $text-dark;
          &::before {
            background-color: $text-dark;
          }
        }
      }
    }
    .faq__wrapper .q-list .q-expansion-item .q-item__label {
      color: $text-dark;
    }
  }
  .faq__items--container
    .faq__wrapper
    .q-list
    .q-expansion-item
    .q-expansion-item__container
    .q-item
    .q-item__section
    .q-item__label {
    color: $text-dark !important;
  }
}
</style>
