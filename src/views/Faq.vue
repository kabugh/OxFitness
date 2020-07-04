<template>
  <section class="faq topView">
    <div class="hero">
      <h1>Najczęściej zadawane pytania</h1>
    </div>
    <div class="faq__container container" v-if="faqItems.length > 0">
      <div class="faq__wrapper" v-for="(item, index) in faqItems" :key="index">
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
    <LoadingComponent v-else></LoadingComponent>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadingComponent from "../components/LoadingComponent.vue";
@Component({
  components: { LoadingComponent }
})
export default class Faq extends Vue {
  created() {
    this.$store.dispatch("fetchFaq");
  }

  get faqItems() {
    return this.$store.getters.faqItems;
  }

  get loading() {
    return this.$store.getters.loading;
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.faq {
  .hero {
    @include flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30vh;
    padding: 4vh;
    background-color: #958efa;
    color: white;
    h1 {
      font-size: 1.75rem;
      font-weight: bolder;
      text-align: center;
      text-transform: uppercase;
    }
  }
  .faq__container {
    padding: 6vh;
    .faq__wrapper {
      @include flex;
      flex-direction: column;
      padding-top: 4vh;
      h2 {
        font-size: 1.5rem;
        font-weight: bolder;
        text-align: center;
        padding-bottom: 4vh;
      }
    }
  }
}
</style>
