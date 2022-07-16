<template>
  <div>
    <van-nav-bar title="登录" class="navbar" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <van-form @submit="login" ref="from" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobilerules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="coderules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isshowcountdown"
            format="ss s"
            :time="3 * 1000"
            @finish="isshowcountdown = false"
          />
          <van-button
            v-else
            size="mini"
            class="code-btn"
            round
            @click="sendfn"
            native-type="button"
            >发送验证码</van-button
          >
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
import { login, sendcode } from '@/api/user'
import { mobilerules, coderules } from './rules'
export default {
  name: 'login',
  data() {
    return {
      mobile: '',
      code: '',
      mobilerules,
      coderules,
      isshowcountdown: false
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async login() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        this.$store.commit('setuser', res.data.data)
        // console.log(res)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (e) {
        // this.$toast.fail('登录失败')
        const status = e.response.status
        let message = '登录错误，请刷新重试~'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(e.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登录错误，请刷新重试~')
        //     break
        //   default:
        //     this.$toast.fail('登录错误，请刷新重试~')
        //     break
        // }
      }
    },
    async sendfn() {
      try {
        await this.$refs.from.validate('mobile')
        await sendcode(this.mobile)
        this.isshowcountdown = true
      } catch (e) {
        // this.$toast.fail('手机号非法！')
        if (!e.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = e.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(e.response.data.message)
          }
        }
      }
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
