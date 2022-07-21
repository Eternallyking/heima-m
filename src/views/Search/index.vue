<template>
  <div class="app-bac">
    <form action="/">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visiblesearchsuggestion"
        background="#3296fa"
        class="search"
      />
    </form>
    <component
      :is="componentName"
      :keyword="keyword"
      @valueword="valuewordfn"
    ></component>
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  data() {
    return {
      keyword: '',
      isshowsearchresult: false
    }
  },
  computed: {
    componentName() {
      if (this.keyword.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isshowsearchresult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  methods: {
    onSearch() {
      this.isshowsearchresult = true
    },
    onCancel() {
      this.$router.go(-1)
    },
    visiblesearchsuggestion() {
      this.isshowsearchresult = false
    },
    valuewordfn(item) {
      this.keyword = item
      this.isshowsearchresult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
.app-bac {
  background-color: #f5f7f9;
  height: calc(100vh);
}
</style>
