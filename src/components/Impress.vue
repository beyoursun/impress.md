<template>
  <div
    id="impress"
    :data-transition-duration="transitionDuration"
    :data-perspective="perspective">
    <slot></slot>
  </div>
</template>

<script>
import '../assets/js/impress'

export default {
  props: {
    transitionDuration: {
      type: Number,
      default: 1000
    },
    perspective: {
      type: Number,
      default: 1000
    }
  }
}
</script>
