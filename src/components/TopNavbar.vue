<template>
  <nav class="topNavbar bg-grey-10" v-if="$route.meta.displayNav || isNavOpen">
    <div
      class="back__wrapper"
      v-if="$route.path !== '/' && $route.path !== '/dashboard'"
    >
      <div class="arrow" v-go-back.single></div>
      <div class="back" v-go-back.single>Powrót</div>
    </div>
    <ul v-else></ul>
    <div class="logo">
      <h3>OxFitness</h3>
    </div>
    <div class="burger__wrapper">
      <div
        class="nav-mobile"
        id="nav-icon"
        :class="{ open: isNavOpen }"
        @click="isNavOpen = !isNavOpen"
        v-if="!$route.meta.unauthenticatedAccess"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TopNavbar extends Vue {
  get isNavOpen() {
    return this.$store.getters.isNavOpen;
  }
  set isNavOpen(value) {
    this.$store.commit("setNav", value);
  }
}
</script>
<style lang="scss">
nav.topNavbar {
  width: 100%;
  min-height: 12vh;
  position: fixed;
  padding: 15px 6vw;
  z-index: 100;
  transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);
  -webkit-transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 700px) and (min-height: 1024px) {
    min-height: 6vh;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex: 1;
    li {
      padding: 0 5px;
      &:first-child {
        padding-left: 0;
      }
      a {
        img {
          width: 30px;
          height: 30px;
          transition: all 0.3s ease-in-out;
        }
        &:hover img {
          transform: scale(1.119) translateZ(0);
        }
      }
    }
  }
  .logo {
    width: 10vw;
    min-height: 4vh;
    color: white;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
    &:hover {
      cursor: pointer;
    }
    h3 {
      text-transform: uppercase;
      font-size: 18px;
      font-weight: bolder;
    }
  }
  .back__wrapper {
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    .arrow {
      background-image: url("../assets/icons/arrow.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 36px;
      height: 36px;
      margin-right: 15px;
      transform: rotate(180deg);
    }
    .arrow:hover,
    .back:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    @media (max-width: 700px) {
      .back {
        display: none;
      }
    }
  }
  .burger__wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    height: 100%;
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
      top: 8px;
      -webkit-transform-origin: left center;
      -moz-transform-origin: left center;
      -o-transform-origin: left center;
      transform-origin: left center;
    }
    #nav-icon span:nth-child(3),
    #nav-icon-static span:nth-child(3) {
      top: 16px;
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
}
</style>
