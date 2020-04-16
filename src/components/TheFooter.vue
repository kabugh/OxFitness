<template>
  <footer>
    <div class="footer__container">
      <div class="copyrights">
        <img src="@/assets/ox.png" alt="logo" />
        <p>Copyright &copy; 2020 OxFitness. Wszelkie prawa zastrzeżone.</p>
      </div>
      <div class="termsOfUse">
        <p>Polityka prywatności</p>
        <p>Warunki korzystania</p>
      </div>
    </div>
  </footer>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
export default class TheFooter extends Vue {}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
footer {
  padding: 8vh 4vh;
  .footer__container {
    @include flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    .copyrights {
      @include flex;
      align-items: center;
      flex-direction: column;
      p {
        padding: 2vh;
      }
      img {
        min-width: 10vw;
        max-width: 50vw;
        min-height: 5vh;
        max-height: 15vh;
      }
    }
    .termsOfUse {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(2, 1fr);
      p {
        margin: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
