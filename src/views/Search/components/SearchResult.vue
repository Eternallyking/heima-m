<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        :title="item.title"
        v-for="item in resultlist"
        :key="item.art_id"
      />
    </van-list>
  </div>
</template>

<script>
import { getsearchresult } from '@/api'
import store from '@/utils/storage'
export default {
  data() {
    return {
      resultlist: [],
      loading: false,
      finished: false,
      page: 1,
      error: false,
      historylist: store.get('historylist') || []
    }
  },
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  created() {
    this.getsearchresult()
    this.gethistorylist()
  },
  methods: {
    gethistorylist() {
      const index = this.historylist.findIndex((e) => e === this.keyword)
      if (index >= 0) {
        this.historylist.splice(index, 1)
      }
      this.historylist.unshift(this.keyword)
      store.set('historylist', this.historylist)
    },
    async getsearchresult() {
      try {
        const res = await getsearchresult(this.keyword, this.page)
        this.resultlist = res.data.data.results.filter(Boolean)
      } catch (error) {
        this.error = true
      }
    },
    async onLoad() {
      try {
        this.page++
        const res = await getsearchresult(this.keyword, this.page)
        if (res.data.data.results.filter(Boolean).length === 0) {
          this.finished = true
        }
        this.resultlist.push(...res.data.data.results.filter(Boolean))
        this.loading = false
      } catch (error) {
        this.error = true
      }
    }
  }
}
</script>

<style></style>
