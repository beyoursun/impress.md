<template>
  <impress>
    <step id="bored" class="step slide" :x="-1000" :y="-1500">
      <q>Aren’t you just <b>bored</b> with all those slides-based presentations?</q>
    </step>
    <step
      v-for="(item, index) in slides"
      v-html="item"
      class="markdown-body slide"
      :key="index">
    </step>
  </impress>
</template>

<script>
import Impress from './Impress.vue'
import Step from './Step.vue'
import md from '../md'

export default {
  components: {
    Impress,
    Step
  },
  data () {
    return {
      slides: []
    }
  },
  created () {
    this.$http.get('http://localhost:3000/README.md').then(response => {
      this.slides = response.data.split('[slide]').map(item => md.render(item))
      this.$nextTick(() => {
        impress().init()
      })
    })
  }
}
</script>

<style>
.slide {
  width: 900px;
  height: 700px;
  padding: 40px 60px;
  box-sizing: border-box;
}
</style>
