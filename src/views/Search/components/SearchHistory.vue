<template>
  <div>
    <van-list>
      <van-cell title="搜索历史">
        <template #right-icon
          ><i
            class="toutiao toutiao-shanchu"
            @click="delflag = !delflag"
            v-if="delflag"
          ></i>
          <div v-else class="del-finished">
            <span @click="alldelfn">全部删除</span
            ><span @click="delflag = !delflag">完成</span>
          </div>
        </template>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in historylist"
        :key="index"
        @click="delfn(index, item)"
        ><template #right-icon
          ><van-icon
            name="close"
            class="toutiao-guanbi"
            v-if="!delflag" /></template
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import store from '@/utils/storage'
export default {
  data() {
    return {
      historylist: store.get('historylist') || [],
      delflag: true
    }
  },
  methods: {
    alldelfn() {
      store.remove('historylist')
      this.historylist = []
    },
    delfn(index, item) {
      if (!this.delflag) {
        this.historylist.splice(index, 1)
        store.set('historylist', this.historylist)
      } else {
        this.$emit('valueword', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.toutiao-shanchu) {
  &::before {
    font-size: 0.37333rem;
  }
}
.del-finished {
  font-size: 0.37333rem;
  color: #969799;
  span {
    margin-left: 10px;
  }
}
.toutiao-guanbi {
  color: #969799;
}
</style>
