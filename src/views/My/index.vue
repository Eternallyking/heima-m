<template>
  <div class="my">
    <header>
      <div v-if="islogin" class="user-info banner">
        <van-row></van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userlist.photo"
                style="border: solid 1px #fff"
              />
              <span class="mobile">{{ userlist.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button
                size="mini"
                class="code-btn"
                round
                native-type="button"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userlist.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userlist.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userlist.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userlist.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div v-else class="login-register banner">
        <div class="warp" @click="gologin">
          <img src="../../assets/images/mobile.png" alt="" />
          <p>登录 / 注册</p>
        </div>
      </div>
    </header>
    <main>
      <van-grid column-num="2" clickable class="grid">
        <van-grid-item text="收藏">
          <template #icon>
            <i class="toutiao toutiao-shoucang"></i>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <i class="toutiao toutiao-lishi"></i>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell is-link title="消息通知" />
        <van-cell is-link title="小智同学" />
      </div>
    </main>
    <van-button v-if="islogin" block class="login-btn" @click="logout"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getuserinfo } from '@/api'
export default {
  data() {
    return {
      userlist: []
    }
  },
  computed: {
    islogin() {
      return !!this.$store.state.user.token
    }
  },
  created() {
    this.getuserinfo()
  },
  methods: {
    gologin() {
      this.$router.push('/login')
    },
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          this.$store.commit('setuser', {})
        })
        .catch(() => {})
    },
    async getuserinfo() {
      if (this.islogin) {
        try {
          const {
            data: { data }
          } = await getuserinfo()
          this.userlist = data
        } catch (error) {
          this.$toast.fail('请重新登录')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    font-size: 0.34667rem;
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 50px);
  .login-btn {
    :deep(.van-button__text) {
      color: red;
    }
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .warp {
    text-align: center;
    img {
      width: 132px;
      height: 132px;
    }
    p {
      margin: 0;
      color: #fff;
      font-size: 0.37333rem;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin: 10px 0;
  }
}
</style>
