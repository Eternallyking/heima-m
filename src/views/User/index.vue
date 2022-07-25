<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="main">
      <van-cell title="头像" is-link @click="$refs.file.click()"
        ><van-image
          round
          width=".8rem"
          height=".8rem"
          :src="myinformation.photo"
      /></van-cell>
      <input type="file" ref="file" hidden accept=".png,.jpg" />
      <van-popup v-model="photoshow">
        <UpdatePhoto
          :photo="photo"
          @updatephoto="updatephotofn"
          @Cancel="Cancelfn"
        ></UpdatePhoto>
      </van-popup>
      <van-cell
        title="昵称"
        is-link
        :value="myinformation.name"
        @click="isname = !isname"
      />
      <van-popup v-model="isname" position="bottom" :style="{ height: '100%' }">
        <van-nav-bar
          title="更新昵称"
          left-text="取消"
          right-text="保存"
          @click-left="isname = false"
          @click-right="mynamefn"
        />
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入新的昵称"
          show-word-limit
        />
      </van-popup>
      <van-cell
        title="性别"
        is-link
        :value="{ 0: '男', 1: '女' }[myinformation.gender]"
        @click="issex = !issex"
      />
      <van-popup v-model="issex" position="bottom">
        <van-picker
          show-toolbar
          :columns="sexs"
          @confirm="sexonConfirmfn"
          @cancel="issex = false"
        />
      </van-popup>
      <van-cell
        title="生日"
        is-link
        :value="myinformation.birthday"
        @click="birthdayshow = !birthdayshow"
      />
      <van-popup
        v-model="birthdayshow"
        position="bottom"
        :style="{ height: '45%' }"
        ><van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="birthdayshow = !birthdayshow"
          @confirm="confirmfn"
      /></van-popup>
    </div>
  </div>
</template>

<script>
import { editinformation, editmyinformation } from '@/api'
import dayjs from '@/utils/dayjs'
import UpdatePhoto from './components/UpdatePhoto.vue'
export default {
  data() {
    return {
      myinformation: {},
      birthdayshow: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 10, 1),
      currentDate: new Date(2021, 0, 17),
      issex: false,
      sexs: ['男', '女'],
      isname: false,
      message: '',
      photoshow: false,
      photo: ''
    }
  },
  created() {
    this.editinformation()
  },
  components: {
    UpdatePhoto
  },
  methods: {
    async editinformation() {
      const res = await editinformation()
      this.myinformation = res.data.data
      if (!this.myinformation.gender) {
        this.myinformation.gender = 0
      }
    },
    async confirmfn(date) {
      const day = dayjs(date).format('YYYY-MM-DD')
      this.myinformation.birthday = day
      await editmyinformation(
        this.myinformation.name,
        this.myinformation.gender,
        this.myinformation.birthday
      )
      this.$toast.success('更新成功')
      this.birthdayshow = !this.birthdayshow
    },
    async mynamefn() {
      if (this.message.trim() !== '') {
        this.myinformation.name = this.message
        this.isname = false
        await editmyinformation(this.myinformation.name)
        this.$toast.success('更新成功')
      }
      this.message = ''
    },
    async sexonConfirmfn(value) {
      if (value === '男') {
        value = 0
      } else {
        value = 1
      }
      this.myinformation.gender = value
      await editmyinformation(
        this.myinformation.name,
        this.myinformation.gender
      )
      this.$toast.success('更新成功')
      this.issex = false
    },
    updatephotofn() {
      this.photoshow = false
      this.editinformation()
    },
    Cancelfn() {
      this.photoshow = false
    }
  },
  mounted() {
    this.$refs.file.addEventListener('change', (e) => {
      // e.target 触发事件的元素
      // 图片的src能识别什么?
      //  - 图片相对/绝对路径
      //  - base64 DateUrl
      //  - file,blob对象的url
      const file = e.target.files[0]
      // file = URL.createObjectURL(file) // 将file对象转换成图片可识别的url
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.photoshow = true
      }
    })
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
.main {
  margin-top: 100px;
}
</style>
