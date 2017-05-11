<template>
  <impress>
    <step
      v-for="(item, index) in slides"
      v-html="item.content"
      :x="item.x"
      :y="item.y"
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
    this.$http.get('/md').then(response => {
      this.slides = response.data.split('[slide]\n').map((item, index) => ({
        x: index * 1000,
        y: 0,
        content: md.render(item)
      }))

      this.$nextTick(() => {
        impress().init()
      })
    })
  }
}
</script>

<style>
body { background-color: #f2f2f2; }

.slide {
  opacity: .3;
  width: 900px;
  height: 700px;
  padding: 40px 60px;
  box-sizing: border-box;
  background-color: #fff;
  transition: all .5s;
}

.slide.active { opacity: 1; }
</style>
