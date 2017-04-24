<template>
  <div
    class="step"
    :data-x="x"
    :data-y="y"
    :data-scale="scale"
    :data-rotate="rotate">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    x: Number,
    y: Number,
    scale: Number,
    rotate: Number
  }
}
</script>

<style>
.step {
  width: 90%;
}
</style>
