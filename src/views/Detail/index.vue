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
              <div class="time">{{ times(newsdetail.pubdate) }}</div>
            </div>
            <div class="follow">
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
        </div>
        <div>
          <van-divider>正文结束</van-divider>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoaddetail"
          :immediate-check="false"
        >
          <van-cell
            class="comment"
            v-for="item in commentslist"
            :key="item.com_id"
          >
            <div class="avatar">
              <van-image round :src="item.aut_photo" />
            </div>
            <div class="rightside">
              <div class="firstline">
                <span class="username">{{ item.aut_name }}</span>
                <span
                  class="toutiao toutiao-dianzan"
                  @click="clickCommentLike(item)"
                  :class="{ liking: item.is_liking }"
                  ><span style="margin-left: 0.125rem">{{
                    item.like_count !== 0 ? item.like_count : '赞'
                  }}</span></span
                >
              </div>
              <div>{{ item.content }}</div>
              <div class="thirdline">
                <span class="lasttime">{{ times(item.pubdate) }}</span
                ><button class="btn-return" @click="Replycommentsfn(item)">
                  回复{{ item.reply_count }}
                </button>
                <van-popup
                  v-model="Replycomments"
                  position="bottom"
                  :style="{ height: '100%' }"
                >
                  <van-nav-bar
                    class="nav-replycomments"
                    :title="
                      replycomments.reply_count == 0
                        ? '暂无回复'
                        : replycomments.reply_count + '条回复'
                    "
                    @click-left="Replycomments = !Replycomments"
                  >
                    <template #left>
                      <van-icon name="cross" />
                    </template>
                  </van-nav-bar>
                  <div class="reply-comments-main">
                    <van-cell>
                      <div class="avatar">
                        <van-image round :src="replycomments.aut_photo" />
                      </div>
                      <div class="rightside">
                        <div class="firstline">
                          <span class="username">{{
                            replycomments.aut_name
                          }}</span>
                          <span
                            class="toutiao toutiao-dianzan"
                            :class="{ liking: item.is_liking }"
                            @click="clickCommentLike(item)"
                            ><span style="margin-left: 0.125rem">{{
                              replycomments.like_count !== 0
                                ? replycomments.like_count
                                : '赞'
                            }}</span></span
                          >
                        </div>
                        <div>{{ replycomments.content }}</div>
                        <div class="thirdline">
                          <span class="lasttime">{{
                            times(replycomments.pubdate)
                          }}</span
                          ><button class="btn-return">
                            回复{{ replycomments.reply_count }}
                          </button>
                        </div>
                      </div>
                    </van-cell>
                    <van-cell class="all-reply">全部回复</van-cell>
                    <van-list
                      v-model="replyloading"
                      :finished="replyfinished"
                      finished-text="没有更多了"
                      @load="replyonLoaddetail"
                      :immediate-check="false"
                    >
                      <van-cell
                        class="comment"
                        v-for="item in Replycommentslist"
                        :key="item.com_id"
                      >
                        <div class="avatar">
                          <van-image round :src="item.aut_photo" />
                        </div>
                        <div class="rightside">
                          <div class="firstline">
                            <span class="username">{{ item.aut_name }}</span>
                            <span
                              class="toutiao toutiao-dianzan"
                              :class="{ liking: item.is_liking }"
                              @click="clickCommentLike(item)"
                              ><span style="margin-left: 0.125rem">{{
                                item.like_count !== 0 ? item.like_count : '赞'
                              }}</span></span
                            >
                          </div>
                          <div>{{ item.content }}</div>
                          <div class="thirdline">
                            <span class="lasttime">{{
                              times(item.pubdate)
                            }}</span
                            ><button class="btn-return">
                              回复{{ item.reply_count }}
                            </button>
                          </div>
                        </div>
                      </van-cell>
                    </van-list>
                  </div>
                  <div class="reply-comments">
                    <van-button
                      round
                      @click="isreplycomments = !isreplycomments"
                      >评论</van-button
                    >
                    <van-action-sheet
                      v-model="isreplycomments"
                      :round="false"
                      class="reply-comments-publish"
                    >
                      <van-field
                        v-model="replymessage"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="50"
                        placeholder="请输入留言"
                        show-word-limit
                      />
                      <van-button @click="replypublishfn">发布</van-button>
                    </van-action-sheet>
                  </div>
                </van-popup>
              </div>
            </div>
          </van-cell>
        </van-list>
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
          <div class="num">{{ total_count }}</div>
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
        <div class="icon">
          <van-icon name="share" @click="showShare = true" />
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/index.css'
import dayjs from '@/utils/dayjs'
import { ImagePreview } from 'vant'
import {
  getnewsdetail,
  concernusers,
  Cancelconcernusers,
  newThumbsup,
  CancelnewThumbsup,
  getcomments,
  newscomments,
  LikeComment,
  cancelLikeComment
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
      commentslist: [],
      loading: false,
      finished: false,
      total_count: 0,
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ],
      Replycomments: false,
      Replycommentslist: [],
      replycomments: {},
      replyloading: false,
      replyfinished: false,
      isreplycomments: false,
      replymessage: '',
      imgAllList: []
    }
  },
  created() {
    this.getnewsdetail()
  },
  methods: {
    async getnewsdetail() {
      const res = await getnewsdetail(this.$route.params.id)
      this.newsdetail = res.data.data
      this.concernloading = this.newsdetail.is_followed
      this.iscollection = this.newsdetail.is_collected
      const { data } = await getcomments('a', this.newsdetail.art_id)
      if (data.data.results.length === 0) {
        this.finished = true
      }
      this.commentslist = data.data.results
      this.total_count = data.data.total_count

      this.$nextTick(() => {
        const imgAll = document.querySelectorAll('img')
        this.imgAllList = imgAll // console.log(this.imgAllList) // 把图片地址添加到数组中
        const images = []
        this.imgAllList.forEach((item, index) => {
          images.push(item.src) // 循环添加点击事件 和添加图片地址
          item.onclick = () => {
            ImagePreview({ images, startPosition: index, closeable: true })
          }
        })
      })
    },
    async concernusersfn(id) {
      await concernusers(id)
      this.concernloading = !this.concernloading
      this.$toast.success('关注成功')
    },
    async Cancelconcernusersfn(id) {
      await Cancelconcernusers(id)
      this.concernloading = !this.concernloading
      this.$toast.success('取消关注')
    },
    async collectionfn(id) {
      try {
        await newThumbsup(id)
        this.iscollection = !this.iscollection
        this.$toast.success('收藏成功')
      } catch (error) {
        console.log(error)
      }
    },
    async Cancelcollectionfn(id) {
      await CancelnewThumbsup(id)
      this.iscollection = !this.iscollection
      this.$toast.success('取消收藏')
    },
    async onLoaddetail() {
      const off = this.commentslist[this.commentslist.length - 1].com_id
      const { data } = await getcomments('a', this.newsdetail.art_id, off)
      if (data.data.results.length === 0) {
        this.finished = true
      }
      this.commentslist.push(...data.data.results)
      this.loading = false
    },
    async publishfn() {
      if (this.message) {
        try {
          const res = await newscomments(this.newsdetail.art_id, this.message)
          this.commentslist.unshift(res)
          this.total_count++
          this.getnewsdetail()
          this.$toast.success('评论成功')
          this.message = ''
        } catch (error) {
          this.$toast.fail('评论失败')
        }
        this.isreview = false
      }
    },
    async Replycommentsfn(item) {
      this.replycomments = item
      this.Replycomments = !this.Replycomments
      const { data } = await getcomments('c', item.com_id)
      this.Replycommentslist = data.data.results
    },
    async replyonLoaddetail() {
      const id =
        this.Replycommentslist[this.Replycommentslist.length - 1].com_id
      const res = await getcomments('c', this.replycomments.com_id, id)
      this.Replycommentslist.push(...res.data.data.results)
      if (res.data.data.results.length === 0) {
        this.replyfinished = true
      }
      this.replyloading = false
    },
    async replypublishfn() {
      try {
        const res = await newscomments(
          this.replycomments.com_id,
          this.replymessage,
          this.replycomments.aut_id
        )
        this.commentslist.unshift(res)
        this.$toast.success('评论成功')
        this.replymessage = ''
      } catch (error) {
        this.$toast.fail('评论失败')
      }
      this.isreplycomments = false
      const { data } = await getcomments('c', this.replycomments.com_id)
      this.Replycommentslist = data.data.results
      this.getnewsdetail()
    },
    async clickCommentLike(item) {
      if (!item.is_liking) {
        console.log(item)
        await LikeComment(item.com_id) // console.log(res)
        item.like_count++
        item.is_liking = true
      } else {
        await cancelLikeComment(item.com_id) // console.log(res)
        item.like_count--
        item.is_liking = false
      }
    }
  },
  computed: {
    times() {
      return (times) => {
        return dayjs(times).fromNow()
      }
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
  .van-cell__value {
    display: flex;
  }
  .avatar {
    width: 72px;
    height: 72px;
    // background-color: pink;
    margin-right: 30px;
    // margin-left: 30px;
    .van-image {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
      }
    }
  }
  .rightside {
    width: 300px;
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
.liking {
  &:before {
    color: #3296fa;
    font-weight: bold;
  }
}
.nav-title {
  text-align: center;
  color: #323233;
  font-weight: 500;
  font-size: 0.42667rem;
}
:deep(.van-popup__close-icon--top-left) {
  top: 0.3rem;
}
.all-reply {
  padding: 0.26667rem 0.42667rem;
  font-size: 0.37333rem;
}
.reply-comments {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96px;
  background-color: #ff69b4;
  :deep(.van-button) {
    width: 640px;
    height: 80px;
  }
}
.nav-replycomments {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.reply-comments-main {
  width: 100%;
  margin-top: 120px;
  margin-bottom: 100px;
}
.reply-comments-publish {
  .van-button {
    width: 2.3rem;
  }
}
</style>
