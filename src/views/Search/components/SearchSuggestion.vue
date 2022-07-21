<template>
  <div>
    <van-cell
      v-for="(item, index) in hightlight"
      :key="index"
      @click="valueword(item)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title><span v-html="item"></span></template>
    </van-cell>
  </div>
</template>

<script>
import { getsearchsuggestion } from '@/api'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler() {
        this.getsearchsuggestion()
      }
    }
  },
  methods: {
    async getsearchsuggestion() {
      try {
        const res = await getsearchsuggestion(this.keyword)
        this.suggestions = res.data.data.options.filter(Boolean)
        if (this.suggestions.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
      } catch (error) {
        console.log(error)
      }
    },
    valueword(item) {
      const span1 = '<span style="color:red">'
      const span2 = '</span>'
      item = item
        .replace(new RegExp(span1, 'g'), '')
        .replace(new RegExp(span2, 'g'), '')
      this.$emit('valueword', item)
    }
  },
  computed: {
    hightlight() {
      const reg = new RegExp(this.keyword, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (e) => `<span style="color:red">${e}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding: 10px;
}
</style>
