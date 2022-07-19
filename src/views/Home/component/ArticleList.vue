<template>
  <div>
    <van-pull-refresh
      v-model="refreshingloading"
      @refresh="loadnextlist"
      success-text="刷新成功~"
    >
      <van-list
        @load="loadnextlist"
        offset="1"
        :finished="isfinished"
        v-model="loading"
        finished-text="没有更多了~~~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in articlelist"
          :key="item.art_id"
          :articleinfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getarticlelist } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  data() {
    return {
      articlelist: [],
      pre_timestamp: '',
      isfinished: false,
      loading: false,
      error: false,
      refreshingloading: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  created() {
    this.getarticlelist()
  },
  methods: {
    async getarticlelist() {
      try {
        const { data } = await getarticlelist(this.id, +new Date())
        this.articlelist = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请刷新重试')
        }
      }
    },
    async loadnextlist() {
      try {
        const { data } = await getarticlelist(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.isfinished = true
        }
        if (this.refreshingloading) {
          this.articlelist.unshift(...data.data.results)
        } else {
          this.articlelist.push(...data.data.results)
        }
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshingloading = false
      }
    }
  }
}
</script>

<style></style>
