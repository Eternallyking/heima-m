<template>
  <div class="imgs">
    <img :src="photo" alt="" ref="img" />
    <van-button class="Cancel" @click="Cancelfn">取消</van-button>
    <van-button class="finish" @click="confirm">完成</van-button>
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadPhoto } from '@/api/user'
export default {
  props: ['photo'],
  mounted() {
    const img = this.$refs.img
    this.cropper = new Cropper(img, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    confirm() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        })
        try {
          const fm = new FormData()
          fm.append('photo', blob)
          await uploadPhoto(fm)
          this.$emit('updatephoto')
          this.$toast('更新成功')
        } catch (error) {
          this.$toast('更新失败')
        }
      })
    },
    Cancelfn() {
      this.$emit('Cancel')
    }
  }
}
</script>

<style scoped>
.finish {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: transparent;
  border: 0;
  color: #fff;
}
.Cancel {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: transparent;
  border: 0;
  color: #fff;
}
.imgs {
  height: 1334px;
  width: 200%;
}
img {
  width: 100%;
}
.imgs[data-v-24d4d5ca] {
  background: #000;
}
</style>
