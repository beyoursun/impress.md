<template>
  <div id="editor">
    <textarea :value="input" @input="update"></textarea>
    <article class="markdown-body">
      <impress>
        <step v-for="(item, index) in slides" v-html="item" :key="index"></step>
      </impress>
    </article>
  </div>
</template>

<script>
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'
import Impress from './Impress.vue'
import Step from './Step.vue'

let md = new MarkdownIt({
  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
      } catch (__) {}
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

export default {
  components: { Impress, Step },
  data () {
    return {
      input: '# markdown-it rulezz!'
    }
  },
  computed: {
    compiledMarkdown () {
      return md.render(this.input)
    },
    slides () {
      return this.input.split('[slide]').map(item => md.render(item))
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  }
}
</script>

<style>
html, body, #editor {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

textarea, #editor article {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

#editor article { position: relative; }
</style>
