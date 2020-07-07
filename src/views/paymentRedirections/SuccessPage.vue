<template>
  <section class="successPage">
    <div class="success__container">
      <img
        src="@/assets/illustrations/success.svg"
        class="illustration unselectable"
        loading="lazy"
        data-aos="fade-in"
        data-aos-delay="500"
      />
      <div class="text__container">
        <h1 class="title">
          <span>Hej, teraz jesteś</span>
          <span>częścią naszego community!</span>
        </h1>

        <h2 class="title">
          <span
            >Kliknij
            <router-link tag="a" class="highlighted" to="/dashboard" replace
              >tutaj</router-link
            >
            aby</span
          >
          <span>powrócić do aplikacji OxFitness</span>
          <span>i rozpocząć przygodę z treningami.</span>
        </h2>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default class SuccessPage extends Vue {}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.successPage {
  width: 100%;
  height: 100vh;
  background-color: #958efa;
  .success__container {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    padding: 6vh 6vw;
    .illustration {
      max-width: 70%;
      margin: 0 auto;
    }
    .text__container {
      margin: 4vh 0;
      position: relative;
      text-align: center;
      h1,
      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        text-transform: uppercase;
        span {
          width: 100%;
          float: left;
          color: white;
          transform: translateY(-50px);
          opacity: 0;
          animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
          animation-duration: 3s;
        }
      }
      h1 span {
        animation-name: titleAnimation;
        animation-delay: 0.6s;
        animation-fill-mode: forwards;
        -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
        clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
        &:first-child {
          animation-delay: 0.7s;
        }
        &:last-child {
          animation-delay: 0.5s;
        }
      }

      h2 {
        top: 0;
        position: absolute;
        span {
          animation-name: halfTitleAnimation;
          animation-delay: 4.1s;
          animation-fill-mode: forwards;

          &:first-child {
            animation-delay: 4.2s;
          }
          &:last-child {
            animation-delay: 4s;
          }
        }
      }
      .highlighted {
        text-decoration: underline;
        color: white;
        &:hover {
          cursor: pointer;
        }
      }
      @keyframes titleAnimation {
        0% {
          transform: translateY(-50px);
          opacity: 0;
          -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
          clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
        }
        20% {
          transform: translateY(0);
          opacity: 1;
          -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0%);
          clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0%);
        }
        80% {
          transform: translateY(0);
          opacity: 1;
          -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0%);
          clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0%);
        }
        100% {
          transform: translateY(50px);
          opacity: 0;
          -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
          clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
        }
      }
      @keyframes halfTitleAnimation {
        0% {
          transform: translateY(-50px);
          opacity: 0;
          -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
          clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
        }
        20% {
          transform: translateY(0);
          opacity: 1;
          -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0%);
          clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0%);
        }
        100% {
          transform: translateY(0);
          opacity: 1;
          -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0%);
          clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0%);
        }
      }
    }
    @media (min-width: 700px) {
      .illustration {
        max-width: 40%;
      }
      .text__container {
        h1,
        h2 {
          font-size: 2rem;
        }
      }
    }
  }
}
</style>
