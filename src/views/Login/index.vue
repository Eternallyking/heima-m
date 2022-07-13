<template>
  <div>
    <van-nav-bar title="登录" class="navbar" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <van-form @submit="login" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button size="mini" class="code-btn" round>发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="dl-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'login',
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async login() {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.from {
  .toutiao {
    font-size: 0.49333rem;
  }
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  :deep(.dl-btn) {
    background: #6db4fb;
    border: #6db4fb;
    border-radius: 0.13333rem !important;
  }
  .code-btn {
    background-color: #eee;
    color: #666;
    padding: 0 10px;
  }
}
</style>
