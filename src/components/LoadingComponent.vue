<template>
  <div class="loading" :class="{ 'body--dark': $q.dark.isActive }">
    <h2>Wczytywanie..</h2>
    <div class="spinner">
      <div class="mask">
        <div class="maskedCircle"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoadingComponent extends Vue {}
</script>
<style lang="scss" scoped>
.loading {
  padding: 16vh 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  h2 {
    font-size: 1.75rem;
  }
  .spinner {
    margin-top: 20px;
    width: 26px;
    height: 26px;
    animation: spin 1s infinite linear;
    .mask {
      width: 12px;
      height: 12px;
      overflow: hidden;
      .maskedCircle {
        width: 20px;
        height: 20px;
        border-radius: 12px;
        border: 3px solid black;
      }
    }
  }
}
@media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
  .loading {
    padding-top: 20vh;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
