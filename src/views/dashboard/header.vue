<template>
  <div class="gwin-platform-header">
    <div class="gwin-platform-header__time-txt">
      <div class="gwin-platform-header__time">{{ currentTime }}</div>
      {{ getWeekDate() }}
    </div>
    <p class="gwin-platform-header__title">车辆运输数据监控</p>
    <div class="gwin-platform-header__right">
      <p class="gwin-platform-header__time-txt">数据更新时间：{{ dataTime }}</p>
      <div class="gwin-platform-header__full" @click="toggleFullscreen">
        <div class="gwin-platform-header__full-txt">
          <span v-if="!isFull">全屏显示</span><span v-else>退出全屏</span>
        </div>
        <div v-if="!isFull" class="gwin-platform-header__full-img"></div>
        <div v-else class="gwin-platform-header__exist-img"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate1, getWeekDate } from '@/utils'
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  isFull: boolean
}

const emit = defineEmits(['dashboardOpen'])
defineProps<Props>()
const currentTime = ref('')
const dataTime = ref('')
let timeInterval: NodeJS.Timer | null = null
let dateTimer: NodeJS.Timer | null = null

onMounted(() => {
  timeInterval = setInterval(function () {
    currentTime.value = formatDate1(Date.now(), 1)
  }, 1000)

  dataTime.value = formatDate1(Date.now(), 3)
  dateTimer = setInterval(function () {
    dataTime.value = formatDate1(Date.now(), 3)
  }, 30000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }

  if (dateTimer) {
    clearInterval(dateTimer)
  }
})

function toggleFullscreen() {
  emit('dashboardOpen')
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

@include b(header) {
  margin-top: 16px;
  width: 100%;
  height: 136px;
  background-image: url('../../assets/img/header-bg.png');
  background-size: 100% 100%;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  position: absolute;
  top: 0;

  @include e(title) {
    position: absolute;
    top: 19px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 36px;
    font-family: Roboto-Bold;
    font-weight: bold;
    color: #00ffff;
    line-height: 36px;
    letter-spacing: 6px;
    background: linear-gradient(90deg, #00ffff 0%, #00eaff 50%, #01aaff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @include e(right) {
    display: flex;
  }

  @include e(full) {
    margin-top: 42px;
    width: 86px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid #00ffff;
    margin-left: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: linear-gradient(135deg, #00c6ff 0%, #311ea7 100%);
      border: 1px solid #040711;
      @include e(full-img) {
        background-image: url('../../assets/img/full-img-hover.png');
      }

      @include e(exist-img) {
        background-image: url('../../assets/img/icon-exist-hover.png');
      }

      @include e(full-txt) {
        color: #ffffff;
      }
    }
  }

  @include e(full-txt) {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #00ffff;
  }

  @include e(full-img) {
    margin-left: 4px;
    width: 10px;
    height: 10px;
    background-image: url('../../assets/img/full-img.png');
    background-size: 100% 100%;
  }

  @include e(exist-img) {
    margin-left: 4px;
    width: 10px;
    height: 10px;
    background-image: url('../../assets/img/icon-exsit.png');
    background-size: 100% 100%;
  }

  @include e(time-txt) {
    margin-top: 44px;
    font-size: 16px;
    font-family: Roboto-Medium;
    font-weight: 500;
    color: #00ffff;
    line-height: 30px;
    letter-spacing: 2px;
    display: flex;
  }

  @include e(time) {
    width: 210px;
  }
}
</style>
