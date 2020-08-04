<template>
  <div class="select-language-component">
    <ul class="lang-list">
      <li
      v-for="lang in $ml.list"
      :key="lang"
      @click="change_lang(lang)">
        <img :src="get_flag_path(lang)" :alt="lang" :title="$ml.get('languages.' + lang)">
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SelectLanguage',
  methods: {
    get_flag_path(lang) {
      return require('@/assets/images/flags/' + lang + '.svg')
    },
    change_lang(lang) {
      this.$ml.change(lang)
      document.title = this.$ml.get('pages.' + localStorage.getItem('current_page'))
    }
  }
}
</script>
