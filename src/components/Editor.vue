<template>
  <div id="editor">
    <textarea
      id="editor-left"
      :value="input"
      @input="update">
    </textarea>
    <article id="editor-right" class="markdown-body">
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
import '../assets/css/index.css'
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

#editor {
  display: flex;
  align-item: stretch;
}
#editor-left,
#editor-right {
  flex-grow: 1;
  flex-basis: 0;
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
</style>
