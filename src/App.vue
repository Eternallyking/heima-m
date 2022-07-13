<template>
  <div>
    <router-view></router-view>
  </div>
</template>
// 移动端适配 // 1. rem动态 // - amfe-flexible // - 不管处于什么分辨率,
1rem始终是 1/10视口大小 // 2. 将px --> rem // - postcss-pxtorem // - vant官网 //
- 版本是5.1.1
<script>
import request from '@/utils/request'
export default {
  created() {
    console.dir(request)
  }
}
</script>

<style scoped></style>
