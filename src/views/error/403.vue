<template>
  <div class="gwin-platform-error">
    <div class="gwin-platform-error__icon">
      <i></i>
      <p>403 Forbidden</p>
    </div>
    <div class="gwin-platform-error__text">
      <p class="gwin-platform-error__403">403</p>
      <p>抱歉，你无权访问该页面</p>
      <el-button class="gwin-platform-error__button" type="primary" @click="onBackHome">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue-demi'

onMounted(() => {
  onPushState()
})

onUnmounted(() => {
  window.removeEventListener('popstate', onPushState, false)
})

/**
 * 阻止浏览器页面回退操作
 */
const onPushState = () => {
  // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
  window.history.pushState(null, '', document.URL)
  // 给window添加一个popstate事件，拦截返回键
  window.addEventListener('popstate', function () {
    window.history.pushState(null, '', document.URL)
  })
}

/**
 * 返回首页
 */
const onBackHome = () => {
  window.location.href = '/'
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('error') {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #6e6e6e;
  font-size: 16px;
  @include e('icon') {
    i {
      width: 350px;
      height: 230px;
      display: block;
      background: url('../../assets/img/error/403.png') no-repeat 0 0;
      background-size: 100%;
    }
    p {
      margin-top: 10px;
      text-align: center;
    }
  }
  @include e('text') {
    margin-left: 120px;
  }
  @include e('403') {
    color: #000;
    font-size: 56px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  @include e('button') {
    margin-top: 24px;
    background: #3c7dff;
  }
}
</style>
