<template>
  <div class="gwin-platform-error">
    <div class="gwin-platform-error__icon">
      <i></i>
      <p>404 NOT FOUND</p>
    </div>
    <div class="gwin-platform-error__text">
      <p class="gwin-platform-error__404">404</p>
      <p>抱歉，你访问的页面不存在</p>
      <el-button class="gwin-platform-error__button" type="primary" @click="onBackHome">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
      background: url('../../assets/img/error/404.png') no-repeat 0 0;
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
  @include e('404') {
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
