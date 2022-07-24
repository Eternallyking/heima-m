<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="main">
      <van-cell title="头像" is-link
        ><van-image
          round
          width=".8rem"
          height=".8rem"
          :src="myinformation.photo"
      /></van-cell>
      <van-cell title="昵称" is-link :value="myinformation.name" />
      <van-cell
        title="性别"
        is-link
        :value="{ 0: '男', 1: '女' }[myinformation.gender]"
      />
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
import { editinformation } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  data() {
    return {
      myinformation: {},
      birthdayshow: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      value: ''
    }
  },
  created() {
    this.editinformation()
  },
  methods: {
    async editinformation() {
      const res = await editinformation()
      this.myinformation = res.data.data
    },
    confirmfn(date) {
      this.birthdayshow = !this.birthdayshow
      console.log(this.value)
      this.value = date
      console.log(dayjs(this.value))
      //   this.myinformation.birthday = dayjs(this.value)
      console.log(this.value)
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
.main {
  margin-top: 100px;
}
</style>
