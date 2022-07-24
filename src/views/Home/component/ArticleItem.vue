<template>
  <div @click="newsdetail">
    <van-cell
      v-if="articleinfo.cover.type === 0"
      :title="articleinfo.title"
      :label="articledesc"
    />
    <van-cell
      v-if="articleinfo.cover.type === 1"
      :title="articleinfo.title"
      :label="articledesc"
      ><van-image width="3rem" height="2rem" :src="articleinfo.cover.images[0]"
    /></van-cell>
    <van-cell
      v-if="articleinfo.cover.type === 3"
      :title="articleinfo.title"
      :label="articledesc"
      ><template #label>
        <div>
          <van-image
            v-for="(item, index) in articleinfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <span>{{ articledesc }}</span></template
      ></van-cell
    >
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleinfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articledesc() {
      return `${this.articleinfo.aut_name} ${
        this.articleinfo.comm_count
      }评论 ${dayjs(this.articleinfo.pubdate).fromNow()}`
    }
  },
  methods: {
    newsdetail() {
      this.$router.push({
        path: '/detail/' + this.articleinfo.art_id
        // query: {
        //   id: this.articleinfo.art_id
        // }
      })
    }
  }
}
</script>

<style></style>
