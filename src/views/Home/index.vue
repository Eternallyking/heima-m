<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round to="/search"
          ><van-icon name="search" /> 搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in mychannels" :key="item.id"
        ><ArticleList :id="item.id"></ArticleList
      ></van-tab>
      <i class="toutiao toutiao-gengduo" @click="$refs.popup.isshow = true"></i>
    </van-tabs>
    <EditChannel
      ref="popup"
      :mychannels="mychannels"
      @delmy-channel="delmychannel"
      @change-channel="changechannelfn"
      @add-channel="addchannelfn"
    ></EditChannel>
  </div>
</template>

<script>
import {
  getmychannels,
  getmychannelsbylocal,
  setmychannelstolocal,
  DelMyChannel,
  AddMyChannel
} from '@/api'
import ArticleList from './component/ArticleList'
import EditChannel from './component/EditChannel.vue'
export default {
  data() {
    return {
      active: 0,
      mychannels: []
    }
  },
  components: {
    ArticleList,
    EditChannel
  },
  created() {
    this.getmychannels()
  },
  methods: {
    async getmychannels() {
      try {
        if (!this.$store.state.user.token) {
          if (getmychannelsbylocal()) {
            this.mychannels = getmychannelsbylocal()
          } else {
            const { data } = await getmychannels()
            this.mychannels = data.data.channels
          }
        } else {
          const { data } = await getmychannels()
          this.mychannels = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    async delmychannel(id) {
      this.mychannels = this.mychannels.filter((item) => item.id !== id)
      if (!this.$store.state.user.token) {
        console.log(1)
        setmychannelstolocal(this.mychannels)
      } else {
        try {
          const { data } = await DelMyChannel(id)
          console.log(data)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    changechannelfn(active) {
      this.active = active
    },
    async addchannelfn(item) {
      this.mychannels.push(item)
      if (!this.$store.state.user.token) {
        setmychannelstolocal(this.mychannels)
      } else {
        try {
          await AddMyChannel(item.id, this.mychannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}
:deep(.van-tabs__content) {
  margin-bottom: 100px;
}
/* 字体图标 */
.toutiao-gengduo {
  z-index: 99;
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
