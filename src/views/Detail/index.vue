<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
    />
    <div>
      <div class="main">
        <div class="main-title">
          <h1>{{ newsdetail.title }}</h1>
          <div class="author">
            <div class="avator">
              <van-image
                width="38"
                height="38"
                round
                :src="newsdetail.aut_photo"
              />
            </div>
            <div class="text">
              <div class="name">{{ newsdetail.aut_name }}</div>
              <div class="time">3年前</div>
            </div>
            <div class="follow">
              <!-- <button></button> -->
              <van-button
                type="info"
                :loading="concernloading"
                round
                @click="concernusersfn(newsdetail.aut_id)"
                v-if="!concernloading"
              >
                <span class="add">＋</span>
                <span class="followtext">关注</span>
              </van-button>
              <van-button
                type="info"
                :loading="!concernloading"
                round
                @click="Cancelconcernusersfn(newsdetail.aut_id)"
                v-else
                style="background-color: #fff; border: 0.02667rem solid #ebedf0"
              >
                <span class="followtext" style="color: #323233">已关注</span>
              </van-button>
            </div>
          </div>
        </div>
        <div class="main-text">
          <div
            class="article-content markdown-body"
            style="padding: 0 0.4rem"
            v-html="newsdetail.content"
          ></div>
          <!-- style="font-size: 0.21333rem" -->
        </div>
        <div>
          <van-divider>正文结束</van-divider>
        </div>
        <div>
          <div class="comment" v-for="item in commentslist" :key="item.com_id">
            <div class="avatar">
              <!-- < img :src="item.aut_photo" alt="" /> -->
              <van-image round :src="item.aut_photo" />
            </div>
            <div class="rightside">
              <div class="firstline">
                <span class="username">{{ item.aut_name }}</span>
                <span class="toutiao toutiao-dianzan"
                  ><span class="support-left">赞</span></span
                >
              </div>
              <div>{{ item.content }}</div>
              <div class="thirdline">
                <span class="lasttime">{{ item.pubdate }}</span
                ><button class="btn-return">回复{{ item.reply_count }}</button>
              </div>
            </div>
          </div>
          <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list> -->
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="left">
        <van-button class="content" @click="isreview = !isreview"
          >写评论</van-button
        >
        <van-action-sheet v-model="isreview" :round="false">
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
          <van-button @click="publishfn">发布</van-button>
        </van-action-sheet>
      </div>

      <div class="right">
        <div class="icon">
          <div class="num">{{ newsdetail.comm_count }}</div>
          <van-icon name="comment-o" />
        </div>
        <div class="icon">
          <van-icon
            v-if="!iscollection"
            name="star-o"
            @click="collectionfn(newsdetail.art_id)"
          />
          <van-icon
            v-else
            name="star"
            class="collection-bgc"
            @click="Cancelcollectionfn(newsdetail.art_id)"
          />
        </div>
        <div class="icon">
          <van-icon name="good-job-o" />
        </div>
        <div class="icon"><van-icon name="share" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/index.css'
import {
  getnewsdetail,
  concernusers,
  Cancelconcernusers,
  newThumbsup,
  CancelnewThumbsup,
  getcomments
} from '@/api'
export default {
  data() {
    return {
      newsdetail: {},
      concernloading: false,
      mutual_follow: false,
      iscollection: false,
      isreview: false,
      message: '',
      commentslist: []
    }
  },
  created() {
    this.getnewsdetail()
  },
  methods: {
    async getnewsdetail() {
      const res = await getnewsdetail(this.$route.query.id)
      this.newsdetail = res.data.data
      this.concernloading = this.newsdetail.is_followed
      this.iscollection = this.newsdetail.is_collected
      const { data } = await getcomments('a', this.newsdetail.art_id)
      this.commentslist = data.data.results
    },
    async concernusersfn(id) {
      await concernusers(id)
      this.concernloading = !this.concernloading
    },
    async Cancelconcernusersfn(id) {
      await Cancelconcernusers(id)
      this.concernloading = !this.concernloading
    },
    async collectionfn(id) {
      try {
        const res = await newThumbsup(id)
        this.iscollection = !this.iscollection
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    async Cancelcollectionfn(id) {
      const res = await CancelnewThumbsup(id)
      this.iscollection = !this.iscollection
      console.log(res)
    },
    publishfn() {
      console.log(1)
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
:deep(.main) {
  margin-top: 50px;
  margin-bottom: 120px;
  .main-title {
    margin-top: 50px;
    padding: 50px 0;
    width: 100%;
    h1 {
      font-size: 0.53333rem;
      padding: 0.66667rem 0.42667rem;
      margin: 0;
      color: #3a3a3a;
    }
    .author {
      display: flex;
      width: 100%;
      height: 90px;
      .avator {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 1;
        height: 100%;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 3.5;
        height: 100%;
        font-size: 20px;
        .name {
          margin-left: 22px;
        }
        .time {
          margin-left: 22px;
          color: #b7b7b7;
        }
      }
      .follow {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 2;
        height: 100%;
        .van-button {
          width: 2.26667rem;
          height: 0.77333rem;
          border-radius: 31px;
          background-color: #3296fa;
          font-size: 14px;
          color: #fff;
          border: none;
          .van-button__text {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .add {
            padding-bottom: 8px;
            font-size: 0.63rem;
            font-weight: 100;
          }
        }
      }
    }
  }
}
.footer {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  display: flex;
  border-top: 1px solid #d8d8d8;
  .left {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: pink;
    .content {
      width: 278px;
      height: 46px;
      border: 1px solid #eee;
      border-radius: 23px;
      text-align: center;
      line-height: 46px;
      font-size: 30px;
      color: #a7a7a7;
    }
  }
  .right {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex: 1.2;
    text-align: center;
    // background-color: blue;
    .icon {
      flex: 1;
      position: relative;
      .num {
        position: absolute;
        top: -6px;
        right: 16px;
        width: 28px;
        height: 28px;
        background-color: #e22829;
        border-radius: 50%;
        text-align: center;
        line-height: 28px;
        font-size: 24px;
        color: #fff;
        z-index: 1;
      }
      .van-icon {
        font-size: 40px;
        color: #777;
      }
    }
  }
}
:deep(.collection-bgc) {
  color: rgb(50, 150, 250) !important;
}
:deep(.van-action-sheet) {
  .van-action-sheet__content {
    display: flex;
  }
  padding: 32px;
  .van-field {
    background-color: #f5f7f9;
  }
  .van-button {
    padding-right: 60px;
    border: 0;
    margin: auto 0;
    width: 25%;
    color: #6ba3d8;
    text-align: center;
  }
}
.comment {
  width: 100%;
  display: flex;
  font-size: 0.42667rem;
  margin-bottom: 40px;
  .avatar {
    width: 72px;
    height: 72px;
    // background-color: pink;
    margin-right: 30px;
    margin-left: 30px;
    .van-image {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
      }
    }
  }
  .rightside {
    width: 100%;
    height: 196px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // background-color: blue;
    flex: 1;
    .firstline {
      display: flex;
      justify-content: space-between;
      .username {
        color: #406599;
        font-size: 0.34667rem;
      }
      .toutiao-dianzan {
        margin-right: 40px;
        &::before {
          font-size: 30px;
        }
      }
    }
    .thirdline {
      .lasttime {
        font-size: 0.25333rem;
        color: #222;
        margin-right: 30px;
      }
      .btn-return {
        width: 130px;
        height: 44px;
        line-height: 1;
        text-align: center;
        background-color: #ffffff;
        border: solid 1px #eee;
        border-radius: 30px;
        font-size: 0.28rem;
      }
    }
  }
}
.support-left {
  margin-left: 10px;
}
</style>
