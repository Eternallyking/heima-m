<template>
  <div>
    <router-view></router-view>
    <van-tabbar class="tab-bar" route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
          <p>首页</p>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
          <p>视频</p>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
          <p>问答</p>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
          <p>{{ $store.state.user.token ? '我的' : '未登录' }}</p>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.tab-bar {
  text-align: center;
  :deep(.van-tabbar-item) {
    margin-top: 20px;
  }
  :deep(.toutiao) {
    font-size: 0.53333rem;
  }
  p {
    font-size: 12px;
  }
}
</style>
