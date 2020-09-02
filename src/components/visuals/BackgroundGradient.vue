<template>
  <canvas ref="canvas" class="bgGradient" width="32" height="32"></canvas>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class BackgroundGradient extends Vue {
  @Prop() width!: number;
  @Prop() height!: number;
  rgb = "";
  t = 0;

  mounted() {
    this.startAnimation();
  }

  color = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    g: number,
    b: number
  ) => {
    if (context) {
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillRect(x, y, 10, 10);
    }
  };

  R = (x: number, y: number, t: number) =>
    Math.floor(200 + 50 * Math.cos((x * x - y * y) / 300 - t));

  G = (x: number, y: number, t: number) =>
    Math.floor(
      80 +
        30 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
    );

  B = (x: number, y: number, t: number) =>
    Math.floor(
      210 +
        46 *
          Math.sin(
            5 * Math.sin(t / 9) +
              ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
          )
    );

  startAnimation = () => {
    const canvas: HTMLCanvasElement | any = this.$refs.canvas;
    let context: CanvasRenderingContext2D;
    if (canvas) context = canvas.getContext("2d");
    else context = null as any;
    for (let x = 0; x <= 30; x++) {
      for (let y = 0; y <= 30; y++) {
        this.color(
          context,
          x,
          y,
          this.R(x, y, this.t),
          this.G(x, y, this.t),
          this.B(x, y, this.t)
        );
      }
    }
    this.t = this.t + 0.03;
    window.requestAnimationFrame(this.startAnimation);
  };
}
</script>
<style lang="scss"></style>
