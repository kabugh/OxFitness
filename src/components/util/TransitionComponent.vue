<template>
  <div>
    <transition :name="transition" :mode="mode">
      <slot></slot>
    </transition>
    <div class="pageTransition left transition-right"></div>
    <div class="pageTransition right transition-left"></div>
  </div>
</template>

<script>
export default {
  name: "vue-page-transition",
  props: ["name"],
  data() {
    return {
      transition: "transition-left-full",
      mode: "out-in"
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.transition = to.meta.transition
        ? to.meta.transition
        : this.$props.name;
      next();
    });
  }
};
</script>
<style lang="scss">
:root {
  --overlay-bg: #6b108e;
  --transition-duration: 0.4s;
}
.pageTransition {
  background-color: var(--overlay-bg);
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  transform: translateX(100vw); // maybe use 100% - in case of wide scrollbar?
  background: var(--overlay-bg);
  transition-duration: var(--transition-duration);
  z-index: 200;
  &.left {
    right: 0;
  }
  &.right {
    left: 0;
  }
}
@import "@/assets/styles/transitions/transition-right-full";
@import "@/assets/styles/transitions/transition-left-full";
</style>
