<template>
  <div>
    <van-popup
      v-model="isshow"
      position="bottom"
      :style="{ height: '99%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popupmain">
        <div class="my-channel">
          <van-cell title="我的频道"
            ><van-button
              size="small"
              round
              class="edit-btn"
              @click="isEdit = !isEdit"
              >{{ isEdit ? '完成' : '编辑' }}</van-button
            ></van-cell
          >
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              @click="clickdelmychannel(item, index)"
              v-for="(item, index) in mychannels"
              :key="item.id"
              :text="item.name"
              :class="{ activechannel: item.name === '推荐' }"
            >
              <template #icon
                ><van-icon name="cross" v-show="isEdit && item.name !== '推荐'"
              /></template>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="recommend-channel">
          <van-cell title="推荐频道"></van-cell>
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              v-for="item in recommendchannels"
              :key="item.id"
              @click="AddMyChannelfn(item)"
              :text="item.name"
              icon="plus"
            >
            </van-grid-item>
          </van-grid>
        </div></div
    ></van-popup>
  </div>
</template>

<script>
import { getAllchannels } from '@/api'
export default {
  data() {
    return {
      isshow: false,
      allchannels: [],
      isEdit: false
    }
  },
  props: {
    mychannels: {
      type: Array,
      require: true
    }
  },
  created() {
    this.getallchannels()
  },
  methods: {
    async getallchannels() {
      const { data } = await getAllchannels()
      this.allchannels = data.data.channels
    },
    clickdelmychannel(item, index) {
      if (this.isEdit && item.name !== '推荐') {
        return this.$emit('delmy-channel', item.id)
      }
      if (!this.isEdit) {
        this.isshow = false
        this.$emit('change-channel', index)
      }
    },
    AddMyChannelfn(item) {
      this.$emit('add-channel', { ...item })
    }
  },
  computed: {
    recommendchannels() {
      return this.allchannels.filter(
        (item) => !this.mychannels.find((i) => i.id === item.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.activechannel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupmain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
    height: 80px;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(40%, -40%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
          font-size: 0.32rem;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
